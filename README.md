# FOSSNSS Website

The official website of FOSSNSS (Free and Open Source Software Cell) of NSS College of Engineering, Palakkad.

**Live:** https://jithurx.gitlab.io/fossnssc

## 📝 Contributing Content

Want to add a blog post or event? Check out our [Contributing Guide](CONTRIBUTING.md) for detailed instructions on how to:

- Add blog posts
- Create event pages
- Update member profiles
- Add images and media

## 🛠 Tech Stack

- [Astro](https://astro.build) - Static site generator
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org) - Type-safe JavaScript
- [React](https://react.dev) - For interactive components (Giscus comments)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment

This site is automatically deployed to **GitLab Pages** when changes are pushed to the `main` branch.

For detailed deployment instructions and troubleshooting, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Environment

- **Production URL:** https://jithurx.gitlab.io/fossnssc
- **CI/CD Pipeline:** Defined in `.gitlab-ci.yml`
- **Build Output:** `dist/` → `public/` (GitLab Pages)

## 📂 Project Structure

```
src/
├── components/      # Reusable components
├── content/         # Blog posts and events (Markdown)
│   ├── blog/
│   └── events/
├── layouts/         # Page layouts
├── pages/           # Page routes
└── styles/          # Global styles
public/              # Static assets (images, icons)
```

## 🎯 Features

- ✅ Static site generation for fast performance
- ✅ Markdown-first content management
- ✅ Responsive design with dark mode
- ✅ Blog and event management
- ✅ Giscus comments integration
- ✅ Automatic deployment to GitLab Pages
