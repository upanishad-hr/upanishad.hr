import Anthropic from '@anthropic-ai/sdk';
import { ReadTool, WriteTool, EditTool } from './fileTools.js';
import { BashTool } from './bashTools.js';
import { GitHubTool } from './githubTools.js';
import { ToolExecutor, ExecutionContext } from './types.js';

export class ToolRegistry {
  private tools: Map<string, ToolExecutor> = new Map();

  constructor(githubToken: string) {
    this.registerTool(new ReadTool());
    this.registerTool(new WriteTool());
    this.registerTool(new EditTool());
    this.registerTool(new BashTool());
    this.registerTool(new GitHubTool(githubToken));
  }

  private registerTool(tool: ToolExecutor) {
    this.tools.set(tool.name, tool);
  }

  async executeTool(name: string, input: any, context: ExecutionContext): Promise<string> {
    const tool = this.tools.get(name);
    if (!tool) {
      return `Error: Tool '${name}' not found`;
    }
    return await tool.execute(input, context);
  }

  getToolDefinitions(): Anthropic.Messages.Tool[] {
    return [
      {
        name: 'Read',
        description: 'Reads a file from the repository',
        input_schema: {
          type: 'object',
          properties: {
            file_path: { type: 'string', description: 'Path to the file relative to repository root' },
            offset: { type: 'number', description: 'Line number to start reading from (optional)' },
            limit: { type: 'number', description: 'Number of lines to read (optional)' },
          },
          required: ['file_path'],
        },
      },
      {
        name: 'Write',
        description: 'Writes content to a file',
        input_schema: {
          type: 'object',
          properties: {
            file_path: { type: 'string', description: 'Path to the file' },
            content: { type: 'string', description: 'Content to write' },
          },
          required: ['file_path', 'content'],
        },
      },
      {
        name: 'Edit',
        description: 'Edits a file by replacing text',
        input_schema: {
          type: 'object',
          properties: {
            file_path: { type: 'string', description: 'Path to the file' },
            old_string: { type: 'string', description: 'Text to replace' },
            new_string: { type: 'string', description: 'Replacement text' },
            replace_all: { type: 'boolean', description: 'Replace all occurrences (default: false)' },
          },
          required: ['file_path', 'old_string', 'new_string'],
        },
      },
      {
        name: 'Bash',
        description: 'Executes a bash command (including git operations)',
        input_schema: {
          type: 'object',
          properties: {
            command: { type: 'string', description: 'The bash command to execute' },
            timeout: { type: 'number', description: 'Timeout in milliseconds (default: 120000)' },
          },
          required: ['command'],
        },
      },
      {
        name: 'GitHub',
        description: 'Performs GitHub API operations',
        input_schema: {
          type: 'object',
          properties: {
            action: {
              type: 'string',
              enum: ['create_branch', 'create_pr', 'list_branches', 'get_pr'],
              description: 'The GitHub action to perform',
            },
            branch_name: { type: 'string', description: 'Branch name (for create_branch)' },
            from_branch: { type: 'string', description: 'Source branch (for create_branch)' },
            title: { type: 'string', description: 'PR title (for create_pr)' },
            body: { type: 'string', description: 'PR description (for create_pr)' },
            head: { type: 'string', description: 'Source branch (for create_pr)' },
            base: { type: 'string', description: 'Target branch (for create_pr)' },
            pr_number: { type: 'number', description: 'PR number (for get_pr)' },
          },
          required: ['action'],
        },
      },
    ];
  }
}
