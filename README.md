# Emma GaNun — Strategy Portfolio

Minimal static portfolio for growth and marketing strategy work: account management, ad strategy, AI enablement, UX ideation, and full-funnel systems.

## Stack
- Plain HTML, CSS, and JavaScript
- Netlify-ready, no build step

## Pages
- Home (`/`)
- Work (`/work/`)
- Case study template (`/work/case-study.html?slug=...`)
- Approach (`/approach/`)
- About (`/about/`)
- Contact (`/contact/`) with a Netlify form

Former `/paid-social/` and `/content-copy/` routes redirect to `/approach/`.

## Case studies
All case studies live in `data/case-studies.json`.

## Local preview

```bash
python -m http.server 4173
```

Then open `http://localhost:4173`.
