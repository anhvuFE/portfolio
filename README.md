# Portfolio — Vũ Xuân Anh

Personal portfolio site. Bento-grid landing page with a drawer-based deep-dive
for each section (about, skills, experience, certificates, services, contact).

Live: https://anhvuFE.github.io/portfolio

## Stack

- React 19 + TypeScript
- MUI v7 (Material UI) for components and theming
- `react-github-calendar` for the GitHub contributions card
- `@emailjs/browser` for the contact form
- Create React App build pipeline
- `sharp` (dev) for image optimization scripts

## Layout

- `Home` — hero with avatar, typewriter role, stats
- `BentoGrid` — 7 cards, each opens a `SectionDrawer` lazy-loading the section
- `Footer` — terminal-style window
- Background effects: constellation canvas, cursor glow, footer particle rain
  (all pause when off-screen or when the tab is hidden)

## Local development

```bash
cp .env.example .env  # then fill in EmailJS keys
npm install
npm run dev           # http://localhost:3000
```

`npm run dev` is an alias for `react-scripts start`.

## Environment variables

The contact form uses [EmailJS](https://www.emailjs.com/). Copy `.env.example`
to `.env` and provide:

```
REACT_APP_EMAILJS_SERVICE_ID
REACT_APP_EMAILJS_TEMPLATE_ID
REACT_APP_EMAILJS_PUBLIC_KEY
```

EmailJS public key is safe to expose client-side, but env vars make rotation
easier.

## Build & deploy

```bash
npm run build         # production build into ./build
npm run deploy        # gh-pages -d build (uses homepage in package.json)
```

GitHub Pages is configured via `homepage` in `package.json`. The `deploy`
script publishes the `build/` folder to the `gh-pages` branch.

### Prebuild hook

`npm run build` runs `scripts/fetch-github-activity.js` first. The script
calls the public GitHub events API for the user, maps the response into
the shape the UI expects, and writes
`src/components/github/recent-activity.json`. If the request fails (rate
limit, network), the existing JSON is kept so the build never breaks.

Set `GITHUB_TOKEN` (or `GH_TOKEN`) in your environment to authenticate
the request and avoid the unauthenticated 60-req/hr limit.

## Image pipeline

`scripts/optimize-images.js` regenerates JPG + WebP variants from the source
files in `src/assets/`. Run it after replacing any photo:

```bash
node scripts/optimize-images.js
```

`scripts/generate-favicon.js` regenerates the favicon set in `public/` from
`src/assets/avatar.jpg`.

`scripts/fetch-github-activity.js` runs as a prebuild hook (see above). You
can run it on demand to refresh local data without doing a full build.

## Project structure

```
src/
  App.tsx                      # ThemeProvider + layout
  components/
    home/                      # Hero
    bento/                     # Bento grid + drawer + previews
    about/, skills/, services/, certificate/, qualification/, contact/
    github/                    # Lazy-loaded calendar section
    header/, footer/           # Chrome
    effects/                   # ScrollReveal, CursorGlow
    sakura/                    # Footer canvas particles
public/
  index.html, manifest.json, robots.txt, sitemap.xml
  favicon-*.png, apple-touch-icon.png
scripts/
  optimize-images.js, generate-favicon.js
```
