// astro.config.mjs (FINAL FIX: Aligning projectPath with Repository Name)

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { visit } from 'unist-util-visit';

// *** CRITICAL FIX: This MUST match your GitHub repository name
const projectPath = 'fossnss-website'; 
// NOTE: Replace <YOUR_GITHUB_USERNAME> with your actual GitHub username
const githubUsername = 'jithurx'; 

// Rehype plugin to add base path prefix to image URLs in markdown content
function addBasePathToImages() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img' && node.properties?.src) {
        const src = node.properties.src;
        // If src starts with / and doesn't already contain the base path, add it
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
      
      // 1. Fix CSS links
      fixedHtml = fixedHtml.replace(
        /href="\/styles\/([^"]+)"/g,
        `href="/${projectPath}/styles/$1"`
      );
      
      // 2. Fix Hashed Astro/Vite Scripts and CSS (_astro directory)
      fixedHtml = fixedHtml.replace(
        /(href|src)="\/_astro\/([^"]+)"/g,
        `$1="/${projectPath}/_astro/$2"`
      );
      
      // 3. Fix main icon/favicon paths (e.g., /foss-icon.png)
      fixedHtml = fixedHtml.replace(
        /(href|src)="\/foss-icon.png"/g,
        `$1="/${projectPath}/foss-icon.png"`
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
  base: `/${projectPath}`, // FINAL VALUE: /fossnss-website
});