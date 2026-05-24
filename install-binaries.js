const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BIN_DIR = path.join(__dirname, 'bin');
if (!fs.existsSync(BIN_DIR)) fs.mkdirSync(BIN_DIR);

function download(url, dest) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${path.basename(dest)}...`);
    const file = fs.createWriteStream(dest);
    const get = (url) => {
      https.get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          get(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to download: HTTP ${res.statusCode}`));
          return;
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }).on('error', reject);
    };
    get(url);
  });
}

async function main() {
  const ytDlpPath = path.join(BIN_DIR, 'yt-dlp');
  const ffmpegPath = path.join(BIN_DIR, 'ffmpeg');

  // Download yt-dlp
  await download(
    'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp',
    ytDlpPath
  );
  fs.chmodSync(ytDlpPath, '755');
  console.log('yt-dlp installed:', execSync(`${ytDlpPath} --version`).toString().trim());

  // Download ffmpeg
  const tarPath = path.join(BIN_DIR, 'ffmpeg.tar.xz');
  await download(
    'https://github.com/yt-dlp/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-linux64-gpl.tar.xz',
    tarPath
  );
  console.log('Extracting ffmpeg...');
  execSync(`tar -xf ${tarPath} -C ${BIN_DIR} --strip-components=2 --wildcards '*/bin/ffmpeg'`);
  fs.unlinkSync(tarPath);
  fs.chmodSync(ffmpegPath, '755');
  console.log('ffmpeg installed:', execSync(`${ffmpegPath} -version`).toString().split('\n')[0]);

  console.log('All binaries installed successfully!');
}

main().catch((err) => {
  console.error('Binary install failed:', err.message);
  process.exit(1);
});
