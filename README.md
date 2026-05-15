# 🖼️ HTML to Image / PDF Microservice

A lightweight, self-hostable service that converts HTML/CSS into high-quality **PNG images** or **PDF documents** using Puppeteer. Perfect for generating social media graphics, invoices, reports, Telegram stickers, or automated document creation.

## ✨ Features

- **REST API** – Simple POST endpoint for PNG or PDF
- **Web Interface** – Paste HTML, choose format, preview/download instantly
- **Emoji Support** – Full color emoji rendering (Noto Color Emoji included)
- **Transparent Backgrounds** – Ideal for stickers/overlays
- **Custom Dimensions** – Set width/height or capture full page
- **PDF Support** – Vector‑based output, perfect for printing or archiving
- **Docker Ready** – Deploy anywhere in minutes
- **n8n Compatible** – Works with n8n HTTP Request node

## 🚀 Deploy to Render (Free Tier)

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

> ⚠️ **Free Tier Note:** Services spin down after 15 minutes of inactivity. Use [UptimeRobot](https://uptimerobot.com) or a cron job to ping `/health` every 10 minutes to keep it warm.

## 🖥️ Local Development

```bash
git clone https://github.com/your-username/html-to-image-service.git
cd html-to-image-service
npm install
npm start
