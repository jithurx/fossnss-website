# Contributing to FOSSNSS Website

This guide explains how to add new content to the FOSSNSS website.

## Adding Blog Posts

Create a new Markdown file in `src/content/blog/YYYY-MM-DD-post-title/index.md` with the following structure:

```markdown
---
title: "Your Blog Post Title"
date: 2025-11-05
author: "Your Full Name"
username: "your-github-username"
desc: "A brief description of your blog post (optional)"
cover: "/content-images/blog/your-cover-image.png"
tag: "category-tag"
---

Your blog content goes here in Markdown format.

## Subheadings

Use standard Markdown syntax for:
- Lists
- *Italics*
- **Bold**
- [Links](https://example.com)
- Images: ![Alt text](/content-images/blog/image.png)

```

## Adding Events

Create a new Markdown file in `src/content/events/YYYY-MM-DD-event-name/index.md`:

```markdown
---
title: "Event Title"
date: 2025-11-05
author: "Your Full Name"
username: "your-github-username"
cover: "/content-images/events/your-event-cover.png"
---

Event description goes here.

## Venue

> **Location Name** <br>
> Time: **HH:MM AM/PM** <br>
> Date: **Month Day, Year**

## Topics

- Topic 1
- Topic 2
- Topic 3

## Registration

Include registration details, links, or forms here.

*NOTE: Add any additional notes or requirements here*
```

## Adding Images

1. Place your images in the appropriate directory:
   - Blog images: `public/content-images/blog/`
   - Event images: `public/content-images/events/`
2. Reference images using the path starting with `/content-images/`

## Image Guidelines

- Use optimized images (compress when possible)
- Recommended formats: PNG, JPG, WebP
- Maximum image size: 1MB
- Recommended dimensions:
  - Cover images: 1200x630px
  - Content images: max-width 800px

## Member Profile

If you're a member, ensure your profile exists in `src/content/members/YYYY/your-github-username.md`:

```markdown
---
name: "Your Full Name"
avathar: "https://github.com/your-github-username.png?size=200"
url: "https://github.com/your-github-username"
dept: "Your Department"
email: "your.email@example.com"
phone: "+91 1234567890"
skills: ["Skill 1", "Skill 2"]
---
```

## Pull Request Process

1. Fork the repository
2. Create a new branch: `git checkout -b content/your-content-name`
3. Add your content following the templates above
4. Commit your changes
5. Create a Pull Request

## Need Help?

- Join our Discord server
- Open an issue on GitHub
- Contact any FOSSNSS coordinator

Remember to follow our [Code of Conduct](CODE_OF_CONDUCT.md) when contributing.