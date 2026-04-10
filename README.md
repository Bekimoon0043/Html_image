# 🖼️ HTML to Image Microservice

A lightweight, self-hostable service that converts HTML/CSS into high-quality PNG images using Puppeteer. Perfect for generating social media graphics, Telegram stickers, email signatures, or automated report cards.

## ✨ Features

- **REST API** – Simple POST endpoint for programmatic use  
- **Web Interface** – Paste HTML and preview instantly  
- **Emoji Support** – Full color emoji rendering (Noto Color Emoji included)  
- **Transparent Backgrounds** – Ideal for sticker/overlay generation  
- **Custom Dimensions** – Set width, height, or capture full page  
- **Docker Ready** – Deploy anywhere in minutes  
- **n8n Compatible** – Works out-of-the-box with n8n HTTP Request node  

## 🚀 Deploy to Render (Free Tier)

Click the button below to deploy instantly:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/your-username/html-to-image-service)

### Manual Deployment

1. Fork or clone this repository.
2. Create a new **Web Service** on [Render](https://render.com).
3. Connect your GitHub repository.
4. Use the following settings:
   - **Runtime**: Docker  
   - **Instance Type**: Free  
   - **Health Check Path**: `/health`  
5. Add environment variables if needed (see [Configuration](#-configuration)).
6. Click **Create Web Service**.

The first build takes ~5–8 minutes. Once live, your service will be available at `https://your-app.onrender.com`.

> ⚠️ **Free Tier Note:** Services spin down after 15 minutes of inactivity. Use [UptimeRobot](https://uptimerobot.com) or a cron job to ping `/health` every 10 minutes to keep it warm.

## 🖥️ Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/html-to-image-service.git
cd html-to-image-service

# Install dependencies
npm install

# Start the server
npm start
