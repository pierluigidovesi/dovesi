# dovesi.dev

The personal site of **Pier Luigi Dovesi** — Robotics Lead at AMD Silo AI, Co-Founder & Chair of The Good AI Lab. Live at [dovesi.dev](https://dovesi.dev).

A single-page site: bio, talks, news, career timeline, and writing. No CMS, no backend — everything is driven from one typed data file and rendered as static HTML at build time.

## Philosophy

- **One page, no chrome.** Everything lives on a single scrollable column with a fixed max width. Content over navigation.
- **Editorial, not "app."** It reads like a printed page — serif body type, generous line height, restrained accents — rather than a dashboard.
- **Content is data.** Every talk, news item, and timeline entry is a plain object in [`src/data.ts`](src/data.ts). Adding an item is a one-line edit; sorting, rendering, the SEO pre-render, and the `llms.txt` all derive from it automatically.
- **Legible to machines, too.** The site ships real HTML for crawlers and a structured `llms.txt` for language models — without any runtime service to maintain.

## Design choices

- **Typography.** [Lora](https://fonts.google.com/specimen/Lora) for body (a bookish serif), [Bowlby One](https://fonts.google.com/specimen/Bowlby+One) for the CV4GOOD display chip, Press Start 2P and Space Grotesk for the AI for Peace chip, and JetBrains Mono for the `soul.md` easter-egg. Fonts are loaded via `<link>` + `preconnect` in [`index.html`](index.html) so the preload scanner finds them immediately.
- **Palette.** Warm parchment and terracotta in light mode, near-black with a clay accent in dark mode. All colors are HSL CSS variables defined in [`src/index.css`](src/index.css) and consumed through Tailwind.
- **Time-aware theme.** The site defaults to light during the day and dark at night (see the inline script in [`index.html`](index.html)); a manual toggle persists the choice to `localStorage`.
- **Hough-line background.** The faint linework behind the content is a live Hough-transform render — a nod to the computer-vision work — in [`src/components/HoughBackground.tsx`](src/components/HoughBackground.tsx), faded into the page with a radial mask.
- **Gold-leaf text selection.** Selecting text produces a warm amber glow rather than a flat highlight (`::selection` in [`src/index.css`](src/index.css)), tying back to the CV4GOOD accent.
- **CV4GOOD chip.** A hand-styled call-out for the ECCV 2026 workshop, ported from the GAL site, with a hover tilt that respects `prefers-reduced-motion`.
- **AI for Peace chip.** A compact companion call-out for the NeurIPS 2026 workshop, adapting its pixel wordmark, coral signal color, technical labels, dot grid, and hard-shadow interaction.

## Tech

- **Vite 5 + React 18 + TypeScript**, styled with **Tailwind CSS**. That's the whole stack — no UI kit, no state library, no backend.
- **Single source of truth.** [`src/data.ts`](src/data.ts) exports the bio, links, talks, news, timeline, writing, and publications. A `sortByDate` helper keeps time-ordered sections sorted from the `date` field, so entries can be added in any order.
- **Build-time generation.** A small Vite plugin in [`vite.config.ts`](vite.config.ts) runs on `writeBundle` and, from the same `data.ts`:
  - writes `public/llms.txt` — a structured Markdown summary for language models;
  - injects a fully pre-rendered HTML snapshot into `<div id="root">`, so crawlers and no-JS clients see real content. React's `createRoot` replaces it on hydration.
- **SEO.** Per-page `<title>`/meta via `react-helmet-async`, Open Graph + Twitter cards, a `ProfilePage`/`Person` JSON-LD block, `sitemap.xml`, and `robots.txt`.
- **Routing.** `react-router-dom` with a single home route plus a `noindex` 404 page.

## Project structure

```
src/
  data.ts                  # single source of truth for all content
  pages/
    Index.tsx              # the whole site
    NotFound.tsx           # 404
  components/
    HoughBackground.tsx    # animated Hough-transform backdrop
  index.css                # theme tokens, fonts, ::selection, base styles
index.html                 # meta, JSON-LD, font loading, time-aware theme
vite.config.ts             # build plugin: llms.txt + HTML pre-render
public/                    # favicons, photo, og-image, sitemap, robots, llms.txt
```

## Scripts

- `npm run dev` — start the local dev server (port 8090).
- `npm run build` — production build to `dist/` (also generates `llms.txt` and the pre-rendered HTML).
- `npm run preview` — serve the production build locally.
- `npm run lint` — run ESLint.
- `npm test` — run the Vitest suite.

## Editing content

Almost every update is a one-line change in [`src/data.ts`](src/data.ts) — add an object to `talks`, `news`, `writing`, etc. Dates use the `"Mon YYYY"` format (e.g. `"Sep 2026"`) and sort automatically. The `llms.txt` and the SEO pre-render update themselves on the next build.
