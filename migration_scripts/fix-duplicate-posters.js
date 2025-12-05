const fs = require('fs').promises;
const path = require('path');

async function fixEventFile(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const eventDir = path.basename(path.dirname(filePath));
        
        // Split into parts by frontmatter markers
        const parts = content.split('---\n');
        if (parts.length < 3) return; // No valid frontmatter
        
        const frontmatter = parts[1];
        let mainContent = parts[2];
        
        // Extract cover image path from frontmatter
        const coverMatch = frontmatter.match(/cover:\s*["']?([^"'\n]+)["']?/);
        if (!coverMatch) return; // No cover image to check against
        
        // Clean up the cover path to match potential poster references
        const coverPath = coverMatch[1]
            .replace(/^\/content-images\/events\//, '')
            .replace(eventDir + '/', '');
            
        // Remove the poster image if it appears right after frontmatter
        mainContent = mainContent.replace(
            new RegExp(`^\\s*!\\[(?:Poster|poster|)\\]\\([^)]*${path.basename(coverPath)}\\)\\s*\n*`),
            ''
        );
        
        // Reconstruct the file
        const newContent = `---\n${frontmatter}---\n${mainContent}`;
        
        // Only write if content changed
        if (newContent !== content) {
            await fs.writeFile(filePath, newContent);
            console.log(`Fixed duplicate poster in ${eventDir}`);
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
    }
}

async function processAllEvents() {
    const eventsDir = path.join(process.cwd(), 'src/content/events');
    const entries = await fs.readdir(eventsDir, { withFileTypes: true });
    
    for (const entry of entries) {
        if (entry.isDirectory()) {
            const indexPath = path.join(eventsDir, entry.name, 'index.md');
            try {
                await fs.access(indexPath);
                await fixEventFile(indexPath);
            } catch (error) {
                console.error(`Error accessing ${entry.name}:`, error.message);
            }
        }
    }
}

processAllEvents().catch(console.error);