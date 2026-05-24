# YouTube Downloader & MP3 Converter

A simple web app to download YouTube videos or convert them to MP3 audio files.

## Features

- 🎵 Download YouTube videos as MP3
- 🎬 Download YouTube videos as MP4
- 📱 Mobile-friendly web interface
- 🚀 Easy to run locally
- 🔗 Share via link when deployed

## Prerequisites

You need to install two system tools:

### macOS (using Homebrew)
```bash
brew install yt-dlp ffmpeg
```

### Linux (Ubuntu/Debian)
```bash
sudo apt-get install yt-dlp ffmpeg
```

### Windows
- Download and install [yt-dlp](https://github.com/yt-dlp/yt-dlp)
- Download and install [FFmpeg](https://ffmpeg.org/download.html)
- Add both to your PATH

## Setup

1. **Install dependencies**
```bash
npm install
```

2. **Start the server**
```bash
npm start
```

3. **Open in browser**
Visit `http://localhost:5000` on your phone or computer

## Usage

1. Paste a YouTube URL
2. Choose format (MP3 or MP4)
3. Click Download
4. File downloads to your device

## Deployment

To share this with your phone:

### Option 1: Local Network (Easiest)
Find your computer's IP address and access it from your phone:
```bash
# Get your IP (on macOS)
ifconfig | grep "inet " | grep -v 127.0.0.1
# e.g., http://192.168.1.100:5000
```

### Option 2: Railway/Render (Hosted)
1. Create account on [Railway.app](https://railway.app) or [Render.com](https://render.com)
2. Connect your GitHub repo
3. Deploy (Railway detects Node.js automatically)

**Note**: yt-dlp must be available on the hosting platform. Railway and Render support custom buildpacks.

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - development/production

## Legal Notice

⚠️ For **personal use only**. YouTube's Terms of Service prohibit downloading content without permission. Respect copyright laws in your jurisdiction.

## Troubleshooting

**"yt-dlp not installed"**
```bash
brew install yt-dlp ffmpeg
```

**Port already in use**
```bash
# Change port
PORT=3000 npm start
```

**Download fails on hosted version**
Make sure the hosting platform supports running yt-dlp. Railway and Render work best.
