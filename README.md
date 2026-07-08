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
  Logo.jsx          Prism logo mark SVG (size prop)
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
lib/
  site.js           contact email, SITE_URL, BOOKING_URL + demo link helper
  logo.js           logo SVG/data-URI for next/og images
app/
  icon.svg          tab favicon (file convention)
  apple-icon.jsx    180×180 Apple touch icon (next/og)
  opengraph-image.jsx  1200×630 OG/Twitter card (next/og)
  robots.js · sitemap.js
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

## The contact form (Web3Forms)

The contact form in [FinalCTA.jsx](components/FinalCTA.jsx) delivers enquiries to
`prism.ai.organization@gmail.com` via [Web3Forms](https://web3forms.com) — no
backend, no domain setup. It has loading / success / error states, trims + validates
name and email, and includes a hidden honeypot (`botcheck`) for spam.

**Set it up:**

1. Go to [web3forms.com](https://web3forms.com), enter the destination email
   (`prism.ai.organization@gmail.com`), and copy the **access key** (no login).
2. Local dev: copy `.env.example` → `.env.local` and set
   `NEXT_PUBLIC_WEB3FORMS_KEY=your-key`. `.env.local` is gitignored.
3. Production: in **Vercel → Settings → Environment Variables**, add
   `NEXT_PUBLIC_WEB3FORMS_KEY` with the same value, then redeploy.

**Fallback:** if the key is unset, the form shows the client-side success state
without sending — so local dev and CI builds work with no secret.

To swap providers (Formspree, a Next route handler + Resend, etc.), replace the
`fetch` in `handleSubmit`; the states and validation stay the same.

## Booking link

Every "Book a Demo" CTA scrolls to `#contact`. To point them at Calendly (or any
scheduler) later, set `BOOKING_URL` in [lib/site.js](lib/site.js) — one constant,
picked up everywhere.

## SEO & social

- `metadataBase` + canonical are set in [app/layout.jsx](app/layout.jsx).
- Open Graph / Twitter card image is generated at build via
  [app/opengraph-image.jsx](app/opengraph-image.jsx) (`next/og`), reused for both.
- Favicon: [app/icon.svg](app/icon.svg); Apple touch icon:
  [app/apple-icon.jsx](app/apple-icon.jsx) (180×180).
- [app/robots.js](app/robots.js) (allow all) + [app/sitemap.js](app/sitemap.js).

Update `SITE_URL` in [lib/site.js](lib/site.js) once the final domain is live — it
drives `metadataBase`, canonical, sitemap, and robots.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, **Add New → Project** and import the repo.
3. Framework is auto-detected as **Next.js** — no build settings to change.
4. Add the `NEXT_PUBLIC_WEB3FORMS_KEY` environment variable (see above) so the
   contact form delivers email. The site builds and runs without it (form falls
   back to a client-side success state).
5. **Deploy.**
