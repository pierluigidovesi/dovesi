# Plan: Site refinement pass

Four small, high-value improvements to dovesi.dev. No visual changes to the reading experience itself — the literary, text-first design stays exactly as is.

## 1. Print stylesheet
Academic sites get printed and saved as PDF. Add a `@media print` block in `src/index.css` that:
- Hides the decorative background, vignette, nav, theme toggle, and workshop chips.
- Forces light-mode colors (cream text on dark would print poorly), black text on white.
- Appends link URLs in parentheses after links so printed copies keep references.
- Avoids page breaks inside timeline items, news rows, and talk tiles.

## 2. Keyboard focus styling
Tab-focus rings currently use the browser default (blue, off-palette). Add a `:focus-visible` style in `src/index.css` using the terracotta `--primary` tone with a soft offset, matching the custom text-selection highlight already in place. Improves accessibility without changing anything for mouse users.

## 3. Anchor links on section headings
Make each section heading (Talks & Podcasts, News, Timeline, Writing) a subtle `#` anchor so visitors can copy a direct link to a section. The marker appears only on hover/focus, in muted terracotta — invisible in normal reading.

## 4. RSS feed for News
Add a build-time generated `public/rss.xml` (same pattern as the existing `llms.txt` generator in `vite.config.ts`): a small `generateRssXml()` function in `src/data.ts` turns the `news` array into a valid RSS 2.0 feed, written before each build so it never drifts from the site content. Add a `<link rel="alternate" type="application/rss+xml">` tag in `index.html` so feed readers discover it automatically. No visible UI change.

## Out of scope (deliberately)
- Open Graph image — `public/og-image.jpg` already exists and is referenced in `index.html`.
- No new sections, animations, or layout changes.

## Technical details
- Files touched: `src/index.css` (print + focus styles), `src/pages/Index.tsx` (heading anchors), `src/data.ts` (`generateRssXml()`), `vite.config.ts` (write `rss.xml` in `buildStart`), `index.html` (RSS link tag).
- Verified with a production build and a quick browser check of focus rings and print preview.
