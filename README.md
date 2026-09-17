# Dhiraj Chapagain — Portfolio

A statically generated portfolio and essay site built with Next.js, React, TypeScript, and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

The production checks are:

```bash
npm run typecheck
npm run lint
npm run build
```

## Publishing an essay

Create `content/essays/<slug>/index.md` with YAML front matter:

```md
---
title: "Essay title"
date: 2026-09-17T00:00:00.000Z
summary: "A short description."
cover: "images/cover.jpg"
draft: false
---

Essay content goes here.
```

Put article images in `public/essays/<slug>/images/` and reference them from Markdown as `images/cover.jpg`. Essays marked `draft: true` are not published or included in the sitemap and RSS feed.
