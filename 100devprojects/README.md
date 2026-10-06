# 100 Dev Projects

Source for [100devprojects.in](https://100devprojects.in) — learn web development by building real projects.

**Stack:** Next.js 16 (App Router, fully static) · React 19 · Tailwind CSS v4 · deployed on Vercel.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static build; every route is pre-rendered to HTML
npm run start    # serve the production build
npm run lint
```

Requires Node.js 20.9+.

## Structure

```
src/
  app/                 # Routes, metadata, sitemap.js, robots.js
    project/[slug]/    # generateStaticParams from data/projects.js
    blog/[slug]/       # generateStaticParams from data/blogs/index.js
  views/               # Page UIs (Home/Projects/Blog are client components for filters)
  components/          # Shared UI (JsonLd, CopyButton, Header, ...)
  data/                # projects.js + blogs/* — the single source of content
  lib/site.js          # SITE_URL, buildMetadata(), JSON-LD builders
  lib/summaries.js     # Card-sized data passed to client components
public/demos/          # Standalone HTML/CSS/JS demo apps (served as-is)
```

## Adding content

- **New project:** add an entry to `src/data/projects.js` and its demo under `public/demos/<slug>/`.
- **New blog post:** add a file in `src/data/blogs/` and register it in `src/data/blogs/index.js`.

Pages, canonical URLs, Open Graph tags, JSON-LD and `sitemap.xml` are generated from that data at build time — no manual sitemap edits needed.

## SEO notes

- Canonicals are derived from the route in `src/lib/site.js#buildMetadata`, never hard-coded in HTML.
- Unknown URLs return a real HTTP 404 (`dynamicParams = false` on dynamic routes).
