// astro.config.mjs (Updated)

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { visit } from 'unist-util-visit';

const projectPath = 'fossnssc'; 
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

// Vite plugin to fix CSS paths in HTML that don't have the base path
function fixCssPaths() {
  return {
    name: 'fix-css-paths',
    transformIndexHtml(html) {
      // Fix CSS links that start with /styles/ but don't have the base path
      return html.replace(
        /href="\/styles\/([^"]+)"/g,
        `href="/${projectPath}/styles/$1"`
      );
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
  
  // *** CRITICAL CHANGE HERE: UPDATE TO THE NEW GITHUB PAGES URL ***
  site: `https://${githubUsername}.github.io/${projectPath}`,
  
  // 'base' remains the same as it correctly handles subdirectory hosting
  base: `/${projectPath}`,
});