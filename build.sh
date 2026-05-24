#!/bin/bash
set -e

echo "Installing Node dependencies..."
npm install

echo "Updating system packages..."
apt-get update -qq

echo "Installing ffmpeg..."
apt-get install -y ffmpeg

echo "Installing yt-dlp..."
apt-get install -y python3 python3-pip
pip3 install --upgrade yt-dlp --break-system-packages 2>/dev/null || pip3 install --upgrade yt-dlp

echo "Symlinking yt-dlp to /usr/local/bin..."
YT_DLP_PATH=$(python3 -c "import shutil; print(shutil.which('yt-dlp') or '')" 2>/dev/null)
if [ -n "$YT_DLP_PATH" ] && [ "$YT_DLP_PATH" != "/usr/local/bin/yt-dlp" ]; then
  ln -sf "$YT_DLP_PATH" /usr/local/bin/yt-dlp
fi

echo "Verifying..."
yt-dlp --version
ffmpeg -version | head -1

echo "Build complete!"
