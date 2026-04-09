const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || null;

// Middleware
app.use(express.json({ limit: '5mb' }));        // Allow larger HTML payloads
app.use(express.static('public'));               // Serve web interface

// API Key check middleware (if API_KEY is set)
function requireApiKey(req, res, next) {
  if (!API_KEY) return next();                   // No key required
  const providedKey = req.query.apiKey || req.headers['x-api-key'];
  if (providedKey !== API_KEY) {
    return res.status(401).json({ error: 'Invalid or missing API key' });
  }
  next();
}

// Health check endpoint (useful for keep‑alive pings)
app.get('/health', (req, res) => res.send('OK'));

// HTML to Image conversion endpoint
app.post('/render', requireApiKey, async (req, res) => {
  const { html, width = 800, height = 600, fullPage = false } = req.body;

  if (!html) {
    return res.status(400).json({ error: 'Missing "html" field in request body' });
  }

  let browser;
  try {
    // Launch Puppeteer with Render‑compatible args
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();
    await page.setViewport({ width: Number(width), height: Number(height) });
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const screenshotOptions = fullPage
      ? { fullPage: true }
      : { type: 'png' };

    const imageBuffer = await page.screenshot(screenshotOptions);

    res.set('Content-Type', 'image/png');
    res.send(imageBuffer);
  } catch (error) {
    console.error('Rendering error:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  } finally {
    if (browser) await browser.close();
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API key protection: ${API_KEY ? 'ENABLED' : 'DISABLED'}`);
});