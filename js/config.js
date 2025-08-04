// config-production.js - Clean production configuration
// This version is safe for public deployment

// Simple environment detection
window.ENVIRONMENT = 'production';

// Production configuration placeholders
// Replace these with your actual production values before deploying
window.SUPABASE_URL = 'https://your-production-supabase-url.supabase.co';
window.SUPABASE_ANON_KEY = 'your-production-anon-key-here';
window.DISCORD_API_URL = 'https://your-production-api.com/discord-messages';

// Note: If you're not using chat or discord features yet, 
// you can leave these as placeholders and the site will still work
