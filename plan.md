
# Website Modernization Proposal (Frontend)

This repository contains the frontend for a proposed website, built with Astro and Tailwind CSS.

It is designed around a "Markdown-First" architecture. This means it is **100% functional using only local Markdown files** from the Git repository. It is also pre-configured to "gracefully upgrade" and connect to an optional backend server in the future, with no code changes required.

## Core Technology Stack

  * **Astro:** A modern static-site generator optimized for speed and content-heavy sites.
  * **Tailwind CSS:** A utility-first CSS framework for rapid and consistent UI development.
  * **Astro Content Collections:** Manages local Markdown content (`src/content/`) with type-safety and data validation via schemas.
  * **Giscus:** An open-source, GitHub-based commenting system.
  * **GitLab CI/CD:** Pre-configured for automated builds and deployment to GitLab Pages.

-----

## Core Concept: The "Markdown-First" Hybrid Model

This project operates in one of two modes, ensuring it works immediately and has a clear path for future expansion.

### Mode 1: Markdown-Only (Default)

This is the state of the project "out of the box."

  * **How it works:** The site reads all content directly from the `src/content/` directory.
  * **Server Logic:** Code that attempts to fetch from a server is wrapped in a `try...catch` block. Since no server URL is provided, it fails silently and returns an empty list.
  * **Result:** The site builds and runs perfectly, displaying **only** your local Markdown content.

### Mode 2: Hybrid Mode (Optional Future Upgrade)

This mode is activated *only* when you are ready to deploy a backend.

  * **How to activate:**
    1.  Deploy a separate backend server (like the provided Strapi template).
    2.  Create a single `.env` file in the root of *this* project.
    3.  Add one line to it: `STRAPI_API_URL="https://your-live-server-url.com"`
  * **Result:** On the next build, the site will detect this variable, successfully fetch content from your server, and **merge it** with all your local Markdown content, sorting everything by date.

-----

## Project Structure

This is a standard Astro project. The most important files and directories are:

Here is the file structure for the `frontend-astro` project.

```
/frontend-astro
├── .env.example           # Documents the optional server URL variable
├── .gitignore             # Tells Git which files to ignore
├── .gitlab-ci.yml         # CI/CD pipeline to deploy to GitLab Pages
├── astro.config.mjs       # Astro configuration (Tailwind, React)
├── package.json           # Project dependencies (Astro, Tailwind, Giscus)
├── tailwind.config.mjs    # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration for Astro
│
├── public/                # <-- For static assets (images, fonts, icons)
│   └── foss-icon.png
│
└── src/                   # <-- All your project's source code lives here
    ├── components/        # <-- Reusable Astro components (Header.astro, etc.)
    │   ├── Header.astro
    │   ├── Footer.astro
    │   └── Giscus.astro     # Giscus (GitHub) comment component
    │
    ├── content/           # <-- Your "Git-based" Markdown content
    │   ├── blog/            # Blog posts collection
    │   ├── events/          # Events collection
    │   └── config.ts        # **CRITICAL: Schema definitions for all Markdown**
    │
    ├── layouts/           # <-- "Master" templates for pages
    │   ├── BaseLayout.astro # Main site layout (head, body, nav)
    │   └── PostLayout.astro # Layout for styling rendered Markdown
    │
    ├── pages/             # <-- Site pages. Every file is a new page.
    │   ├── index.astro      # The homepage (/)
    │   ├── about.astro      # The about page (/about)
    │   ├── blog/
    │   │   ├── index.astro       # Blog list page (/blog)
    │   │   └── [...slug].astro   # Renders local posts (e.g., /blog/my-post)
    │   └── ...
    │
    └── styles/            # <-- Global CSS styles
        └── globals.css      # Tailwind's base styles are imported here
```

-----

## Phase 1: Local Development (Markdown-Only)

This is the primary "do and learn" workflow. The site is 100% functional without any backend.

### 1\. Prerequisites

  * Node.js (v18 or higher)

### 2\. Installation & Development

```shell
# 1. Clone this repository
git clone [your-repo-url]
cd [your-repo-name]

# 2. Install all dependencies
npm install

# 3. Start the local development server
npm run dev
````

The site is now running at `http://localhost:4321`.

### 3\. Content Workflow (The Git Way)

To add or edit content, you do not need to be a developer. You only need to edit Markdown files.

1.  **Add/Edit Files:** Copy all old Markdown files into the `src/content/blog/` or `src/content/events/` folders. To create a new post, just add a new `.md` file.
2.  **Validate Schema:** Open `src/content/config.ts`. This file defines the **rules** (schema) for your Markdown frontmatter (e.g., `title`, `date`, `author`). Astro will show an error if a Markdown file's frontmatter does not match this schema.
      * You **must** either:
          * Update your old Markdown files to match the new schema.
          * Update the schema in `config.ts` to match your old files.

### 4\. Deployment (GitLab Pages)

The `.gitlab-ci.yml` file in this repository is pre-configured to automatically build the site and deploy it using GitLab Pages.

1.  Ensure GitLab Pages is **enabled** in your GitLab repository settings (under `Settings > General > Visibility, project features, permissions`).
2.  Push your code to the `main` branch.
3.  The CI/CD pipeline will run automatically, and your site will be live at your project's GitLab Pages URL (e.g., `https://your-group.gitlab.io/your-project`).

-----

## Phase 2: Activating the Server (Optional Future Plan)

This step is **not required** for the site to work. Follow these instructions only when you are ready to add a server-based admin panel.

1.  **Deploy your backend** server (e.g., the `backend-strapi` project) to a public URL.
2.  **Create a `.env` file** in the root of this frontend project. This file is listed in `.gitignore` and will not be committed to Git.
3.  **Add the server URL** to the `.env` file:
    ```
    STRAPI_API_URL="[https://your-live-strapi-server-url.com](https://your-live-strapi-server-url.com)"
    ```
4.  **Re-build/Re-deploy:** The next time you run `npm run build` (or push to `main` to trigger the CI pipeline), the site will detect this variable. It will then fetch from the server and merge its content with your local Markdown content.

-----

## Development & Customization Checklist

Key tasks for the team to complete:

  * [ ] **Configure Giscus Comments:**

      * Go to `https://giscus.app/` and follow the instructions to configure it for your GitHub repository.
      * Open `src/components/Giscus.astro`.
      * Replace all placeholder values (`repo`, `repoId`, `category`, `categoryId`) with the values Giscus provides.

  * [ ] **Implement Dark Mode Toggle:**

      * The site is configured for "class" based dark mode (`tailwind.config.mjs`).
      * You must add a UI element (e.g., a button in `src/components/Header.astro`) that toggles the `dark` class on the `<html>` element.

  * [ ] **Review Content Schemas:**

      * Thoroughly review `src/content/config.ts`.
      * Add, remove, or modify the fields for `blog`, `events`, and `members` to match your club's exact needs.

  * [ ] **Style Markdown:**

      * The rendered Markdown content is styled by the `@tailwindcss/typography` plugin (the `prose` class).
      * You can customize these styles by editing `src/layouts/PostLayout.astro`.

<!-- end list -->

