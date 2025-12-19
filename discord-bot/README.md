# Discord Claude GitHub Bot

A Discord bot that integrates Claude AI with GitHub, allowing collaborative development through Discord conversations.

## Features

- 🤖 **Claude AI Integration**: Powered by Anthropic's Claude API
- 🔧 **Full File Operations**: Read, write, and edit files in your repository
- 🌿 **Git Operations**: Create branches, commit changes, push code
- 🔀 **GitHub API**: Create pull requests, manage branches
- 💬 **Conversational**: Continue working in Discord threads
- 🔄 **Real-time**: Stream responses as Claude works

## How It Works

The bot creates isolated workspace branches for each session:

1. User sends `!claude <request>` in Discord
2. Bot creates a new branch and thread
3. Claude processes the request with access to:
   - File operations (Read, Write, Edit)
   - Bash commands (git, build, test)
   - GitHub API (branches, PRs)
4. Changes are committed and pushed automatically
5. User can continue the conversation in the thread
6. Submit PR when ready

## Setup

### Prerequisites

- Node.js 18+
- Discord Bot Token ([Create one here](https://discord.com/developers/applications))
- Anthropic API Key ([Get one here](https://console.anthropic.com/))
- GitHub Personal Access Token ([Create one here](https://github.com/settings/tokens))
  - Required scopes: `repo`, `workflow`

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables in `.env`:
   ```env
   DISCORD_TOKEN=your_discord_bot_token
   ANTHROPIC_API_KEY=your_anthropic_api_key
   GITHUB_TOKEN=your_github_pat
   DEFAULT_REPO=owner/repo
   WORK_DIR=/tmp/claude-bot-workspace
   ```

5. Run the bot:
   ```bash
   npm run dev
   ```

## Usage

### Basic Commands

**Start a new session:**
```
!claude create a new feature branch from main
```

**Make changes:**
```
!claude add a login page with email and password fields
```

**Continue in thread:**
Just reply in the thread Claude created:
```
Add a forgot password link
```

**Create a PR:**
```
!claude create a pull request for these changes
```

### Example Workflows

**Create a new feature:**
```
!claude create branch feature-user-auth from main,
then add a user authentication system with JWT tokens
```

**Fix a bug:**
```
!claude there's a bug in src/auth.ts line 45,
the token validation is not checking expiry
```

**Refactor code:**
```
!claude refactor the UserService class to use async/await
instead of promises
```

## Architecture

```
Discord Message
    ↓
Discord Bot (bot.ts)
    ↓
Claude Service (services/claude.ts)
    ↓
Tool Registry (tools/)
    ├── File Tools (Read, Write, Edit)
    ├── Bash Tool (git commands)
    └── GitHub Tool (API operations)
    ↓
Anthropic API (Claude with tool use)
    ↓
Response streamed back to Discord
```

## Tools Available to Claude

### File Operations
- **Read**: Read file contents with line numbers
- **Write**: Create or overwrite files
- **Edit**: Replace text in files

### Bash Commands
- Execute any bash command (git, npm, etc.)
- Run tests, builds, linters

### GitHub API
- Create branches
- Create pull requests
- List branches
- Get PR details

## Development

**Run in development mode:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
npm start
```

## Security Notes

- Never commit your `.env` file
- Use environment variables for all secrets
- Bot requires repository access via GitHub token
- Claude executes bash commands - ensure proper access controls
- Consider using separate GitHub accounts for bot operations

## Limitations

- Maximum 10 tool use iterations per request
- Discord message length limited to 2000 characters (bot auto-splits)
- Repository must be accessible via provided GitHub token
- Claude API rate limits apply

## Troubleshooting

**Bot doesn't respond:**
- Check Discord token is valid
- Ensure bot has proper permissions in server
- Verify bot can read messages and create threads

**Git operations fail:**
- Check GitHub token has `repo` scope
- Ensure repository exists and is accessible
- Verify WORK_DIR is writable

**Claude API errors:**
- Verify ANTHROPIC_API_KEY is valid
- Check API rate limits
- Ensure you have API credits

## License

MIT

## Contributing

Pull requests welcome! Please ensure:
- TypeScript code passes `npm run build`
- Changes are tested locally
- Documentation is updated

## Support

For issues and questions, please create a GitHub issue.
