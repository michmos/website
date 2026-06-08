# Product Requirements Document
## Personal Website

**Version:** 1.0  
**Status:** Draft  
**Last Updated:** June 8, 2026

---

## 1. Overview

A minimalist personal website serving as a public presence for blog posts and an about page. The site is statically generated for GitHub Pages hosting, requires no backend or CMS, and is built with modern frontend tooling.

---

## 2. Goals

- Publish and showcase blog posts in a clean, readable format
- Provide a personal bio page with professional links
- Maintain full ownership of content via local Markdown files
- Keep infrastructure minimal: no server, no database, no third-party CMS

---

## 3. Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Content | Local Markdown files |
| Hosting | GitHub Pages (static export) |
| Database | None |
| CMS | None |

**Static export:** `next export` (or `output: 'export'` in `next.config.js`) generates a fully static site compatible with GitHub Pages.

---

## 4. Pages & Navigation

### 4.1 Navigation Bar

Two items, always visible:

1. **Posts** — links to `/posts`
2. **About Me** — links to `/about`

The nav also contains the dark/light mode toggle (see Section 6.3).

---

### 4.2 Posts Page (`/posts`)

**Purpose:** Browse all blog posts.

**Layout:**

- Posts displayed as a vertical list or grid of cards, ordered by publishing date (newest first)
- Each card shows:
  - Thumbnail image
  - Title
  - Short description (excerpt, ~1–2 sentences)
  - Publishing date

**Pinned Posts:**

- Posts can be marked as pinned via a frontmatter flag (e.g., `pinned: true`)
- Pinned posts appear above non-pinned posts, separated by a clear visual divider (e.g., a label "Pinned" or a horizontal rule with a section heading)
- Within the pinned section, posts are still sorted by date (newest first)
- Within the non-pinned section, posts are sorted by date (newest first)

**Post Detail Page (`/posts/[slug]`):**

- Full Markdown content rendered as HTML
- Supports inline images and embedded videos (via standard Markdown image syntax and HTML `<video>` or iframe embeds)
- Clean reading layout with comfortable line length (~65–75 characters)

**Content Format (Markdown frontmatter):**

```yaml
---
title: "Post Title"
date: "2026-05-01"
description: "Short excerpt shown on the posts overview page."
thumbnail: "/images/posts/my-post/thumbnail.jpg"
pinned: false
---
```

---

### 4.3 About Me Page (`/about`)

**Purpose:** Personal introduction and contact links.

**Content:**

- Profile picture (circular crop)
- Short bio (free-form text, authored in a config file or MDX component)
- Links displayed as icon + label:
  - GitHub
  - LinkedIn
  - Email (mailto link)
  - CV / Resume (downloadable PDF, served as a static asset)

---

## 5. Content Management

All content lives in the repository. No external service is required.

```
/content
  /posts
    my-first-post.md
    another-post.md
/public
  /images
    /posts
      /my-first-post
        thumbnail.jpg
    profile.jpg
  resume.pdf
```

- Markdown files are parsed at build time using a library such as `gray-matter` (frontmatter) and `remark` or `next-mdx-remote` (content rendering)
- Images referenced in posts are stored under `/public/images/posts/[slug]/`
- Adding a new post = creating a new `.md` file and running the build

---

## 6. Design

### 6.1 Visual Style

- Minimalist and clean with generous whitespace
- Simple, modern typography (system font stack or a single Google Font)
- Blue-based accent color (e.g., `#3B82F6` / Tailwind `blue-500`) for links, highlights, and interactive elements
- Inspiration references:
  - https://scottlawsonbc.com/posts
  - https://shane.engineer/

### 6.2 Responsiveness

- Fully mobile responsive
- Single-column layout on small screens
- Comfortable reading width capped on large screens (e.g., `max-w-2xl` or `max-w-3xl`)

### 6.3 Dark / Light Mode

- Toggle button in the navigation bar
- Default: follows system preference (`prefers-color-scheme`)
- User selection persisted in `localStorage`
- Implementation: Tailwind `darkMode: 'class'` + a small script in `<head>` to apply the class before first render (avoids flash)

---

## 7. Technical Requirements

### 7.1 Static Generation

- `next.config.js` must set `output: 'export'`
- All pages must be statically renderable at build time (no server-side runtime)
- GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to the `gh-pages` branch on push to `main`

### 7.2 Explicitly Out of Scope

The following features are **not** required and should not be built:

| Feature | Status |
|---|---|
| RSS feed | Out of scope |
| SEO meta tags / sitemap | Out of scope |
| Comments | Out of scope |
| Analytics | Out of scope |
| Search | Out of scope |
| Tags / categories | Out of scope |

---

## 8. Project Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout (nav, theme toggle)
│   ├── page.tsx            # Redirect to /posts
│   ├── posts/
│   │   ├── page.tsx        # Posts overview
│   │   └── [slug]/
│   │       └── page.tsx    # Individual post
│   └── about/
│       └── page.tsx        # About me
├── components/
│   ├── Navbar.tsx
│   ├── ThemeToggle.tsx
│   ├── PostCard.tsx
│   └── PinnedDivider.tsx
├── content/
│   └── posts/              # Markdown files
├── lib/
│   └── posts.ts            # Helpers to read & parse Markdown
├── public/
│   ├── images/
│   └── resume.pdf
├── next.config.js
└── tailwind.config.js
```

---

## 9. Acceptance Criteria

| # | Criterion |
|---|---|
| 1 | Running `next build` produces a fully static export with no errors |
| 2 | The site deploys and loads correctly on GitHub Pages |
| 3 | All posts render with correct content, images, and video embeds |
| 4 | Pinned posts appear above non-pinned posts with visible separation |
| 5 | The About Me page displays profile picture and all four links |
| 6 | Dark mode applies on load when system preference is dark, with no flash |
| 7 | Toggling dark/light mode persists across page reloads |
| 8 | Layout is usable and visually correct on mobile (375px) and desktop (1280px) |
| 9 | Adding a new `.md` file to `/content/posts/` and rebuilding shows the post on the Posts page |

---

*End of document*
