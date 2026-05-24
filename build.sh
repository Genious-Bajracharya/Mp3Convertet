#!/bin/bash
set -e

echo "Installing Node dependencies..."
npm install

echo "Creating local bin directory..."
mkdir -p ./bin

echo "Downloading yt-dlp..."
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o ./bin/yt-dlp
chmod +x ./bin/yt-dlp

echo "Downloading ffmpeg static binary..."
curl -L https://github.com/yt-dlp/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-linux64-gpl.tar.xz -o /tmp/ffmpeg.tar.xz
tar -xf /tmp/ffmpeg.tar.xz -C /tmp
find /tmp -name "ffmpeg" -type f | head -1 | xargs -I{} cp {} ./bin/ffmpeg
chmod +x ./bin/ffmpeg
rm -f /tmp/ffmpeg.tar.xz

echo "Verifying..."
./bin/yt-dlp --version
./bin/ffmpeg -version | head -1

echo "Build complete!"
