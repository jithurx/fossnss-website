// astro.config.mjs (Updated)

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

// Vite plugin to fix CSS and static asset paths in final HTML that are missed
function fixAssetPaths() {
  return {
    name: 'fix-asset-paths',
    transformIndexHtml(html) {
      // Fix paths that start with /styles/, /content-images/, /img/, or /_astro/
      let fixedHtml = html.replace(
        /href="\/styles\/([^"]+)"/g,
        `href="/${projectPath}/styles/$1"`
      );
      fixedHtml = fixedHtml.replace(
        /src="\/content-images\/([^"]+)"/g,
        `src="/${projectPath}/content-images/$1"`
      );
      fixedHtml = fixedHtml.replace(
        /src="\/img\/([^"]+)"/g,
        `src="/${projectPath}/img/$1"`
      );
      // Catch core Astro/Vite assets
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
    plugins: [fixAssetPaths()],
  },
  
  site: `https://${githubUsername}.github.io/${projectPath}`,
  
  // 'base' now correctly reflects the deployment subdirectory
  base: `/${projectPath}`, // Now: /fossnss-website
});