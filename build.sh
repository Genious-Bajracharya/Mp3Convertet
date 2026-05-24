#!/bin/bash
set -e

echo "Installing dependencies..."
npm install

echo "Updating system packages..."
apt-get update

echo "Installing ffmpeg..."
apt-get install -y ffmpeg

echo "Installing yt-dlp..."
apt-get install -y python3 python3-pip
pip3 install --upgrade yt-dlp

echo "Verifying installations..."
yt-dlp --version
ffmpeg -version | head -1

echo "Build complete!"
