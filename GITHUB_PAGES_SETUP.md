# GitHub Pages Setup Guide

## Automatic Setup Instructions

To enable GitHub Pages for this repository and get a live URL, follow these steps:

### Method 1: Via GitHub Web Interface (Recommended)

1. Go to your repository on GitHub:
   ```
   https://github.com/olivianielsen15/global-housing
   ```

2. Click on **Settings** (at the top of the repository page)

3. In the left sidebar, click on **Pages** (under "Code and automation")

4. Under "Source":
   - Select **Deploy from a branch**
   - Choose branch: `claude/housing-data-globe-map-mKiDo`
   - Choose folder: `/ (root)`
   - Click **Save**

5. Wait a few minutes for GitHub to build and deploy

6. Your site will be live at:
   ```
   https://olivianielsen15.github.io/global-housing/
   ```

### Method 2: Using GitHub CLI (if installed)

```bash
gh repo set-default olivianielsen15/global-housing
gh api repos/olivianielsen15/global-housing/pages \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  -f source[branch]=claude/housing-data-globe-map-mKiDo \
  -f source[path]=/
```

## Alternative: Create Main Branch for Pages

If you prefer to use a standard branch name:

```bash
# Create main branch from current code
git checkout -b main
git push -u origin main

# Then enable GitHub Pages from the main branch via Settings > Pages
```

## Expected Live URL

Once enabled, your interactive globe will be accessible at:

**https://olivianielsen15.github.io/global-housing/**

## Troubleshooting

- If you get a 404 error, wait 5-10 minutes for GitHub to finish deployment
- Ensure the repository is public (Pages doesn't work with private repos on free tier)
- Check Settings > Pages for deployment status and errors

## Verification

Once deployed, you can verify by:
1. Checking Settings > Pages for the green "Your site is live" message
2. Visiting the URL directly
3. Sharing the URL with others!
