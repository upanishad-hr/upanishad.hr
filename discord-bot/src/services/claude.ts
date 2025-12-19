import Anthropic from '@anthropic-ai/sdk';
import { ToolRegistry } from '../tools/index.js';
import { ExecutionContext } from '../tools/types.js';

export interface ClaudeSession {
  messages: Anthropic.Messages.MessageParam[];
  context: ExecutionContext;
}

export class ClaudeService {
  private client: Anthropic;
  private tools: ToolRegistry;
  private sessions: Map<string, ClaudeSession> = new Map();

  constructor(apiKey: string, githubToken: string) {
    this.client = new Anthropic({ apiKey });
    this.tools = new ToolRegistry(githubToken);
  }

  async chat(sessionId: string, userMessage: string, onChunk?: (text: string) => void): Promise<string> {
    let session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found. Use createSession first.');
    }

    session.messages.push({
      role: 'user',
      content: userMessage,
    });

    let fullResponse = '';
    const maxIterations = 10;
    let iteration = 0;

    while (iteration < maxIterations) {
      iteration++;

      const response = await this.client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8096,
        tools: this.tools.getToolDefinitions(),
        messages: session.messages,
      });

      const assistantMessage: Anthropic.Messages.MessageParam = {
        role: 'assistant',
        content: response.content,
      };
      session.messages.push(assistantMessage);

      let hasToolUse = false;
      const toolResults: Anthropic.Messages.ToolResultBlockParam[] = [];

      for (const block of response.content) {
        if (block.type === 'text') {
          fullResponse += block.text;
          if (onChunk) onChunk(block.text);
        } else if (block.type === 'tool_use') {
          hasToolUse = true;
          const result = await this.tools.executeTool(block.name, block.input, session.context);

          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: result,
          });

          if (onChunk) onChunk(`\n[Tool: ${block.name}]\n`);
        }
      }

      if (!hasToolUse) {
        break;
      }

      session.messages.push({
        role: 'user',
        content: toolResults,
      });

      if (response.stop_reason === 'end_turn') {
        break;
      }
    }

    return fullResponse;
  }

  createSession(sessionId: string, context: ExecutionContext, systemPrompt?: string): void {
    const defaultPrompt = `You are Claude, an AI assistant integrated with Discord and GitHub. You have access to file operations, git commands, and GitHub API.

Repository: ${context.repo}
Current branch: ${context.branch}
Working directory: ${context.workDir}

You can:
- Read, write, and edit files
- Execute bash commands (git operations, builds, tests)
- Create branches and pull requests via GitHub API

When asked to make changes:
1. Read relevant files first
2. Make the changes
3. Commit with clear messages
4. Push to the branch

Be concise in your responses as they'll be sent to Discord.`;

    this.sessions.set(sessionId, {
      messages: systemPrompt
        ? [{ role: 'user', content: `System: ${systemPrompt}\n\nAcknowledge you understand.` }]
        : [],
      context,
    });
  }

  deleteSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  getSession(sessionId: string): ClaudeSession | undefined {
    return this.sessions.get(sessionId);
  }
}
