# GitLab CI Fix for Images

## Problem

The GitLab CI script was removing the `public/` folder (which contains images) before moving `dist/` to `public/`. However, Astro automatically copies everything from `public/` to `dist/` during the build process, so the images should already be in `dist/` after the build.

## Solution

The CI script has been updated to:
1. Build the site (Astro copies `public/` → `dist/`)
2. Preserve images from `public/` to `dist/` (as a safety measure)
3. Remove `public/`
4. Move `dist/` to `public/` (images are now in `public/`)

## Updated CI Script

The `.gitlab-ci.yml` now includes safety checks to ensure images are preserved:

```yaml
script:
  - npm run build
  - ls -la dist/ | head -5
  # Preserve images and static assets from public/ before removing it
  - if [ -d "public/content-images" ]; then cp -r public/content-images dist/ 2>/dev/null || true; fi
  - if [ -f "public/foss-icon.png" ]; then cp public/foss-icon.png dist/ 2>/dev/null || true; fi
  - if [ -f "public/icon.png" ]; then cp public/icon.png dist/ 2>/dev/null || true; fi
  - if [ -d "public/img" ]; then cp -r public/img dist/ 2>/dev/null || true; fi
  - rm -rf public
  - mv dist public
  - ls -la public/ | head -5
  - echo "Checking for images..."
  - ls -la public/content-images/ 2>/dev/null | head -3 || echo "Warning: content-images not found"
  - ls -la public/*.png 2>/dev/null | head -3 || echo "Warning: PNG files not found"
```

## Verification

After the next deployment, check the CI logs for:
- "Checking for images..." message
- List of content-images directory
- List of PNG files

If images are missing, the warnings will help identify the issue.

## Alternative: Ensure Images are Committed

Make sure all images in `public/` are committed to git:

```bash
git add public/content-images/ public/*.png public/img/
git commit -m "Add images for GitLab Pages"
git push
```

## How Astro Handles public/

- **During Development**: Files in `public/` are served directly
- **During Build**: Astro copies everything from `public/` to the root of `dist/`
  - `public/content-images/` → `dist/content-images/`
  - `public/foss-icon.png` → `dist/foss-icon.png`
- **After Build**: `dist/` contains both built pages AND static assets

So the images should already be in `dist/` after `npm run build`, and moving `dist/` to `public/` should preserve them.

