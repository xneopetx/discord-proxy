# Discord API Proxy

This is a simple proxy server that forwards Discord API requests while hiding the real backend URL.

## Deployment to Vercel (Updated Instructions)

### Option 1: GitHub (Recommended)
1. Create a new GitHub repository
2. Upload this entire folder to the repository
3. Go to [vercel.com](https://vercel.com) → "Add New" → "Project"
4. Import from your GitHub repository
5. Set environment variable `DISCORD_API_URL` in deployment settings
6. Deploy!

### Option 2: Vercel CLI (Alternative)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in this folder
3. Follow the prompts to deploy

## Environment Variables

- `DISCORD_API_URL`: Your actual Discord API endpoint (currently: `https://8aa5dba9-a0d7-49a0-be13-bb0913d48f60-00-3rwl9v1mf0e9l.janeway.replit.dev/api/messages`)

## Usage

Once deployed, your website will call:
```
https://your-vercel-app.vercel.app/api/discord-messages
```

Instead of the real Discord API URL, keeping your backend secure!
