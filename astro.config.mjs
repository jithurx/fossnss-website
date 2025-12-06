// astro.config.mjs (Final Fix: Aligning projectPath with Repository Name)

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { visit } from 'unist-util-visit';

// Based on your deployment URL (https://jithurx.github.io/fossnss-website/)
const projectPath = 'fossnss-website'; 
// NOTE: Replace <YOUR_GITHUB_USERNAME> with your actual GitHub username
const githubUsername = 'jithurx'; 

// Rehype plugin to add base path prefix to image URLs in markdown
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

// Re-introducing the manual path fix with the CORRECT projectPath as a safeguard
function fixCssPaths() {
  return {
    name: 'fix-css-paths',
    transformIndexHtml(html) {
      // Fix CSS links that start with /styles/ but don't have the base path
      let fixedHtml = html.replace(
        /href="\/styles\/([^"]+)"/g,
        `href="/${projectPath}/styles/$1"`
      );
      // Also catch any un-prefixed hashed assets (e.g., /_astro/...)
      fixedHtml = fixedHtml.replace(
        /href="\/_astro\/([^"]+)"/g,
        `href="/${projectPath}/_astro/$1"`
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
    plugins: [fixCssPaths()],
  },
  
  // Update site and base to use the correct projectPath (repository name)
  site: `https://${githubUsername}.github.io/${projectPath}`,
  
  // 'base' now correctly reflects the deployment subdirectory
  base: `/${projectPath}`, // Now: /fossnss-website
});