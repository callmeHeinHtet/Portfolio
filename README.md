# Portfolio Website

Personal portfolio for Hein Htet Soe — full-stack developer based in Bangkok. Showcases selected projects with a typography-led editorial design.

Live: <https://callmeheinhtet.github.io/Portfolio>

## Features

- Editorial design with bold display type and an off-white / ink / flame palette
- GSAP scroll-triggered animations on hero, project cards, and section reveals
- Lenis-powered inertial smooth scrolling
- Per-project showcase cards with adaptive frame (phone-aspect for mobile apps, desktop-aspect for web)
- Responsive layout from 320px through ultrawide
- EmailJS-powered contact form (no backend)
- Static export to GitHub Pages

## Tech Stack

- **Framework:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS 3
- **Animation:** GSAP + ScrollTrigger, Framer Motion (Navbar), Lenis (smooth scroll), `split-type`
- **Forms:** EmailJS (`@emailjs/browser`)
- **Icons:** react-icons
- **Deploy:** GitHub Pages via `gh-pages`
- **Image tooling:** Sharp (build-time WebP optimization)

## Getting Started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Project Structure

```
src/
├── app/          # Next.js App Router (page.tsx, layout.tsx, globals.css)
├── components/   # About, Contact, Image, Navbar, ProjectShowcase, SmoothScroll, Timeline
├── data/         # projects.ts — single source of truth for project entries
├── hooks/        # custom React hooks
├── types/        # shared TypeScript types
└── utils/        # constants (BASE_PATH, ASSET_PREFIX) and helpers
public/
├── images/       # WebP-optimized project + profile screenshots
└── ...
scripts/
└── optimize-images.mjs   # one-shot PNG/JPG → WebP resizer (uses Sharp)
```

## Adding a project

1. Drop the screenshot into `public/images/` (PNG or JPG is fine — the optimizer handles it).
2. Run `node scripts/optimize-images.mjs` to convert it to WebP at the right dimensions.
3. Add a new entry to `src/data/projects.ts` (see existing entries — `aspect: 'desktop'` for web, omit for mobile).
4. Delete the original PNG/JPG once the WebP is in place.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build (static export to `out/`)
- `npm run lint` — ESLint
- `npm run deploy` — publish `out/` to the `gh-pages` branch
