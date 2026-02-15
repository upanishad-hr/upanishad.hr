import {
  Client,
  GatewayIntentBits,
  Message,
  ThreadChannel,
  Collection,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';
import { ClaudeService } from './services/claude.js';
import { ExecutionContext } from './tools/types.js';
import { mkdir } from 'fs/promises';
import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class DiscordBot {
  private client: Client;
  private claude: ClaudeService;
  private workDir: string;
  private defaultRepo: string;
  private githubToken: string;

  constructor(discordToken: string, anthropicKey: string, githubToken: string, defaultRepo: string, workDir: string) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
      ],
    });

    this.claude = new ClaudeService(anthropicKey, githubToken);
    this.workDir = workDir;
    this.defaultRepo = defaultRepo;
    this.githubToken = githubToken;

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.client.on('ready', () => {
      console.log(`✅ Bot logged in as ${this.client.user?.tag}`);
    });

    this.client.on('messageCreate', async (message) => {
      if (message.author.bot) return;

      if (message.content.startsWith('!claude')) {
        await this.handleClaudeCommand(message);
      } else if (message.channel.isThread() && message.channel.name.startsWith('claude-')) {
        await this.handleThreadMessage(message);
      }
    });
  }

  private async handleClaudeCommand(message: Message) {
    const args = message.content.slice('!claude'.length).trim();

    if (!args) {
      await message.reply(
        '**Claude GitHub Bot** 🤖\n\n' +
          'Usage: `!claude <your request>`\n\n' +
          'Examples:\n' +
          '• `!claude create a new branch from main called feature-x`\n' +
          '• `!claude add a login page to the app`\n' +
          '• `!claude fix the bug in auth.ts`\n' +
          '• `!claude create a PR for this branch`\n\n' +
          'I\'ll create a thread to work on your request!'
      );
      return;
    }

    const thread = await message.startThread({
      name: `claude-${Date.now()}`,
      autoArchiveDuration: 60,
    });

    await thread.send('🔄 Setting up workspace...');

    try {
      const sessionId = thread.id;
      const branchName = `claude-session-${sessionId.slice(-8)}`;

      const repoPath = await this.setupRepository(this.defaultRepo, branchName);

      const context: ExecutionContext = {
        workDir: repoPath,
        repo: this.defaultRepo,
        branch: branchName,
        githubToken: this.githubToken,
      };

      this.claude.createSession(sessionId, context);

      await thread.send(`✅ Workspace ready!\n📁 Repository: ${this.defaultRepo}\n🌿 Branch: ${branchName}\n\n💬 Processing your request...`);

      let response = '';
      await this.claude.chat(sessionId, args, async (chunk) => {
        response += chunk;
      });

      await this.sendLongMessage(thread, response || '✅ Done!');
    } catch (error: any) {
      await thread.send(`❌ Error: ${error.message}`);
    }
  }

  private async handleThreadMessage(message: Message) {
    const thread = message.channel as ThreadChannel;
    const sessionId = thread.id;

    const session = this.claude.getSession(sessionId);
    if (!session) {
      await message.reply('❌ Session expired. Start a new one with `!claude`');
      return;
    }

    await message.channel.sendTyping();

    try {
      let response = '';
      await this.claude.chat(sessionId, message.content, async (chunk) => {
        response += chunk;
      });

      await this.sendLongMessage(thread, response || '✅ Done!');
    } catch (error: any) {
      await message.reply(`❌ Error: ${error.message}`);
    }
  }

  private async setupRepository(repo: string, branchName: string): Promise<string> {
    const [owner, repoName] = repo.split('/');
    const repoPath = join(this.workDir, repoName);

    await mkdir(this.workDir, { recursive: true });

    try {
      await execAsync(`git -C ${repoPath} status`);
      console.log('Repository already exists, updating...');
      await execAsync(`git -C ${repoPath} fetch origin`);
    } catch {
      console.log('Cloning repository...');
      await execAsync(`git clone https://x-access-token:${this.githubToken}@github.com/${repo}.git ${repoPath}`);
    }

    try {
      await execAsync(`git -C ${repoPath} checkout -b ${branchName}`, { timeout: 10000 });
    } catch {
      await execAsync(`git -C ${repoPath} checkout ${branchName}`);
    }

    return repoPath;
  }

  private async sendLongMessage(channel: ThreadChannel, text: string) {
    const chunks = this.splitMessage(text, 1900);
    for (const chunk of chunks) {
      await channel.send(chunk);
    }
  }

  private splitMessage(text: string, maxLength: number): string[] {
    const chunks: string[] = [];
    let current = '';

    for (const line of text.split('\n')) {
      if ((current + line).length > maxLength) {
        chunks.push(current);
        current = line + '\n';
      } else {
        current += line + '\n';
      }
    }

    if (current) chunks.push(current);
    return chunks;
  }

  async start(token: string) {
    await this.client.login(token);
  }
}
