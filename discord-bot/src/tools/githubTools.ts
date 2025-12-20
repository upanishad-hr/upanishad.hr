import { Octokit } from '@octokit/rest';
import { ToolExecutor, ExecutionContext } from './types.js';

export class GitHubTool implements ToolExecutor {
  name = 'GitHub';
  private octokit: Octokit;

  constructor(token: string) {
    this.octokit = new Octokit({ auth: token });
  }

  async execute(input: { action: string; [key: string]: any }, context: ExecutionContext): Promise<string> {
    try {
      const [owner, repo] = context.repo.split('/');

      switch (input.action) {
        case 'create_branch':
          return await this.createBranch(owner, repo, input.branch_name, input.from_branch);

        case 'create_pr':
          return await this.createPR(owner, repo, input.title, input.body, input.head, input.base);

        case 'list_branches':
          return await this.listBranches(owner, repo);

        case 'get_pr':
          return await this.getPR(owner, repo, input.pr_number);

        default:
          return `Unknown GitHub action: ${input.action}`;
      }
    } catch (error: any) {
      return `GitHub API error: ${error.message}`;
    }
  }

  private async createBranch(owner: string, repo: string, branchName: string, fromBranch: string): Promise<string> {
    const { data: ref } = await this.octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${fromBranch}`,
    });

    await this.octokit.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${branchName}`,
      sha: ref.object.sha,
    });

    return `Branch '${branchName}' created from '${fromBranch}'`;
  }

  private async createPR(
    owner: string,
    repo: string,
    title: string,
    body: string,
    head: string,
    base: string
  ): Promise<string> {
    const { data: pr } = await this.octokit.pulls.create({
      owner,
      repo,
      title,
      body,
      head,
      base,
    });

    return `Pull request created: ${pr.html_url}`;
  }

  private async listBranches(owner: string, repo: string): Promise<string> {
    const { data: branches } = await this.octokit.repos.listBranches({
      owner,
      repo,
      per_page: 20,
    });

    return branches.map(b => b.name).join('\n');
  }

  private async getPR(owner: string, repo: string, prNumber: number): Promise<string> {
    const { data: pr } = await this.octokit.pulls.get({
      owner,
      repo,
      pull_number: prNumber,
    });

    return `PR #${pr.number}: ${pr.title}\nState: ${pr.state}\nURL: ${pr.html_url}`;
  }
}
