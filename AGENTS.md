# myWebsite

Next.js 14 (App Router) personal site with static export to GitHub Pages.

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Dev server (basePath: `/`) |
| `npm run build` | Static export → `out/` (production basePath: `/website`) |
| `npm run lint` | ESLint via `next lint` |

No separate typecheck script; `next build` validates types.

`npm run export` runs `next build && next export` — redundant with `output: 'export'` in config but kept for compatibility.

## Architecture

- **`src/app/page.tsx`** — redirects `/` → `/posts`
- **`src/app/posts/page.tsx`** — post list (pinned first, date-sorted within groups)
- **`src/app/posts/[slug]/page.tsx`** — individual post; `generateStaticParams` for export
- **`src/app/about/page.tsx`** — bio page with social links
- **`src/lib/posts.ts`** / **`src/lib/about.ts`** — read Markdown from `content/` via `gray-matter`
- **`src/components/`** — shared components (Navbar, DarkModeToggle, PostCard, MarkdownRenderer)

## Content

- Posts: `content/posts/*.md` — frontmatter: `title`, `date` (ISO), `description`, `thumbnail`, `pinned` (bool)
- About: `content/about/bio.md` — frontmatter: `name`, `profilePicture`, `github`, `linkedin`, `email`, `cv`
- CV file: `public/cv/resume.pdf`
- Profile images and post thumbnails: `public/imgs/` (unoptimized — `images.unoptimized: true`)
- Use `#` placeholder for social links to hide them

## Conventions

- **Path alias** `@/*` → `./src/*`
- **Theming**: CSS custom properties `--color-bg`, `--color-fg`, `--color-muted`, `--color-border` in `globals.css`. Dark mode via `.dark` class + `localStorage`.
- **No `@tailwindcss/typography`** — custom `.prose-custom` classes in `globals.css`
- **`scrollbar-gutter: stable`** on `<html>` in `globals.css` prevents content from shifting when scrollbar appears/disappears between pages
- **`suppressHydrationWarning`** on `<html>` required (dark mode client-side hydration)
- Links open in new tab (`target="_blank" rel="noopener noreferrer"`)
- `'use client'` only on Navbar and DarkModeToggle (interactivity/hooks)

## CI / Deploy

- `.github/workflows/deploy.yml` — runs on push to `main`; Node 22; `npm install` (not `npm ci`); uploads `out/` to GitHub Pages
- `pnpm-lock.yaml` exists but CI uses npm
