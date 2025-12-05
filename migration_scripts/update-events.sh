#!/bin/bash

# Function to update a single markdown file
update_event_file() {
    local file="$1"
    local dir=$(dirname "$file")
    local event_name=$(basename "$dir")
    
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Process the file
    awk -v event_name="$event_name" '
    BEGIN { in_frontmatter = 0; has_frontmatter = 0; printed_frontmatter = 0 }
    
    # Store frontmatter content
    /^---$/ {
        if (in_frontmatter == 0) {
            in_frontmatter = 1
            has_frontmatter = 1
            print "---" > temp_frontmatter
            next
        } else {
            in_frontmatter = 0
            next
        }
    }
    
    in_frontmatter == 1 {
        # Skip path and datestring fields
        if ($1 == "path:" || $1 == "datestring:") next
        
        # Fix date format if needed
        if ($1 == "date:") {
            # Remove quotes if present
            gsub(/["']/, "", $2)
            print "date:", $2 > temp_frontmatter
            next
        }
        
        # Handle author and username
        if ($1 == "author:") {
            username = $2
            gsub(/["']/, "", username)
            print "username:", username > temp_frontmatter
            next
        }
        
        if ($1 == "name:") {
            name = $0
            sub(/^name: /, "", name)
            gsub(/["']/, "", name)
            print "author:", name > temp_frontmatter
            next
        }
        
        # Update image paths
        if ($1 == "cover:") {
            img_path = $2
            gsub(/["']/, "", img_path)
            gsub(/^\.\//, "", img_path)
            print "cover: \"/content-images/events/" event_name "/" img_path "\"" > temp_frontmatter
            next
        }
        
        # Keep other frontmatter fields as is
        print > temp_frontmatter
        next
    }
    
    # Process main content
    {
        if (!printed_frontmatter && !in_frontmatter && has_frontmatter) {
            # Print the processed frontmatter
            system("cat temp_frontmatter")
            print "---"
            printed_frontmatter = 1
        }
        
        # Update image paths in content
        if ($0 ~ /!\[.*\]\(\.\//) {
            gsub(/\(\.\//, "(/content-images/events/" event_name "/")
        }
        print
    }
    ' "$file" > "$temp_file"
    
    # Replace original file with processed content
    mv "$temp_file" "$file"
    rm -f temp_frontmatter
}

# Process all event files
find src/content/events -name "index.md" -type f | while read -r file; do
    echo "Processing $file..."
    update_event_file "$file"
done

echo "All event files have been updated!"