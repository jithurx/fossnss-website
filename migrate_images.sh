#!/bin/bash
# Script to migrate images from src/public_content to public/

set -e

echo "Starting image migration..."

# Check if src/public_content exists
if [ ! -d "src/public_content" ]; then
    echo "Error: src/public_content directory not found!"
    exit 1
fi

# Create public directory if it doesn't exist
mkdir -p public

# Move content-images
if [ -d "src/public_content/content-images" ]; then
    echo "Moving content-images..."
    if [ -d "public/content-images" ]; then
        echo "Warning: public/content-images already exists. Merging..."
        cp -r src/public_content/content-images/* public/content-images/
    else
        mv src/public_content/content-images public/
    fi
fi

# Move root images
if [ -f "src/public_content/foss-icon.png" ]; then
    echo "Moving foss-icon.png..."
    mv src/public_content/foss-icon.png public/ 2>/dev/null || cp src/public_content/foss-icon.png public/
fi

if [ -f "src/public_content/icon.png" ]; then
    echo "Moving icon.png..."
    mv src/public_content/icon.png public/ 2>/dev/null || cp src/public_content/icon.png public/
fi

# Move img directory if it exists
if [ -d "src/public_content/img" ]; then
    echo "Moving img directory..."
    if [ -d "public/img" ]; then
        cp -r src/public_content/img/* public/img/
    else
        mv src/public_content/img public/
    fi
fi

# Clean up empty directories
if [ -d "src/public_content" ]; then
    rmdir src/public_content 2>/dev/null || echo "Note: Some files may remain in src/public_content"
fi

echo "Migration complete!"
echo ""
echo "Verifying migration..."
if [ -d "public/content-images" ]; then
    echo "✓ content-images directory exists"
    echo "  - Blog images: $(find public/content-images/blog -type f 2>/dev/null | wc -l) files"
    echo "  - Event images: $(find public/content-images/events -type f 2>/dev/null | wc -l) files"
    echo "  - Staff images: $(find public/content-images/staff -type f 2>/dev/null | wc -l) files"
else
    echo "✗ content-images directory not found!"
fi

if [ -f "public/foss-icon.png" ]; then
    echo "✓ foss-icon.png exists"
else
    echo "✗ foss-icon.png not found!"
fi

if [ -f "public/icon.png" ]; then
    echo "✓ icon.png exists"
else
    echo "✗ icon.png not found!"
fi
