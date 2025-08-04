# 🚀 Discord Integration - Quick Start Checklist

## 📋 **Setup Checklist:**

### **Phase 1: Discord Bot Setup (15 minutes)**
- [ ] Go to [Discord Developer Portal](https://discord.com/developers/applications)
- [ ] Create new application + bot
- [ ] Copy bot token (keep secret!)
- [ ] Get your Discord channel ID
- [ ] Add bot to your server with correct permissions

### **Phase 2: Backend API (30 minutes)**
- [ ] Create Replit account at [replit.com](https://replit.com)
- [ ] Create new Node.js repl named "discord-api-server"
- [ ] Install dependencies: `npm install express cors node-fetch dotenv discord.js`
- [ ] Copy the server code from DISCORD-INTEGRATION-GUIDE.md
- [ ] Set environment variables in Replit Secrets:
  - [ ] `DISCORD_BOT_TOKEN` = your bot token
  - [ ] `DISCORD_CHANNEL_ID` = your channel ID
- [ ] Run the server and copy the Replit URL

### **Phase 3: Website Integration (5 minutes)**
- [ ] Update `js/config.js` with your Replit URL:
  ```javascript
  window.DISCORD_API_URL = 'https://your-actual-repl-url.repl.co/api/messages';
  ```
- [ ] Upload updated website to Neocities
- [ ] Test Discord messages appear on your home page

## 🎯 **Expected Results:**

✅ **After Phase 1:** Bot appears in your Discord server  
✅ **After Phase 2:** API server running and responding  
✅ **After Phase 3:** Discord messages showing on your website!  

## 🆘 **Getting Stuck?**

**Most common issues:**
1. **Bot not in server** → Check OAuth2 URL generation step
2. **No messages loading** → Check browser developer tools for errors
3. **CORS errors** → Update allowed origins in server code
4. **Bot offline** → Check bot token in Replit secrets

## 💡 **Pro Tips:**

- **Test your API first** by visiting `https://your-repl-url.repl.co` directly
- **Use Discord Developer Mode** to easily copy channel IDs
- **Check Replit console** for server errors
- **Keep your bot token secret** - never share it!

---
**Ready to start? Let's build this Discord integration! 🔥**
