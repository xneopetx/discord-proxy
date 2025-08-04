// config.js - Production Configuration Guide
// This file helps manage environment-specific settings

// For production deployment, create a config.js file that sets these globals:
// window.ENVIRONMENT = 'production';
// window.SUPABASE_URL = 'your-production-supabase-url';
// window.SUPABASE_ANON_KEY = 'your-production-anon-key';
// window.DISCORD_API_URL = 'your-production-discord-api-endpoint';

// Development settings (these will be used when no production config is found)
if (typeof window !== 'undefined') {
    window.ENVIRONMENT = window.ENVIRONMENT || 'development';
    
    // Only set defaults if not already configured
    if (!window.SUPABASE_URL) {
        console.warn('⚠️  Using development Supabase configuration. Set window.SUPABASE_URL for production.');
    }
    
    if (!window.DISCORD_API_URL) {
        console.warn('⚠️  Using development Discord API configuration. Set window.DISCORD_API_URL for production.');
    }
}

// Export configuration helpers
export const isProduction = () => window.ENVIRONMENT === 'production';
export const isDevelopment = () => window.ENVIRONMENT === 'development';

export const getConfig = (key, fallback = null) => {
    return window[key] || fallback;
};
