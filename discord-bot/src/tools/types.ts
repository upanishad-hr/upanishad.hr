import Anthropic from '@anthropic-ai/sdk';

export interface ToolExecutor {
  name: string;
  execute(input: any, context: ExecutionContext): Promise<string>;
}

export interface ExecutionContext {
  workDir: string;
  repo: string;
  branch: string;
  githubToken: string;
}

export type ToolResult = Anthropic.Messages.ToolResultBlockParam;
