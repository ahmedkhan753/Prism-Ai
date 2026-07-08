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
  api/contact/route.js  Nodemailer/Gmail SMTP contact endpoint (serverless)
  icon.svg          tab favicon (file convention)
  apple-icon.png · opengraph-image.png   generated brand images (static)
  robots.js · sitemap.js
components/
  Logo.jsx          Prism logo mark SVG (size prop)
  PrismSignature.jsx  animated hero prism (rays draw up + shimmer + float)
  Reveal.jsx        motion fade-up wrapper (whileInView, once)
  Navbar.jsx        sticky nav, blur-on-scroll, mobile menu
  Hero.jsx          staggered load + prism signature
  Stats.jsx         three animated count-ups
  Vision.jsx        positioning statement
  Solutions.jsx     three solution pillars
  Services.jsx      bento grid of 8 services
  Packages.jsx      three tiers + flagship band
  HowItWorks.jsx    3 steps with animated connectors
  Comparison.jsx    old-way vs Prism + mid CTA
  Team.jsx          founder cards (data from lib/site.js TEAM)
  FinalCTA.jsx      contact form (POSTs /api/contact)
  Footer.jsx        brand + Product/Social columns
lib/
  site.js           email, SITE_URL, BOOKING_URL, SOCIAL_LINKS, TEAM + helpers
```

Page order: **Navbar → Hero → Stats → Vision → Solutions → Services → Packages →
How it works → Comparison → Team → FinalCTA → Footer**.

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

## The contact form (self-owned Gmail SMTP)

The form in [FinalCTA.jsx](components/FinalCTA.jsx) POSTs (same-origin, no CORS) to
[app/api/contact/route.js](app/api/contact/route.js), a Node serverless route that
emails the enquiry to your Gmail via **Nodemailer over Gmail SMTP** — no third-party
form vendor. It has loading / success / error states, trims + validates name and
email, and includes a hidden honeypot (`botcheck`) for spam.

**Set it up (Gmail App Password):**

1. On the Gmail account (`prism.ai.organization@gmail.com`), enable **2-Step
   Verification**, then go to **Google Account → Security → 2-Step Verification →
   App passwords** and generate a 16-character app password.
2. Local dev: copy `.env.example` → `.env.local` and set:
   ```
   GMAIL_USER=prism.ai.organization@gmail.com
   GMAIL_APP_PASSWORD=your16charapppassword
   ```
   `.env.local` is gitignored — the password never enters git.
3. Production: in **Vercel → Settings → Environment Variables**, add `GMAIL_USER`
   and `GMAIL_APP_PASSWORD`, then redeploy.

**Dev fallback:** if either variable is missing, the route logs the payload and
returns `ok:true` (no email sent) — so local builds and CI pass without credentials.

## Booking link

Every "Book a Demo" CTA scrolls to `#contact`. To point them at Calendly (or any
scheduler) later, set `BOOKING_URL` in [lib/site.js](lib/site.js) — one constant,
picked up everywhere.

## SEO & social

- `metadataBase` + canonical are set in [app/layout.jsx](app/layout.jsx).
- Open Graph / Twitter card image: [app/opengraph-image.png](app/opengraph-image.png)
  (1200×630, static), reused for both.
- Favicon: [app/icon.svg](app/icon.svg); Apple touch icon:
  [app/apple-icon.png](app/apple-icon.png) (180×180).
- [app/robots.js](app/robots.js) (allow all) + [app/sitemap.js](app/sitemap.js).

Update `SITE_URL` in [lib/site.js](lib/site.js) once the final domain is live — it
drives `metadataBase`, canonical, sitemap, and robots.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, **Add New → Project** and import the repo.
3. Framework is auto-detected as **Next.js** — no build settings to change.
4. Add the `GMAIL_USER` and `GMAIL_APP_PASSWORD` environment variables (see above)
   so the contact form delivers email. The site builds and runs without them (the
   route uses a dev fallback that sends nothing).
5. **Deploy.**

## Deploy with Docker (self-hosted server)

The app builds to a Next.js **standalone** server and ships as a small (~230 MB)
production image. Email creds are passed **at runtime**, never baked into the image.

**Quickest — docker compose:**

```bash
cp .env.docker.example .env          # then fill GMAIL_APP_PASSWORD (.env is gitignored)
docker compose up -d --build         # builds the image and starts the container
# → http://localhost:3000
```

**Or plain Docker:**

```bash
docker build -t prism-web:latest .
docker run -d --name prism-web -p 3000:3000 \
  -e GMAIL_USER=prismaiorganization@gmail.com \
  -e GMAIL_APP_PASSWORD=your16charapppassword \
  prism-web:latest
```

Notes:
- The container listens on **port 3000** (`PORT`/`HOSTNAME` are preset). Put Nginx/
  Caddy or your load balancer in front for TLS on a public server.
- Without the `GMAIL_*` vars the site still runs; the contact route uses its dev
  fallback (returns `ok:true`, sends nothing).
- A `HEALTHCHECK` pings `/` so orchestrators can see readiness.
- Update the image after code changes: `docker compose up -d --build` (or rebuild
  and re-run).

## Team

Founder cards render from the `TEAM` array in [lib/site.js](lib/site.js). Drop real
photos into `/public/team/` and set each member's `name`, `role`, `bio`, `photo`
(e.g. `/team/founder-1.jpg`), and `linkedin`. Until then, neutral initial-based
placeholder avatars are shown.
