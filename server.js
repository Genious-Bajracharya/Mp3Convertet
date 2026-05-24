const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Temp directory for downloads
const TEMP_DIR = path.join(os.tmpdir(), 'youtube-downloader');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Check if yt-dlp is installed
const checkYtDlp = () => {
  return new Promise((resolve) => {
    const proc = spawn('which', ['yt-dlp']);
    let output = '';
    proc.stdout.on('data', (data) => { output += data; });
    proc.on('close', (code) => resolve(code === 0));
  });
};

// Download and convert YouTube video to MP3
app.post('/api/download', express.json(), async (req, res) => {
  const { url, format } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const hasYtDlp = await checkYtDlp();
    if (!hasYtDlp) {
      return res.status(500).json({
        error: 'yt-dlp not installed. Install with: brew install yt-dlp ffmpeg'
      });
    }

    const filename = `download-${Date.now()}`;
    const outputPath = path.join(TEMP_DIR, filename);
    const isMP3 = format === 'mp3';

    // yt-dlp command
    const args = [
      url,
      '-o', `${outputPath}.%(ext)s`,
      '--quiet',
      '--no-warnings'
    ];

    if (isMP3) {
      args.push('-x', '--audio-format', 'mp3');
    }

    console.log(`Starting download: ${url}`);

    const proc = spawn('yt-dlp', args);
    let errorOutput = '';

    proc.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    proc.on('close', (code) => {
      if (code !== 0) {
        console.error('yt-dlp error:', errorOutput);
        return res.status(400).json({ error: 'Failed to download video: ' + errorOutput });
      }

      // Find the downloaded file
      const ext = isMP3 ? 'mp3' : 'mp4';
      const downloadedFile = path.join(TEMP_DIR, `${filename}.${ext}`);

      if (!fs.existsSync(downloadedFile)) {
        return res.status(500).json({ error: 'Downloaded file not found' });
      }

      // Send file to client
      res.download(downloadedFile, `download.${ext}`, (err) => {
        if (err) console.error('Download error:', err);
        // Clean up after download
        setTimeout(() => {
          fs.unlink(downloadedFile, (err) => {
            if (err) console.error('Cleanup error:', err);
          });
        }, 5000);
      });
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`YouTube Downloader running on http://localhost:${PORT}`);
});
