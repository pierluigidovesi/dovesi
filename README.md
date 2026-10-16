# dovesi.dev

The personal site of **Pier Luigi Dovesi** — Robotics Lead at AMD Silo AI, Co-Founder & Chair of The Good AI Lab. Live at [dovesi.dev](https://dovesi.dev).

A single-page site: bio, selected research, talks, news, career timeline, and writing. No CMS, no backend — everything is driven from one typed data file and rendered as static HTML at build time.

## Philosophy

- **One page, no chrome.** Everything lives on a single scrollable column with a fixed max width. Content over navigation.
- **Editorial, not "app."** It reads like a printed page — serif body type, generous line height, restrained accents — rather than a dashboard.
- **Content is data.** Every talk, news item, and timeline entry is a plain object in [`src/data.ts`](src/data.ts). Adding an item is a one-line edit; sorting, rendering, the SEO pre-render, and the `llms.txt` all derive from it automatically.
- **Legible to machines, too.** The site ships real HTML for crawlers and a structured `llms.txt` for language models — without any runtime service to maintain.

## Design choices

- **Typography.** [Lora](https://fonts.google.com/specimen/Lora) for body (a bookish serif), [Bowlby One](https://fonts.google.com/specimen/Bowlby+One) for the CV4GOOD display chip, Press Start 2P and Space Grotesk for the AI for Peace chip, and JetBrains Mono for the `soul.md` easter-egg. Used weights and character subsets are self-hosted as WOFF2 in `public/fonts/`, with their original SIL Open Font Licenses. The body font is preloaded.
- **Palette.** Warm parchment and terracotta in light mode, near-black with a clay accent in dark mode. All colors are HSL CSS variables defined in [`src/index.css`](src/index.css) and consumed through Tailwind.
- **Time-aware theme.** The first-paint script in [`index.html`](index.html) honors an explicit saved choice, otherwise choosing light during the day and dark at night. Only pressing the navigation's theme button saves an override; blocked storage still permits toggling within the page.
- **Local visual assets.** The portrait uses 160/320/480-pixel WebP variants with responsive selection and preload. The original JPEG remains available for profile metadata. AI for Peace masks are optimized local copies of the workshop's existing wordmark and shadow artwork, sourced from its [website](https://aiforpeaceworkshop.github.io/).
- **Hough-line background.** The linework behind the content moves gently with scrolling — a nod to the computer-vision work — in [`src/components/HoughBackground.tsx`](src/components/HoughBackground.tsx). A worker draws the curves off the scrolling thread where supported, with a main-thread fallback and reduced-motion support.
- **Gold-leaf text selection.** Selecting text produces a warm amber glow rather than a flat highlight (`::selection` in [`src/index.css`](src/index.css)), tying back to the CV4GOOD accent.
- **CV4GOOD chip.** A hand-styled call-out for the ECCV 2026 workshop, ported from the GAL site, with a hover tilt that respects `prefers-reduced-motion`.
- **AI for Peace chip.** A compact companion call-out for the NeurIPS 2026 workshop, adapting its pixel wordmark, coral signal color, technical labels, dot grid, and hard-shadow interaction.

## Tech

- **Vite 5 + React 18 + TypeScript**, styled with **Tailwind CSS**. That's the whole stack — no UI kit, no state library, no backend.
- **Single source of truth.** [`src/data.ts`](src/data.ts) exports the bio, links, research, talks, news, timeline, and writing. A `sortByDate` helper keeps time-ordered sections sorted from the `date` field, so entries can be added in any order.
- **News archive.** The ten most recent updates are visible initially. A native disclosure keeps the full history available without JavaScript. Direct links to older entries open the archive after hydration, printing includes every entry, and RSS always contains the full history. The News section links to the feed for subscribing.
- **Build-time generation.** A small Vite plugin in [`vite.config.ts`](vite.config.ts) derives files from the same `data.ts`:
  - writes `public/llms.txt` — a structured Markdown summary for language models;
  - writes `public/rss.xml` — a discoverable feed of News items;
  - renders the real page component through [`src/prerender.tsx`](src/prerender.tsx) and injects it into `<div id="root">`, so crawlers and no-JS clients see the same layout. React hydrates that markup rather than replacing it. The dark-only section is controlled by CSS in both versions.
- **SEO.** Per-page `<title>`/meta via `react-helmet-async`, Open Graph + Twitter cards, a `ProfilePage`/`Person` JSON-LD block, `sitemap.xml`, and `robots.txt`. The sitemap omits the optional `lastmod` field rather than claiming a stale or build-only modification date.
- **Routing.** `react-router-dom` with a single home route plus a `noindex` 404 page.

## Project structure

```
src/
  data.ts                  # single source of truth for all content
  pages/
    Index.tsx              # the whole site
    NotFound.tsx           # 404
  components/
    HoughBackground.tsx    # Hough-transform backdrop
  index.css                # theme tokens, fonts, ::selection, base styles
index.html                 # meta, JSON-LD, font loading, time-aware theme
vite.config.ts             # build plugin: llms.txt + HTML pre-render
public/                    # favicons, photo, og-image, sitemap, robots, llms.txt
```

## Scripts

- `npm run dev` — start the local dev server (port 8090).
- `npm run build` — production build to `dist/` (also generates `llms.txt`, `rss.xml`, and the pre-rendered HTML).
- `npm run preview` — serve the production build locally.
- `npm run lint` — run ESLint.
- `npm test` — run the Vitest suite.

## Editing content

Almost every update is a one-line change in [`src/data.ts`](src/data.ts) — add an object to `talks`, `news`, `writing`, etc. Dates use the `"Mon YYYY"` format (e.g. `"Sep 2026"`) and sort automatically. News items also need a permanent, unique `id` for feed and direct links. The `llms.txt`, RSS feed, and SEO pre-render update themselves on the next build.
