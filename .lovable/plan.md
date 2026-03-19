

# Personal Website for Pier Luigi Dovesi

## Overview
A single-page, minimal, text-first personal website reflecting both humanitarian AI work (The Good AI Lab) and industry roles. Clean aesthetic inspired by hoanh.space and thegoodailab.org. GAL-forward framing throughout.

## Design System
- **Font**: Inter (Google Font) — clean, modern sans-serif
- **Colors (CSS variables)**: Light mode default (#fafafa bg, #1a1a1a text, #2a9d8f accent teal). Dark mode (#0a0a0a bg, #e0e0e0 text, #4ecdc4 accent). Auto-switches to dark after 22:00 local time with a subtle manual toggle in the footer.
- **Layout**: Single page, vertical scroll, generous whitespace, max-width container (~700px). Minimal top navbar with smooth-scroll anchors.

## Sections (top to bottom)

1. **Header/Hero** — Name, "I go by Pier.", tagline with GAL first, profile photo (uploaded image), horizontal row of subtle social icons (GAL, GitHub, Scholar, LinkedIn, X, HuggingFace, Email)

2. **About** — First-person bio, GAL-forward. Describes the nonprofit mission, MSF partnership, then AMD/Silo AI role, then research areas.

3. **News** — Reverse-chronological bullet list with dates in bold brackets, linked titles. ~18 items spanning 2019–2026.

4. **Timeline** — Vertical timeline with clean left-border design. GAL first and most prominent, then AMD/Silo AI, Univrses/Zenseact, KTH, Bologna/Tongji.

5. **Featured Talks & Podcasts** — 2-column grid on desktop, 1-column mobile. 8 items with event name, title, date, and link.

6. **Projects** — Two featured projects: MSF AI Training Program and the "Self-Driving Wars" essay.

7. **Writing** — Short list of 3 articles with links, plus pointers to GAL blog and Google Scholar.

8. **Community** — Simple list: mentoring, workshop organizing, reviewing, speaking.

9. **soul.md** — Closing section styled like a filename. Four blockquotes with subtle left-border accent: Pirsig, Gramsci (Italian), Calvino (Italian), GAL Manifesto (linked). Extra spacing, reflective tone.

10. **Footer** — "Pier Luigi Dovesi — Stockholm, Sweden" and "0 frameworks were used to make this website." Plus subtle dark mode toggle icon.

## Technical Details
- Built as a React single-page app (project uses React/Vite/Tailwind)
- CSS variables for light/dark theming
- Auto dark mode after 22:00 via `useEffect` + `new Date().getHours()`
- Smooth scroll behavior for nav anchors
- Fully responsive with Tailwind breakpoints
- All external links open in new tabs
- Profile photo copied from uploaded image to project assets
- Semantic HTML structure throughout

