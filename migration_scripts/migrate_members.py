# Migrate members from old_content to src/content
import os
import shutil

old_root = 'old_content/members'
new_root = 'src/content/members'

# Create destination directories if they don't exist
for year in range(2020, 2026):
    year_dir = os.path.join(new_root, str(year))
    os.makedirs(year_dir, exist_ok=True)
    
    # Source directory
    old_year_dir = os.path.join(old_root, str(year))
    if os.path.exists(old_year_dir):
        # Copy all .md files
        for file in os.listdir(old_year_dir):
            if file.endswith('.md'):
                src = os.path.join(old_year_dir, file)
                dst = os.path.join(year_dir, file)
                shutil.copy2(src, dst)
                print(f'Copied {src} -> {dst}')