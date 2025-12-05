import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class', // Enables class-based dark mode (for a toggle)
  theme: {
    extend: {
      // You can add custom fonts, colors, etc. here
    },
  },
  plugins: [
    typography(), // Adds the `prose` class for styling Markdown
  ],
}