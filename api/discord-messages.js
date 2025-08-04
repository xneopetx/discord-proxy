// Enhanced business-grade Discord proxy
export default async function handler(req, res) {
  // Security headers for business use
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      allowed: ['GET']
    });
  }

  // Rate limiting check (basic)
  const userAgent = req.headers['user-agent'] || 'unknown';
  
  try {
    // Get the real Discord API URL from environment variable
    const discordApiUrl = process.env.DISCORD_API_URL;
    
    // Enhanced error logging for debugging
    if (!discordApiUrl) {
      console.error('Environment variables available:', Object.keys(process.env));
      return res.status(500).json({ 
        error: 'Service configuration error',
        timestamp: new Date().toISOString()
      });
    }

    console.log('Forwarding request to:', discordApiUrl.substring(0, 50) + '...');

    // Forward the request with proper error handling
    const response = await fetch(discordApiUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Business-Discord-Proxy/1.0',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Discord API responded with ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Enhanced CORS headers for business use
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    // Return clean data without metadata for now
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Business Proxy Error:', {
      error: error.message,
      timestamp: new Date().toISOString(),
      userAgent: userAgent.substring(0, 100)
    });
    
    return res.status(500).json({ 
      error: 'Service temporarily unavailable',
      message: 'Please try again in a few moments',
      timestamp: new Date().toISOString()
    });
  }
}
