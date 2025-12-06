/**
 * Utility function to handle image paths with base path
 * Automatically prepends the base path when needed
 */

// *** CRITICAL FIX: Update to the correct GitHub repository name
const BASE_PATH = '/fossnss-website';

/**
 * Get the full image URL with base path prefix
 * @param imagePath - The image path (e.g., '/content-images/blog/image.jpg')
 * @returns The full URL with base path prefix
 */
export function getImageUrl(imagePath: string): string {
  if (!imagePath) return '';
  
  // If it's already an absolute URL (http/https), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it doesn't start with /, it's likely relative, return as is
  if (!imagePath.startsWith('/')) {
    return imagePath;
  }
  
  // If it already includes the base path, return as is
  if (imagePath.startsWith(BASE_PATH)) {
    return imagePath;
  }
  
  // Prepend the base path
  return `${BASE_PATH}${imagePath}`;
}

/**
 * Get the favicon URL with base path
 * @param faviconPath - The favicon path
 * @returns The full URL with base path prefix
 */
export function getFaviconUrl(faviconPath: string): string {
  return getImageUrl(faviconPath);
}

/**
 * Get the full page URL with base path prefix
 * Use this for internal page links to ensure they work correctly on GitHub Pages
 * @param pagePath - The page path (e.g., '/blog', '/about', '/code-of-conduct')
 * @returns The full URL with base path prefix
 */
export function getPageUrl(pagePath: string): string {
  if (!pagePath) return '';
  
  // If it's already an absolute URL (http/https), return as is
  if (pagePath.startsWith('http://') || pagePath.startsWith('https://')) {
    return pagePath;
  }
  
  // If it doesn't start with /, it's likely relative, return as is
  if (!pagePath.startsWith('/')) {
    return pagePath;
  }
  
  // If it already includes the base path, return as is
  if (pagePath.startsWith(BASE_PATH)) {
    return pagePath;
  }
  
  // Prepend the base path
  return `${BASE_PATH}${pagePath}`;
}