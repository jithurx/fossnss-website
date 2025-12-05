# GitLab CI/CD Pipeline - Fixed

## Problem

The previous `.gitlab-ci.yml` had syntax errors with complex conditional statements that caused GitLab CI to fail with:
```
jobs:pages:script config should be a string or a nested array of strings up to 10 levels deep
```

## Solution

Created a clean, simplified GitLab CI pipeline that:

1. **Uses proper YAML syntax** - All script commands are simple strings in an array
2. **Leverages Astro's built-in behavior** - Astro automatically copies everything from `public/` to `dist/` during build
3. **Simplified deployment** - Just moves `dist/` to `public/` (images are already in `dist/`)

## How It Works

### Build Process

1. **Install dependencies**: `npm ci` (uses cache for speed)
2. **Build site**: `npm run build`
   - Astro builds HTML/CSS/JS to `dist/`
   - Astro **automatically copies** everything from `public/` to `dist/`
   - So `public/content-images/` → `dist/content-images/`
   - And `public/foss-icon.png` → `dist/foss-icon.png`
3. **Deploy**: Move `dist/` to `public/` for GitLab Pages
4. **Verify**: Check that images are present

### Key Points

- **No manual copying needed**: Astro handles it during `npm run build`
- **Images must be committed**: Make sure `public/content-images/` and `public/*.png` are in git
- **Clean YAML syntax**: All script commands are simple strings

## Verification

After deployment, check the CI logs for:
- `✓ content-images directory exists`
- `✓ foss-icon.png exists`

If you see `✗` warnings, the images might not be committed to git.

## Committing Images

Make sure images are tracked in git:

```bash
git add public/content-images/ public/*.png public/img/
git commit -m "Add images for deployment"
git push
```

## Testing Locally

Test the build process locally:

```bash
npm run build
ls -la dist/content-images/  # Should show images
ls -la dist/foss-icon.png    # Should exist
```

If images are in `dist/` after local build, they'll be in GitLab Pages too!

