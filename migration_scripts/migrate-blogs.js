const fs = require('fs').promises;
const path = require('path');

async function migrateBlogPost(oldPath, newBasePath) {
    try {
        // Read the old blog post
        const content = await fs.readFile(oldPath, 'utf8');
        
        // Split into frontmatter and content
        const parts = content.split('---\n');
        if (parts.length < 3) return;
        
        // Parse old frontmatter
        const oldFrontmatter = parts[1].split('\n')
            .filter(line => line.trim())
            .reduce((acc, line) => {
                const [key, ...values] = line.split(':').map(s => s.trim());
                const value = values.join(':').replace(/^["']|["']$/g, '');
                if (key && value) acc[key] = value;
                return acc;
            }, {});
        
        // Get directory name for image paths
        const dirName = path.basename(path.dirname(oldPath));
        
        // Create new frontmatter
        const newFrontmatter = {
            title: oldFrontmatter.title || '',
            date: oldFrontmatter.date || '',
            author: oldFrontmatter.name || oldFrontmatter.author || '',
            username: oldFrontmatter.author?.replace(/["']/g, '') || '',
            desc: oldFrontmatter.description || oldFrontmatter.desc || '',
            cover: oldFrontmatter.cover ? 
                `/content-images/blog/${dirName}/${oldFrontmatter.cover.replace('./', '')}` : 
                undefined,
            tag: oldFrontmatter.tags || oldFrontmatter.tag || ''
        };

        // Clean up undefined values
        Object.keys(newFrontmatter).forEach(key => 
            newFrontmatter[key] === undefined && delete newFrontmatter[key]
        );

        // Format new frontmatter
        const formattedFrontmatter = Object.entries(newFrontmatter)
            .map(([key, value]) => {
                if (typeof value === 'string' && value.includes(' ')) {
                    return `${key}: "${value}"`;
                }
                return `${key}: ${value}`;
            })
            .join('\n');

        // Update image paths in content
        let newContent = parts[2].replace(
            /!\[([^\]]*)\]\(\.\/([^)]+)\)/g,
            `![$1](/content-images/blog/${dirName}/$2)`
        );

        // Combine everything
        const finalContent = `---\n${formattedFrontmatter}\n---\n${newContent}`;

        // Create new directory
        const newDir = path.join(newBasePath, dirName);
        await fs.mkdir(newDir, { recursive: true });

        // Write new file
        const newFilePath = path.join(newDir, 'index.md');
        await fs.writeFile(newFilePath, finalContent);

        console.log(`Migrated: ${dirName}`);

        // Also need to copy any images
        const oldDir = path.dirname(oldPath);
        try {
            const files = await fs.readdir(oldDir);
            for (const file of files) {
                if (file.match(/\.(png|jpg|jpeg|gif|svg)$/i)) {
                    const oldImagePath = path.join(oldDir, file);
                    const newImageDir = path.join(process.cwd(), 'public/content-images/blog', dirName);
                    await fs.mkdir(newImageDir, { recursive: true });
                    const newImagePath = path.join(newImageDir, file);
                    await fs.copyFile(oldImagePath, newImagePath);
                    console.log(`  Copied image: ${file}`);
                }
            }
        } catch (err) {
            console.error(`  Error copying images for ${dirName}:`, err.message);
        }
    } catch (error) {
        console.error(`Error processing ${oldPath}:`, error.message);
    }
}

async function migrateAllBlogPosts() {
    const oldBlogDir = path.join(process.cwd(), 'old_content/blog');
    const newBlogDir = path.join(process.cwd(), 'src/content/blog');
    
    try {
        const entries = await fs.readdir(oldBlogDir, { withFileTypes: true });
        
        for (const entry of entries) {
            if (entry.isDirectory()) {
                const indexPath = path.join(oldBlogDir, entry.name, 'index.md');
                try {
                    await fs.access(indexPath);
                    await migrateBlogPost(indexPath, newBlogDir);
                } catch (error) {
                    console.error(`Error accessing ${entry.name}:`, error.message);
                }
            }
        }
    } catch (error) {
        console.error('Error reading blog directory:', error.message);
    }
}

migrateAllBlogPosts().catch(console.error);