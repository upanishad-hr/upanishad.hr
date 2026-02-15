import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { ToolExecutor, ExecutionContext } from './types.js';

export class ReadTool implements ToolExecutor {
  name = 'Read';

  async execute(input: { file_path: string; offset?: number; limit?: number }, context: ExecutionContext): Promise<string> {
    try {
      const fullPath = join(context.workDir, input.file_path);
      const content = await readFile(fullPath, 'utf-8');
      const lines = content.split('\n');

      const start = input.offset || 0;
      const end = input.limit ? start + input.limit : lines.length;
      const selectedLines = lines.slice(start, end);

      return selectedLines.map((line, idx) => `${start + idx + 1}→${line}`).join('\n');
    } catch (error: any) {
      return `Error reading file: ${error.message}`;
    }
  }
}

export class WriteTool implements ToolExecutor {
  name = 'Write';

  async execute(input: { file_path: string; content: string }, context: ExecutionContext): Promise<string> {
    try {
      const fullPath = join(context.workDir, input.file_path);
      await writeFile(fullPath, input.content, 'utf-8');
      return `File written successfully to: ${input.file_path}`;
    } catch (error: any) {
      return `Error writing file: ${error.message}`;
    }
  }
}

export class EditTool implements ToolExecutor {
  name = 'Edit';

  async execute(
    input: { file_path: string; old_string: string; new_string: string; replace_all?: boolean },
    context: ExecutionContext
  ): Promise<string> {
    try {
      const fullPath = join(context.workDir, input.file_path);
      let content = await readFile(fullPath, 'utf-8');

      if (input.replace_all) {
        content = content.replaceAll(input.old_string, input.new_string);
      } else {
        const occurrences = content.split(input.old_string).length - 1;
        if (occurrences === 0) {
          return `Error: old_string not found in file`;
        }
        if (occurrences > 1) {
          return `Error: old_string appears ${occurrences} times. Use replace_all or provide more context.`;
        }
        content = content.replace(input.old_string, input.new_string);
      }

      await writeFile(fullPath, content, 'utf-8');
      return `File edited successfully: ${input.file_path}`;
    } catch (error: any) {
      return `Error editing file: ${error.message}`;
    }
  }
}
