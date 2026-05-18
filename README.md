# Urordle

A daily urology diagnosis puzzle, inspired by Wordle and Doctordle. Read the clinical case, name the diagnosis in as few guesses as possible — each wrong guess reveals another clue.

Built as a **static, mobile-first PWA**. No build step, no backend, no dependencies. Drop it on any static host.

---

## Run locally

```sh
# Any static server works. The shortest path:
npx serve -l 5173 .
# Then open http://localhost:5173
```

Or, with Python:
```sh
python3 -m http.server 5173
```

> Note: the service worker only registers over HTTPS or `localhost`. PWA install flow works locally on `localhost`.

---

## Project layout

```
.
├── index.html          # App shell + meta tags + PWA links
├── styles.css          # Mobile-first dark theme
├── app.js              # Game logic, autocomplete, fuzzy matching, share, stats
├── data/cases.js       # Case library (edit/add cases here)
├── manifest.json       # PWA manifest
├── service-worker.js   # Offline cache (network-first HTML, cache-first assets)
├── icons/              # SVG source + generated PNGs (192, 512, 512-maskable)
├── vercel.json         # Vercel headers
├── netlify.toml        # Netlify headers
├── robots.txt / sitemap.xml
└── package.json        # Convenience scripts only
```

## Deploy

This is a static site. Pick whichever host you like — all work without configuration:

### Vercel (recommended)
1. Install CLI: `npm i -g vercel`
2. From this directory: `vercel --prod`
3. Or push to GitHub and import at [vercel.com/new](https://vercel.com/new).

### Netlify
1. `netlify deploy --prod --dir .`
2. Or drag-and-drop this folder onto [app.netlify.com/drop](https://app.netlify.com/drop).

### Cloudflare Pages
- `wrangler pages deploy .` or connect a GitHub repo at [pages.cloudflare.com](https://pages.cloudflare.com).

### GitHub Pages
- Push to a repo, enable Pages → branch `main`, folder `/`.
- Note: GitHub Pages serves under a subpath unless you use a custom domain — set the custom domain to `urordle.com` to make absolute paths in `index.html` resolve correctly.

### Any other host
Upload the directory to S3 + CloudFront, Surge, Render, Fly Static, or a $5 VPS with nginx. There is no build step.

## Custom domain
After deploying, point your domain's `A`/`CNAME` records at the host (each host has docs). Set the site's canonical domain in:
- `manifest.json` (if needed)
- `sitemap.xml`
- `robots.txt`
- Open Graph meta in `index.html` (`og:image` URL — currently set to `/icons/og-image.png`, which works once you have an absolute host).

## Adding or editing cases

Edit `data/cases.js`. Each case is a plain object:

```js
{
  id: 41,
  dx: "Canonical diagnosis name",
  aliases: ["canonical diagnosis name", "abbrev", "alternate phrasing"],  // lowercase
  clues: [
    "Clue 1 — the opening line (always shown).",
    "Clue 2 — revealed after the 1st wrong guess or skip.",
    "...",
    "Clue 6 — last clue."
  ],
  teaching: "Short post-solve explainer with key teaching points.",
  category: "Oncology"  // free-form tag shown in the case header
}
```

### Image clues

A clue can be a plain string (default) **or** an object with an image:

```js
clues: [
  "Plain text clue.",
  {
    text: "Optional text above the image.",
    image: "/images/cases/foo.svg",
    alt: "Required descriptive alt text for screen readers.",
    caption: "Optional small caption rendered under the image."
  }
]
```

Images live in `images/cases/`. SVG is preferred (sharp at any size, tiny file).

**Sourcing images legally:**
- **Best**: original schematics or diagrams you author (see `images/cases/vur-grades.svg` as an example). Fully owned, no license concerns.
- **Good**: [Radiopaedia](https://radiopaedia.org) — CC-BY-NC-SA. Include attribution in the `caption` field, e.g. `"Image: Case courtesy of Dr. X via Radiopaedia, CC BY-NC-SA"`. Note that NC = non-commercial: if you eventually run ads, Radiopaedia images are not allowed.
- **Good**: Wikimedia Commons — verify per-image license. Many are CC-BY or public domain.
- **Avoid**: copy-pasting from textbooks, journals, or hospital teaching files — copyrighted unless you have written permission.

For a polished long-term solution, partner with a urology resident or attending to contribute original teaching cases with their own (de-identified, consented) images.

The matcher is forgiving:
- Exact alias match wins.
- Token overlap (e.g., "renal cell" → "renal cell carcinoma") matches.
- Damerau–Levenshtein within ~15% length matches as `correct`.
- One step further than that is shown as `close` (still counts as a miss).

## Disclaimers

This is an educational and entertainment app, **not** clinical decision support. Diagnoses, workups, and treatments shown are simplified for the puzzle format.

## License

MIT.
