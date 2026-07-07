# Prism — Marketing Website

A single-page marketing site for **Prism**, an AI agency that builds AI solutions
(voice agents, automation, insights) for **real estate & construction** teams.
Light, minimal, premium, and smooth.

## Stack

- **Next.js 14** (App Router, `14.2.35`) · React 18 · JavaScript (`.jsx`)
- **Tailwind CSS** for styling
- **Framer Motion** for tasteful motion
- **lucide-react** for icons
- **Self-hosted fonts** via `@fontsource` (Poppins + Inter) — no `next/font/google`,
  so the build never depends on reaching Google's servers.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production build:

```bash
npm run build    # / is statically prerendered
npm run start    # serve the production build
```

## Project structure

```
app/
  layout.jsx        fontsource imports + metadata + <html>/<body>
  globals.css       tailwind directives, tokens, utilities, reduced-motion
  page.jsx          composes sections in order
components/
  PrismMark.jsx     logo SVG (size prop)
  PrismSignature.jsx  ambient prism-refraction hero graphic
  Reveal.jsx        motion fade-up wrapper (whileInView, once)
  Navbar.jsx        sticky nav, blur-on-scroll, mobile menu
  Hero.jsx          staggered load + prism signature
  Vision.jsx        positioning statement
  Features.jsx      3 cards, hover lift + spectrum top-border
  Highlights.jsx    4-up supporting points
  Comparison.jsx    old-way vs Prism + mid CTA
  FinalCTA.jsx      contact form with client-side success state
  Footer.jsx        brand + link columns
```

Page order: **Navbar → Hero → Vision → Features → Highlights → Comparison →
FinalCTA → Footer**.

## Design system

- **Colors** — Ink `#0C1524`, White `#FFFFFF`, Mist `#F6F8FC`, Muted `#5B6472`,
  Line `#E7EAF0`; spectrum accents violet `#7C3AED`, blue `#2563EB`, cyan
  `#06B6D4`, amber `#F59E0B`.
- **Type** — Poppins (display, `font-display`) + Inter (body/UI, `font-sans`).
- **Signature** — a prism refraction (white beam → 4-color spectrum) used as the
  logo mark and a soft ambient hero graphic. A single `gradient-text` utility
  highlights one key phrase per major heading.

## Accessibility & motion

- Responsive down to 360px; keyboard-accessible with a visible focus ring.
- `prefers-reduced-motion` is respected — all transforms/animation and smooth
  scrolling are disabled.
- Animation is transform/opacity only, with `viewport={{ once: true }}` to avoid
  layout thrash.

## The contact form

`FinalCTA.jsx` handles submit client-side (`preventDefault` → success state). To
deliver enquiries for real, wire the `handleSubmit` `// TODO` to Formspree,
Resend, or a Next.js route handler.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, **Add New → Project** and import the repo.
3. Framework is auto-detected as **Next.js** — no build settings to change.
4. **Deploy.** No environment variables are required.
