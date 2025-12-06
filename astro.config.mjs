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

// REMOVED: The custom Vite plugin fixCssPaths() is removed to avoid potential interference
// function fixCssPaths() { ... }


// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react()     // For Giscus comments
  ],
  
  markdown: {
    rehypePlugins: [addBasePathToImages],
  },
  
  // REMOVED: The custom vite plugin call
  // vite: {
  //   plugins: [fixCssPaths()],
  // },
  
  // *** CRITICAL CHANGE HERE: UPDATE TO THE NEW GITHUB PAGES URL ***
  site: `https://${githubUsername}.github.io/${projectPath}`,
  
  // 'base' remains the same as it correctly handles subdirectory hosting
  base: `/${projectPath}`,
});