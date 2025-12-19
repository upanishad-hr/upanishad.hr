import 'dotenv/config';
import { DiscordBot } from './bot.js';

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const DEFAULT_REPO = process.env.DEFAULT_REPO;
const WORK_DIR = process.env.WORK_DIR || '/tmp/claude-bot-workspace';

if (!DISCORD_TOKEN || !ANTHROPIC_API_KEY || !GITHUB_TOKEN || !DEFAULT_REPO) {
  console.error('❌ Missing required environment variables!');
  console.error('Please set: DISCORD_TOKEN, ANTHROPIC_API_KEY, GITHUB_TOKEN, DEFAULT_REPO');
  process.exit(1);
}

const bot = new DiscordBot(DISCORD_TOKEN, ANTHROPIC_API_KEY, GITHUB_TOKEN, DEFAULT_REPO, WORK_DIR);

bot.start(DISCORD_TOKEN).catch((error) => {
  console.error('Failed to start bot:', error);
  process.exit(1);
});

console.log('🚀 Discord Claude Bot starting...');
