# Security Projects UK — Website

Static marketing website for Security Projects UK Limited (securityprojectsltd.co.uk).

## Stack

Plain HTML + CSS + vanilla JS. No build step. Ships as static files.

## Local preview

Any static server works. From the project root:

```bash
python -m http.server 8765
# then open http://localhost:8765
```

## Deploy to Vercel

1. Push to GitHub.
2. In Vercel, **Add New → Project → Import** this repo.
3. Framework Preset: **Other** (Vercel auto-detects static).
4. Build Command: *(leave empty)*
5. Output Directory: *(leave empty — root is served)*
6. Click **Deploy**.

`vercel.json` already configures security headers and long-cache for `/assets/*`.

## Custom domain

After deploy, attach `securityprojectsltd.co.uk` (and `www.`) in Vercel → Project → Settings → Domains, then update DNS at your registrar.

## Structure

```
/
├── index.html              # Homepage
├── about.html
├── team.html
├── sectors.html
├── testimonials.html
├── careers.html
├── contact.html            # Form + Google Map embed
├── privacy.html
├── cookies.html
├── 404.html
├── services/
│   ├── manned-guarding.html
│   ├── hotel-security.html
│   ├── retail-security.html
│   ├── mobile-patrols.html
│   ├── cctv-access-control.html
│   └── keyholding-alarm-response.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── images/favicon.svg
├── sitemap.xml
├── robots.txt
└── vercel.json
```

## Contact form

The form on `/contact.html` currently uses a `mailto:` fallback — submitting opens the visitor's email client pre-filled. To capture submissions server-side, wire it to **Formspree**, **Web3Forms**, a **Vercel serverless function**, or similar — see `assets/js/main.js`.

## SEO

- Per-page `<title>`, meta description, canonical URL, Open Graph tags
- JSON-LD structured data (`SecurityService`, `Service`, `BreadcrumbList`, `ContactPage`, `AboutPage`)
- `sitemap.xml` and `robots.txt` at root
- Submit `sitemap.xml` in Google Search Console after deploy

## Replacing placeholder content

- **Hero/feature images** currently pull from Unsplash CDN. Replace with optimised WebP/AVIF in `/assets/images/` and update `<img src>` attributes.
- **Team avatars** are initials over a navy gradient. Replace with real headshots.
- **Testimonial avatars** are initials — replace with real photos/logos if available.

## License

© Security Projects UK Limited. All rights reserved.
