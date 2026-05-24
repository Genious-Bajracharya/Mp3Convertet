#!/bin/bash
set -e

echo "Installing Node dependencies..."
npm install

echo "Installing ffmpeg..."
apt-get update -qq
apt-get install -y ffmpeg

echo "Downloading yt-dlp binary..."
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
chmod a+rx /usr/local/bin/yt-dlp

echo "Verifying..."
yt-dlp --version
ffmpeg -version | head -1

echo "Build complete!"
