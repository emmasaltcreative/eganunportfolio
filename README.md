# Social Media Manager Portfolio (Static HTML/CSS/JS)

Professional, performance-first portfolio website for a Social Media Manager. The project is fully static and Netlify-ready.

## Stack
- Plain HTML/CSS/JS (no framework, no database)
- Minimal dependencies (none required)

## Pages
1. Home (`/`)
2. Work index (`/work/`)
3. Reusable case study template (`/work/case-study.html?slug=...`)
4. Paid Social (`/paid-social/`)
5. Content & Copy (`/content-copy/`)
6. About (`/about/`)
7. Contact (`/contact/`) with Netlify form

## Case Study Data Source
All case studies are maintained in one place:

- `data/case-studies.json`

To add a new case study:
1. Add a new object in `data/case-studies.json`
2. Upload images using this structure:
   - `/images/case-studies/{slug}/header.webp`
   - `/images/case-studies/{slug}/mockup-01.webp`
   - `/images/case-studies/{slug}/mockup-02.webp`

## Assets
Place Canva exported PNG/WebP files under:
- `images/case-studies/{slug}/`

Sample slugs included:
- `eco-bloom-skincare`
- `petglow-dtc`
- `nomadfit-app`

## Binary-file-safe setup
To avoid tooling errors like **"binary files are not supported"**, this repo does not commit real image binaries.

- Keep your source-of-truth paths in `data/case-studies.json`
- Upload your real `.webp` files into `images/` before deployment
- Replace `files/resume.pdf` placeholder text with your actual PDF file

See `images/README.md` for the exact required filenames.

## SEO Included
- Per-page `<title>` and meta description
- OpenGraph tags
- JSON-LD schema (`ProfessionalService` + `Person`)
- `sitemap.xml`
- `robots.txt`

## Performance & Accessibility
- Responsive layout
- Semantic structure
- WebP placeholder image paths
- Lazy loading on case study cards and supporting mockups
- Minimal JS for content rendering only

## Netlify Deployment
This repo includes `netlify.toml`.

### Netlify settings
- **Build command:** `echo 'Static site - no build step required'`
- **Publish directory:** `.`

You can also leave the build command empty in the Netlify UI and keep publish dir as `.`.

## Local Preview
You can run any static server, for example:

```bash
python -m http.server 4173
```

Then open `http://localhost:4173`.
