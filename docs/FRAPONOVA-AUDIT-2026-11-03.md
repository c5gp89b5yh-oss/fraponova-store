# Fraponova — Audit & safe release plan (2026-11-03)

Scope: GitHub Imad `c5gp89b5yh-oss/fraponova-store`, Vercel Imad projects `fraponova-store` and `fraponova-store-git`. Supabase excluded. This document is a plan, not evidence of completed fixes.

## Confirmed from read-only inspection

- Repository is a static HTML/CSS/JS site: `index.html`, `style.css`, `app.js`; no package.json, server, or automated test suite in the inspected Git tree.
- `products.json` contains `[]`. Current `app.js` renders an animal gallery and editorial dialogs, not affiliate products or ClickDealer tracking.
- `robots.txt` contains `User-agent: *\nDisallow: /`, intentionally blocking crawling. Do not remove this until the site and legal disclosures are launch-ready.
- `vercel.json` includes X-Content-Type-Options and Referrer-Policy. A broader security-header review is pending; a restrictive CSP must be tested with existing Unsplash/Google Fonts resources before adoption.
- `fraponova.com` is verified and attached to Vercel project `fraponova-store`, whose latest READY production deployment has source `redeploy` and no Git metadata in the inspected response.
- The separate Vercel project `fraponova-store-git` has a READY Git-sourced production deployment from GitHub `main`, commit `d9792cdbc378864a109b810d034505d215de9551`.
- READY does not prove HTTP accessibility, functional correctness, or parity between both deployments.

## Risks and priorities

| Priority | Finding | Proposed safe response |
| --- | --- | --- |
| P0 | Domain project and Git-linked project differ | Compare served files and deployment configuration; select one production path only after review. Do not move domain or change DNS yet. |
| P1 | Empty affiliate catalog | Define validated product schema, approved creative assets, locale-aware tracking links, affiliate disclosure; implement in feature PR. |
| P1 | Search-engine crawling disabled | Keep noindex/disallow until legal, content, canonical, sitemap and launch checks pass. |
| P1 | Legal/contact claims not verified | Verify support inbox, privacy and affiliate disclosures; avoid invented retailer claims. |
| P2 | No automated tests in repository | Add static smoke tests and optional browser checks; run and report actual outcomes. |
| P2 | Security and accessibility not tested | Review headers, links, keyboard navigation, focus, external resources, performance and responsive layouts. |

## Proposed release sequence

1. Confirm whether Fraponova remains an animal editorial site or becomes a broader affiliate catalog.
2. Create isolated feature PRs against `main`; do not push directly to `main`.
3. Add and execute automated static checks, then browser/SEO/accessibility tests against an isolated preview.
4. Validate advertiser permissions and all affiliate landing URLs before making CTAs public.
5. Confirm Vercel project, Git source, domains, redirects, DNS/MX records and rollback path before any production change.
6. Obtain explicit approval for production release and domain/Git configuration changes.

## Not yet verified

Live page contents, mobile layouts, Core Web Vitals, mail delivery, DNS mail records, real affiliate click/conversion attribution, runtime errors, and whether production and Git deployments serve identical files. No production data or configuration was changed by this audit.
