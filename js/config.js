// config.js - Production configuration
// This version is safe for public deployment

// Simple environment detection
window.ENVIRONMENT = 'production';

// Production configuration
// Replace these with your actual production values

// For Chat Feature (Supabase):
window.SUPABASE_URL = 'https://your-production-supabase-url.supabase.co';
window.SUPABASE_ANON_KEY = 'your-production-anon-key-here';

// For Discord Integration (Your Backend API):
window.DISCORD_API_URL = 'https://your-replit-name.username.repl.co/api/messages';

// Note: Your website will work without these features if URLs aren't set up yet
// See local/docs/DISCORD-INTEGRATION-GUIDE.md for full setup instructions
