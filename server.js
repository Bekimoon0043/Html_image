const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || null;

app.use(express.json({ limit: '5mb' }));
// Serve the root index.html and static assets (CSS, etc.) from current directory
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.use(express.static(__dirname));

function requireApiKey(req, res, next) {
  if (!API_KEY) return next();
  const providedKey = req.query.apiKey || req.headers['x-api-key'];
  if (providedKey !== API_KEY) {
    return res.status(401).json({ error: 'Invalid or missing API key' });
  }
  next();
}

app.get('/health', (req, res) => res.send('OK'));

// Extended endpoint: accepts { html, width, height, fullPage, format = 'png' }
app.post('/render', requireApiKey, async (req, res) => {
  const { html, width = 800, height = 600, fullPage = false, format = 'png' } = req.body;

  if (!html) {
    return res.status(400).json({ error: 'Missing "html" field in request body' });
  }

  let browser;
  try {
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

    if (format === 'pdf') {
      let pdfOptions = {
        printBackground: true,
        width: `${width}px`,
        height: `${height}px`
      };
      if (fullPage) {
        // Get the full scroll height of the page
        const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
        pdfOptions = {
          printBackground: true,
          width: `${width}px`,
          height: `${bodyHeight}px`
        };
      }
      const pdfBuffer = await page.pdf(pdfOptions);
      res.set('Content-Type', 'application/pdf');
      res.set('Content-Disposition', 'inline; filename="document.pdf"');
      res.send(pdfBuffer);
    } else {
      // PNG (default)
      const screenshotOptions = fullPage ? { fullPage: true } : { type: 'png' };
      const imageBuffer = await page.screenshot(screenshotOptions);
      res.set('Content-Type', 'image/png');
      res.send(imageBuffer);
    }
  } catch (error) {
    console.error('Rendering error:', error);
    res.status(500).json({ error: 'Failed to generate document' });
  } finally {
    if (browser) await browser.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API key protection: ${API_KEY ? 'ENABLED' : 'DISABLED'}`);
});
