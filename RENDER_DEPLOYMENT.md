# Deploying to Render

Follow these steps to deploy your Media Downloader app to Render:

## Step 1: Push to GitHub

First, initialize a git repository and push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit: Media downloader with YouTube, TikTok, and Instagram support"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/youtubedownloader.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username and create the repo on GitHub first.

## Step 2: Connect to Render

1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Click **"New +"** → **"Web Service"**
4. Select **"Connect a repository"** and choose your `youtubedownloader` repo
5. Configure:
   - **Name**: `media-downloader` (or any name you like)
   - **Environment**: `Node`
   - **Build Command**: Leave blank (uses `render.yaml`)
   - **Start Command**: Leave blank (uses `render.yaml`)
   - **Plan**: Free tier works great
6. Click **"Create Web Service"**

## Step 3: Wait for Deployment

Render will:
- Install Node dependencies
- Install `yt-dlp` and `ffmpeg`
- Start your app

You'll see a live URL like: `https://media-downloader-xxxxx.onrender.com`

## ✨ Your App is Live!

Visit your Render URL and start downloading from YouTube, TikTok, and Instagram!

## 📝 Notes

- The free tier on Render spins down after 15 minutes of inactivity (so first request takes longer)
- Files are downloaded to a temp directory and deleted after 5 seconds
- For production, consider upgrading to a paid plan for always-on service

## Troubleshooting

- **"yt-dlp not found"**: The build takes a minute. Check logs in Render dashboard.
- **Download fails**: Make sure your internet connection is stable
- **App won't start**: Check the logs in Render dashboard for errors
