// Vercel serverless function to proxy Discord API
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the real Discord API URL from environment variable
    const discordApiUrl = process.env.DISCORD_API_URL;
    
    if (!discordApiUrl) {
      return res.status(500).json({ error: 'Discord API URL not configured' });
    }

    // Forward the request to your actual Discord API
    const response = await fetch(discordApiUrl);
    const data = await response.json();

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/json');

    // Return the data
    res.status(200).json(data);
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch Discord messages' });
  }
}
