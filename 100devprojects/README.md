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

## Environment variables

Copy `.env.example` to `.env.local` (git-ignored) for local development; set the same variables in Vercel → Project Settings → Environment Variables.

| Variable | Used by | Purpose |
|---|---|---|
| `AFFILIATE_HOSTINGER_URL` | `src/data/affiliates.js` → `/go/hostinger` | Hostinger affiliate link. Falls back to `https://www.hostinger.com/` when unset. |

## Affiliate links

- Partners are allowlisted in `src/data/affiliates.js`. `/go/<partner>?sub=<post-id>` 307-redirects to the partner's URL; unknown partners return 404 and `/go/` is disallowed in `robots.txt`.
- On a blog entry, `affiliate: { partner: 'hostinger', sub: 'wp-setup' }` adds the disclosure under the header and a `RecommendedPlan` box before the share section. Optional `title`, `points` and `ctaLabel` customise the box.
- Inside blog markdown, a line `:::cta hostinger wp-setup` renders a compact inline CTA.

## SEO notes

- Canonicals are derived from the route in `src/lib/site.js#buildMetadata`, never hard-coded in HTML.
- Unknown URLs return a real HTTP 404 (`dynamicParams = false` on dynamic routes).
