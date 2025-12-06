# Image Migration Guide

## Current Situation

You have images in `src/public_content/` that need to be moved to `public/` for Astro to serve them correctly.

## Recommended Solution: Move to `public/` Directory

### Why `public/`?

1. **Astro Convention**: Astro automatically copies everything from `public/` to the build output root
2. **No Code Changes Needed**: Your code already references `/content-images/...` which will work correctly
3. **Simple Paths**: Images will be available at `/fossnssc/content-images/...` (with base path)

### Structure

```
public/
├── content-images/
│   ├── blog/
│   │   ├── 2019-04-12-hackerspace/
│   │   ├── 2023-09-20-diving-into-foss/
│   │   └── ...
│   ├── events/
│   │   ├── 2019-08-02-foss-orientation/
│   │   └── ...
│   └── staff/
│       ├── viji.jpeg
│       ├── sindhu.jpeg
│       └── ...
├── foss-icon.png
└── icon.png
```

## Migration Steps

### Option 1: Manual Move (Recommended)

```bash
# Move the entire content-images directory
mv src/public_content/content-images public/

# Move the root images
mv src/public_content/foss-icon.png public/
mv src/public_content/icon.png public/

# Move img directory if needed
mv src/public_content/img public/ 2>/dev/null || true

# Clean up
rm -rf src/public_content
```

### Option 2: Using a Script

Run the migration script (see below).

## Verification

After migration, verify:
1. Images are accessible at `/fossnssc/content-images/blog/...`
2. Logo is accessible at `/fossnssc/foss-icon.png`
3. All blog/event covers load correctly
4. Staff images load correctly

## Notes

- The `public/` folder is gitignored by default (build output)
- You may want to add `public/content-images/` to git if you want to version control images
- Consider optimizing images before committing (compress, convert to WebP)

