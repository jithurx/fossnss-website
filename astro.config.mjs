// astro.config.mjs (FINAL CRITICAL FIX)

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { visit } from 'unist-util-visit';

// *** CRITICAL FIX: Changed from 'fossnssc' to 'fossnss-website'
const projectPath = 'fossnss-website'; 
// NOTE: Replace <YOUR_GITHUB_USERNAME> with your actual GitHub username
const githubUsername = 'jithurx'; 

// Rehype plugin to add base path prefix to image URLs in markdown content
function addBasePathToImages() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img' && node.properties?.src) {
        const src = node.properties.src;
        // If src starts with / and doesn't already contain the correct base path, add it
        if (typeof src === 'string' && src.startsWith('/') && !src.startsWith(`/${projectPath}`)) {
          node.properties.src = `/${projectPath}${src}`;
        }
      }
    });
  };
}

// Vite plugin to fix all static asset paths in final HTML that are missed by Astro's core logic
function fixAssetPaths() {
  return {
    name: 'fix-asset-paths',
    transformIndexHtml(html) {
      let fixedHtml = html;
      
      // 1. Fix CSS links (e.g., /styles/globals.css)
      fixedHtml = fixedHtml.replace(
        /href="\/styles\/([^"]+)"/g,
        `href="/${projectPath}/styles/$1"`
      );
      
      // 2. Fix Hashed Astro/Vite Scripts and CSS (_astro directory)
      fixedHtml = fixedHtml.replace(
        /(href|src)="\/_astro\/([^"]+)"/g,
        `$1="/${projectPath}/_astro/$2"`
      );
      
      // 3. Fix main root assets (e.g., /foss-icon.png)
      fixedHtml = fixedHtml.replace(
        /(href|src)="\/foss-icon.png"/g,
        `$1="/${projectPath}/foss-icon.png"`
      );

      // 4. Fix other known static paths for images
      fixedHtml = fixedHtml.replace(
        /src="\/content-images\/([^"]+)"/g,
        `src="/${projectPath}/content-images/$1"`
      );
      fixedHtml = fixedHtml.replace(
        /src="\/img\/([^"]+)"/g,
        `src="/${projectPath}/img/$1"`
      );
      
      return fixedHtml;
    },
  };
}


// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react()     // For Giscus comments
  ],
  
  markdown: {
    rehypePlugins: [addBasePathToImages],
  },
  
  vite: {
    plugins: [fixAssetPaths()],
  },
  
  site: `https://${githubUsername}.github.io/${projectPath}`,
  
  // 'base' now correctly reflects the deployment subdirectory
  base: `/${projectPath}`, 
});