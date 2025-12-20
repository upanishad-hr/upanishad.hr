import { exec } from 'child_process';
import { promisify } from 'util';
import { ToolExecutor, ExecutionContext } from './types.js';

const execAsync = promisify(exec);

export class BashTool implements ToolExecutor {
  name = 'Bash';

  async execute(input: { command: string; timeout?: number }, context: ExecutionContext): Promise<string> {
    try {
      const timeout = input.timeout || 120000;
      const { stdout, stderr } = await execAsync(input.command, {
        cwd: context.workDir,
        timeout,
        maxBuffer: 1024 * 1024 * 10, // 10MB
      });

      let output = '';
      if (stdout) output += stdout;
      if (stderr) output += `\nSTDERR:\n${stderr}`;

      return output || 'Command executed successfully (no output)';
    } catch (error: any) {
      return `Error executing command: ${error.message}\n${error.stderr || ''}`;
    }
  }
}
