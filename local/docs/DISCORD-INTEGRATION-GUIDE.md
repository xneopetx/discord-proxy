# 🚀 Level 3: Full Discord Integration Setup Guide

Discord integration requires creating your own backend API that connects to Discord. Here's how to do it step by step:

## 🎯 **What You'll Build:**

A backend service that:
- ✅ Connects to your Discord server
- ✅ Fetches recent messages 
- ✅ Serves them to your website via API
- ✅ Updates in real-time on your site

## 🛠️ **Step 1: Discord Bot Setup**

### **1.1: Create Discord Application**
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Name it (e.g., "My Website Bot")
4. Go to "Bot" section in left sidebar
5. Click "Add Bot"
6. **Copy the Bot Token** (keep this secret!)

### **1.2: Get Channel ID**
1. In Discord, go to your server
2. Right-click the channel you want to display
3. Click "Copy Channel ID" (enable Developer Mode in Discord settings if needed)
4. **Save this Channel ID**

### **1.3: Add Bot to Your Server**
1. In Developer Portal, go to "OAuth2" → "URL Generator"
2. Check "bot" scope
3. Check these permissions:
   - Read Messages/View Channels
   - Read Message History
4. Copy the generated URL and visit it
5. Add bot to your Discord server

## 🌐 **Step 2: Backend API Setup (Using Replit)**

### **2.1: Create Replit Project**
1. Go to [Replit.com](https://replit.com) and sign up
2. Click "Create Repl"
3. Choose "Node.js" template
4. Name it "discord-api-server"

### **2.2: Install Dependencies**
In Replit's Shell tab, run:
```bash
npm install express cors node-fetch dotenv discord.js
```

### **2.3: Create the API Server**
Replace the contents of `index.js` with:

```javascript
const express = require('express');
const cors = require('cors');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for your website
app.use(cors({
  origin: ['https://your-neocities-username.neocities.org', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

// Discord bot setup
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Store recent messages in memory
let recentMessages = [];
const MAX_MESSAGES = 50;

// Discord bot event handlers
client.once('ready', () => {
  console.log(`✅ Bot logged in as ${client.user.tag}!`);
  
  // Fetch initial messages
  fetchRecentMessages();
  
  // Update messages every 5 minutes
  setInterval(fetchRecentMessages, 5 * 60 * 1000);
});

client.on('messageCreate', (message) => {
  // Add new messages to our cache
  if (message.channelId === process.env.DISCORD_CHANNEL_ID && !message.author.bot) {
    addMessageToCache(message);
  }
});

async function fetchRecentMessages() {
  try {
    const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID);
    const messages = await channel.messages.fetch({ limit: MAX_MESSAGES });
    
    recentMessages = messages.map(msg => ({
      id: msg.id,
      content: msg.content,
      author: {
        id: msg.author.id,
        username: msg.author.username,
        avatar: msg.author.avatar,
        displayName: msg.member?.displayName || msg.author.username
      },
      timestamp: msg.createdTimestamp,
      attachments: msg.attachments.map(att => ({
        url: att.url,
        name: att.name,
        contentType: att.contentType
      }))
    })).reverse(); // Oldest first
    
    console.log(`📨 Fetched ${recentMessages.length} messages`);
  } catch (error) {
    console.error('❌ Error fetching messages:', error);
  }
}

function addMessageToCache(message) {
  const messageData = {
    id: message.id,
    content: message.content,
    author: {
      id: message.author.id,
      username: message.author.username,
      avatar: message.author.avatar,
      displayName: message.member?.displayName || message.author.username
    },
    timestamp: message.createdTimestamp,
    attachments: message.attachments.map(att => ({
      url: att.url,
      name: att.name,
      contentType: att.contentType
    }))
  };
  
  recentMessages.push(messageData);
  
  // Keep only recent messages
  if (recentMessages.length > MAX_MESSAGES) {
    recentMessages = recentMessages.slice(-MAX_MESSAGES);
  }
}

// API Routes
app.get('/', (req, res) => {
  res.json({ 
    status: 'Discord API Server Running! 🚀',
    messages: recentMessages.length,
    uptime: process.uptime()
  });
});

app.get('/api/messages', (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const offset = parseInt(req.query.offset) || 0;
  
  const messages = recentMessages.slice(offset, offset + limit);
  
  res.json({
    messages: messages,
    total: recentMessages.length,
    limit: limit,
    offset: offset
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    bot: client.user ? 'connected' : 'disconnected',
    messages: recentMessages.length
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
});

// Login to Discord
client.login(process.env.DISCORD_BOT_TOKEN);
```

### **2.4: Set Environment Variables**
In Replit, go to "Secrets" tab (lock icon) and add:

```
DISCORD_BOT_TOKEN=your_bot_token_here
DISCORD_CHANNEL_ID=your_channel_id_here
```

### **2.5: Keep Server Running**
1. Click "Run" in Replit
2. Your server will get a URL like `https://your-repl-name.username.repl.co`
3. **Copy this URL** - you'll need it!

## 🔗 **Step 3: Connect Your Website**

### **3.1: Update Your Config**
Edit `js/config.js`:

```javascript
// Replace with your actual Replit URL
window.DISCORD_API_URL = 'https://your-repl-name.username.repl.co/api/messages';
```

### **3.2: Test the Connection**
1. Upload your updated site to Neocities
2. Open browser developer tools (F12)
3. Go to your website's home page
4. Check for Discord messages loading

## 🔧 **Step 4: Advanced Configuration**

### **4.1: Message Filtering**
Add to your Discord bot code to filter certain content:

```javascript
// Filter messages (add to fetchRecentMessages function)
.filter(msg => 
  !msg.author.bot && 
  !msg.content.startsWith('!') && // Filter bot commands
  msg.content.length > 0 // Only messages with content
)
```

### **4.2: Rate Limiting**
Add rate limiting to prevent abuse:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## 🚨 **Important Security Notes**

1. **Never share your Discord Bot Token** - keep it in Replit Secrets only
2. **Update CORS origins** to match your actual Neocities URL
3. **Consider message content filtering** for inappropriate content
4. **Monitor your bot's usage** to stay within Discord's rate limits

## 🎉 **Result**

Once set up, your website will:
- ✅ Show real Discord messages from your server
- ✅ Update automatically every 30 seconds
- ✅ Display user avatars and names
- ✅ Handle message attachments
- ✅ Work reliably for public visitors

## 🆘 **Need Help?**

This is a complex setup! If you get stuck:
1. Check Replit console for errors
2. Check browser developer tools for network errors
3. Verify your Discord bot has proper permissions
4. Make sure your channel ID and bot token are correct

Want me to help you through any specific step?
