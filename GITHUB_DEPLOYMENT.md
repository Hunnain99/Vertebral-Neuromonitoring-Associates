# GitHub Pages Deployment Guide

This guide will help you deploy your website to GitHub Pages so you can share it with others.

## Step 1: Create a GitHub Account (if you don't have one)

1. Go to [https://github.com](https://github.com)
2. Click **"Sign up"** and create a free account
3. Verify your email address

## Step 2: Create a New Repository on GitHub

1. Log in to GitHub
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `chacha-website` (or any name you prefer)
   - **Description**: "Vertebral Neurodiagnostic Associates LLC Website" (optional)
   - **Visibility**: Choose **Public** (required for free GitHub Pages)
   - **DO NOT** check "Initialize with README" (we already have files)
5. Click **"Create repository"**

## Step 3: Initialize Git and Push Your Code

Open your terminal/command prompt in your project folder and run these commands:

### Initialize Git Repository
```bash
git init
```

### Add All Files
```bash
git add .
```

### Create Initial Commit
```bash
git commit -m "Initial commit: Website with EmailJS and Square integration"
```

### Connect to GitHub Repository
Replace `YOUR_USERNAME` with your GitHub username and `YOUR_REPO_NAME` with your repository name:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### Push to GitHub
```bash
git branch -M main
git push -u origin main
```

**Note**: You'll be prompted to enter your GitHub username and password (or use a Personal Access Token).

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **"Settings"** (top menu)
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click **"Save"**

## Step 5: Access Your Live Website

After a few minutes, your website will be live at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

For example, if your username is `john` and repo is `chacha-website`:
```
https://john.github.io/chacha-website/
```

## Step 6: Share Your Website

You can now share this link with anyone! The website will automatically update whenever you push changes to GitHub.

## Updating Your Website

Whenever you make changes to your website:

1. Make your changes to the files
2. Run these commands:
```bash
git add .
git commit -m "Description of your changes"
git push
```

Your website will update automatically within a few minutes!

## Troubleshooting

### "Repository not found" error?
- Make sure you've created the repository on GitHub first
- Check that the repository name and username are correct
- Verify you're logged into GitHub

### GitHub Pages not showing?
- Wait 5-10 minutes after enabling Pages (it takes time to build)
- Check the "Pages" section in Settings to see if there are any errors
- Make sure your `index.html` is in the root folder

### Authentication issues?
- GitHub no longer accepts passwords for Git operations
- You need to use a **Personal Access Token** instead:
  1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Click "Generate new token"
  3. Give it a name and select `repo` scope
  4. Copy the token and use it as your password when pushing

## Custom Domain (Optional)

If you want to use your own domain (e.g., `www.yourdomain.com`):

1. In GitHub Pages settings, enter your custom domain
2. Update your domain's DNS settings to point to GitHub Pages
3. See [GitHub's custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) for details

---

**Your website is now live and shareable!** 🎉

