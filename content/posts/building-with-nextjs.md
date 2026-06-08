---
title: "Building with Next.js and Tailwind"
date: "2026-06-01"
description: "A look at how this site was built using Next.js App Router and Tailwind CSS."
thumbnail: ""
pinned: false
---

This site is built with [Next.js](https://nextjs.org) using the App Router and [Tailwind CSS](https://tailwindcss.com) for styling. Here's a quick overview of the setup.

## Project Structure

The app uses a clean, minimal structure:

```
src/
├── app/          # Next.js App Router pages
├── components/   # Reusable UI components
└── lib/          # Utility functions
content/posts/    # Markdown blog posts
```

## Static Generation

The site generates static HTML for deployment to GitHub Pages. Every post is written in Markdown and parsed at build time using `gray-matter` and `react-markdown`.

## Dark Mode

Dark mode follows the system preference by default and can be toggled manually. The choice is persisted in `localStorage`.

## Design

The design is inspired by minimalist, content-focused layouts. Clean typography, generous whitespace, and a blue accent color scheme tie it all together.
