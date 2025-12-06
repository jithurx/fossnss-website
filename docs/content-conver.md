Here is a detailed Markdown file you can use as a guide for converting your old content.

-----

````markdown
# Migrating Old Content to the New Astro Site

This guide details the step-by-step process for converting your old Gatsby Markdown posts (blogs and events) to be compatible with the new Astro "Content Collections" standard.

## Overview

The new template is designed to be cleaner and more robust. The main differences are:

1.  **URL (Slug):** The URL for a post is now generated from its **folder name**, not a `path` field in the frontmatter.
2.  **Schema:** All frontmatter (the `---` block) **must** follow the rules in `src/content/config.ts`.
3.  **Images:** To keep things simple and reliable, all images (like `cover` posters and images in the post body) will be moved to the `public/` folder and referenced with an absolute path.

---

## Migration Steps: A Step-by-Step Example

We will use the **"FOSS Orientation"** event as a complete example.

### **The "Old" Event**

* **Folder:** `website/src/content/events/2019-08-02-foss-orientation/`
* **File:** `index.md`
* **Image:** `orientation.png` (in the same folder)

**Old `index.md` Frontmatter:**
```markdown
---
path: /events/foss-fossnss-orientation-for-freshers/
date: "2019-08-02"
datestring: "02 August 2019"
author: "maze-n"
title: "FOSS Orientation"
cover: "./orientation.png"
name: "Mazen Maliyakkal"
---

![Poster](./orientation.png)
...content...
````

-----

### **Conversion Process**

#### **Step 1: Create a Destination for Images**

In your new `frontend-astro` project, create a folder to hold all your migrated images.

1.  Create `public/content-images/`
2.  (Recommended) Create subfolders: `public/content-images/blog/` and `public/content-images/events/`

#### **Step 2: Copy the Image**

1.  Find the old image: `website/src/content/events/2019-08-02-foss-orientation/orientation.png`
2.  Copy it to the new destination: `frontend-astro/public/content-images/events/orientation.png`

#### **Step 3: Create the New Content Folder**

1.  Go to your new project's content folder: `frontend-astro/src/content/events/`
2.  Create a new folder. The name of this folder will be the URL.
      * Let's choose `foss-orientation`.
      * The new path is: `frontend-astro/src/content/events/foss-orientation/`
      * The final URL will be `/events/foss-orientation`

#### **Step 4: Create and Edit the New Markdown File**

1.  Create a new `index.md` file inside the folder from Step 3:
    `frontend-astro/src/content/events/foss-orientation/index.md`
2.  Copy the content from the old `index.md` file.
3.  **Edit the frontmatter and content** to match the new standard.

**New, Converted `index.md`:**

```markdown
---
title: "FOSS Orientation"
date: 2019-08-02
author: "maze-n"
cover: "/content-images/events/orientation.png"
---

![Poster](/content-images/events/orientation.png)

...rest of the content...
```

-----

## Summary of Changes & Key Rules

Here is a quick reference for all the changes you need to make in the frontmatter.

| Old Field (`Old`) | New Field (`New`) | Change Notes |
| :--- | :--- | :--- |
| `path: /events/...` | (Deleted) | **URL is now the folder name.** |
| `date: "2019-08-02"` | `date: 2019-08-02` | **CRITICAL:** Remove quotes. Must be a valid YAML date. |
| `cover: "./image.png"` | `cover: "/content-images/events/image.png"` | **CRITICAL:** Path must be absolute (start with `/`) and point to the `public/` folder. |
| `datestring: "..."` | (Deleted) | This is no longer needed. |
| `name: "..."` | (Deleted) | This is no longer needed (the schema uses `author`). |
| `title: "..."` | `title: "..."` | (No Change) |
| `author: "..."` | `author: "..."` | (No Change) |

**Remember:** You must also update any images in the *body* of the post.

  * **Old:** `![Poster](./orientation.png)`
  * **New:** `![Poster](/content-images/events/orientation.png)`

You must repeat this "Copy Image -\> Create Folder -\> Edit Markdown" process for every blog and event post you want to migrate.

```
```