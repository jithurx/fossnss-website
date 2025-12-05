const fs = require('fs').promises;
const path = require('path');

async function updateEventFile(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    const eventDir = path.basename(path.dirname(filePath));
    
    // Split content into frontmatter and body
    const parts = content.split('---\n');
    if (parts.length < 3) return; // No valid frontmatter
    
    // Parse frontmatter
    const frontmatter = parts[1].split('\n')
        .filter(line => line.trim())
        .reduce((acc, line) => {
            const [key, ...values] = line.split(':').map(s => s.trim());
            const value = values.join(':').replace(/^["']|["']$/g, '');
            if (key && value) acc[key] = value;
            return acc;
        }, {});
    
    // Create new frontmatter
    const newFrontmatter = {
        title: frontmatter.title || '',
        date: frontmatter.date || '',
        author: frontmatter.name || frontmatter.author || '',
        username: frontmatter.author?.replace(/["']/g, '') || '', // GitHub username
        cover: frontmatter.cover ? 
            `/content-images/events/${eventDir}/${frontmatter.cover.replace('./', '')}` : 
            undefined
    };
    
    // Filter out undefined values
    Object.keys(newFrontmatter).forEach(key => 
        newFrontmatter[key] === undefined && delete newFrontmatter[key]
    );
    
    // Format new frontmatter
    const formattedFrontmatter = Object.entries(newFrontmatter)
        .map(([key, value]) => `${key}: ${typeof value === 'string' && value.includes(' ') ? `"${value}"` : value}`)
        .join('\n');
    
    // Update image paths in content
    let newBody = parts[2].replace(
        /!\[([^\]]*)\]\(\.\/([^)]+)\)/g,
        `![$1](/content-images/events/${eventDir}/$2)`
    );
    
    // Combine everything back together
    const newContent = `---\n${formattedFrontmatter}\n---\n${newBody}`;
    
    // Write back to file
    await fs.writeFile(filePath, newContent);
}

async function processAllEvents() {
    const eventsDir = path.join(process.cwd(), 'src/content/events');
    const entries = await fs.readdir(eventsDir, { withFileTypes: true });
    
    for (const entry of entries) {
        if (entry.isDirectory()) {
            const indexPath = path.join(eventsDir, entry.name, 'index.md');
            try {
                await fs.access(indexPath);
                console.log(`Processing ${entry.name}...`);
                await updateEventFile(indexPath);
            } catch (error) {
                console.error(`Error processing ${entry.name}:`, error.message);
            }
        }
    }
}

processAllEvents().catch(console.error);