# 🚀 Neocities Deployment Guide

## 📁 Files to Upload to Neocities

### ✅ **UPLOAD THESE:**
```
📁 Root Directory
├── index.html
├── home.html  
├── gallery.html
├── shop.html
├── blog.html
├── not_found.html
├── robots.txt
├── neocities.png
│
├── 📁 css/ (entire folder)
├── 📁 assets/ (entire folder) 
└── 📁 js/ (see modifications below)
```

### ✅ **JavaScript Files to Upload:**
```
📁 js/
├── banlist.js
├── chat.js  
├── discord-updates.js
├── gallery.js
├── music-player.js
├── spa.js
├── sparkles.js
├── taskbar.js
├── window-manager.js
└── config-production.js (rename to config.js)
```

### ❌ **DO NOT Upload:**
- `SECURITY.md` (keep local only)
- `js/config.js` (development version)
- `.git/` folder
- Any files starting with `.`

## 🔧 **Before Uploading:**

1. **Rename config file:**
   - Rename `js/config-production.js` to `js/config.js`
   - Update the placeholder values if you plan to use chat/discord features

2. **Optional - Disable unused features:**
   - If not using chat: Remove chat-related code
   - If not using discord updates: Remove discord-related code

## 🎯 **Upload Process:**

1. Go to your Neocities dashboard
2. Upload all the files listed above
3. Keep the same folder structure
4. Test your site after upload

## ✅ **Your Site Will Work With:**
- ✅ Music player
- ✅ Gallery  
- ✅ Navigation
- ✅ Visual effects
- ⚠️ Chat (needs production setup)
- ⚠️ Discord updates (needs production setup)

Your core website functionality will work perfectly on Neocities!
