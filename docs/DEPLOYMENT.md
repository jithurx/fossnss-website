# GitLab Pages Deployment Guide

This document explains how the FOSSNSS website is configured for deployment on GitLab Pages.

## Overview

The website is automatically deployed to GitLab Pages whenever changes are pushed to the `main` branch. The deployment process uses GitLab CI/CD pipeline defined in `.gitlab-ci.yml`.

## Deployment URL

**Production:** https://jithurx.gitlab.io/fossnssc

## How It Works

### 1. **Build Process**

When you push to the `main` branch:

1. GitLab CI picks up the `.gitlab-ci.yml` configuration
2. A Docker container with Node 18 Alpine is created
3. Dependencies are installed from `package.json`
4. The Astro build process runs: `npm run build`
5. The build output (in `dist/`) is moved to `public/`
6. GitLab Pages publishes the contents of `public/` folder

### 2. **Configuration**

The deployment is configured through:

- **`astro.config.mjs`**: Specifies the site URL and base path
  ```javascript
  site: `https://jithurx.gitlab.io/fossnssc`,
  base: `/fossnssc`,
  ```
  The `base` path is crucial for serving the site from a subdirectory.

- **`.gitlab-ci.yml`**: Defines the CI/CD pipeline
  - Runs on commits to `main` and `master` branches
  - Caches `node_modules` for faster builds
  - Builds the site and deploys to GitLab Pages

### 3. **Environment Variables**

If you need to add environment variables (e.g., API keys):

1. Go to **Project Settings** → **CI/CD** → **Variables**
2. Add your variables there
3. They will be automatically available during the build process

Create a `.env.production` file locally for testing, but add it to `.gitignore` (already done).

## Local Development

To test the production build locally:

```bash
# Install dependencies
npm install

# Build the site
npm run build

# Preview the build
npm run preview
```

## Troubleshooting

### Build Fails

1. **Check the CI/CD Logs:**
   - Go to **Project** → **CI/CD** → **Pipelines**
   - Click the failed pipeline to see detailed logs

2. **Common Issues:**
   - Missing `package-lock.json`: Run `npm install` locally and commit
   - Node version mismatch: Check `.gitlab-ci.yml` image version
   - Cache issues: Manually clear runner cache in GitLab settings

### Site Not Showing

1. Verify the build artifact is generated:
   - Check pipeline logs for "public" artifact
   - Ensure `dist/` folder has content before being moved

2. Check GitLab Pages settings:
   - Go to **Project Settings** → **Pages**
   - Verify deployment domain is correct

### Assets Not Loading

This is usually caused by incorrect base path configuration.

1. Verify `astro.config.mjs`:
   ```javascript
   base: `/fossnssc`,
   ```

2. Check that all links use relative paths where needed

3. Rebuild and redeploy

## Caching Strategy

The CI/CD pipeline uses intelligent caching:

- Caches are keyed by `package-lock.json`
- Node modules are cached across builds
- Cache is prefixed by branch name to avoid conflicts
- Significantly speeds up subsequent builds

## Security

- Environment secrets are stored in GitLab CI/CD Variables
- Never commit `.env` files or API keys
- `.gitignore` is properly configured to prevent accidental commits

## Custom Domain (Optional)

To use a custom domain instead of `jithurx.gitlab.io`:

1. Go to **Project Settings** → **Pages**
2. Click **New Domain**
3. Add your domain and follow DNS instructions
4. Update `astro.config.mjs` site URL if needed

## Rollback

If a deployment breaks:

1. Identify the problematic commit
2. Use `git revert` or `git reset` to undo changes
3. Push to main branch
4. New deployment will automatically replace the broken version

## Performance Tips

- Keep blog/event images optimized (use WebP format)
- Leverage browser caching headers (configured by Astro)
- Regular cleanup of old artifacts to save storage
- Monitor build times and optimize if needed

## Support

For issues with GitLab Pages, see:
- [GitLab Pages Documentation](https://docs.gitlab.com/ee/user/project/pages/)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/)
