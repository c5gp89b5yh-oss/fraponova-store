# FRAPONOVA — Independent global affiliate discovery store

This starter is a static store with no customer checkout and **no physical goods stocked by us**. It is an editable GitHub-ready source package. Affiliate purchases should happen at the external merchant, who handles payment, shipping and returns.

## Deployment and repo status
A separate initial FRAPONOVA design was deployed directly to **Vercel** project `fraponova-store` on `khdiras260`. This source package is **GitHub-ready**, but not automatically linked to Vercel and is **not guaranteed to be byte-for-byte identical to the live landing page**. A GitHub repo must be created on user-chosen GitHub IMAD and connected explicitly.

## GitHub
Create a new private repository `fraponova-store` under GitHub user `c5gp89b5yh-oss` and upload **the contents of this unzipped package at the repository root**, not the zip itself. Then connect it to the existing Vercel project `fraponova-store` via Vercel Project Settings → Git. A future push will deploy from the repository.

## Products and commission links
The `products.json` list is intentionally empty. Add retailer-authorized product images, accurate details, and **approved** affiliate tracking URLs only after affiliate account activation:
```json
[
  {
    "name": "Verified product title",
    "brand": "Retail brand",
    "retailer": "Retailer name",
    "category": "Electronics",
    "description": "Independent accurate description",
    "imageUrl": "https://approved-image-url.example/image.jpg",
    "affiliateUrl": "https://tracking-partner.example/approved-affiliate-link"
  }
]
```
Categories are Electronics, Home, Beauty or Lifestyle. Only HTTPS URLs display. Links use `rel="sponsored nofollow noopener noreferrer"`.

## Before launch
1. Add company/contact details, privacy policy/cookies disclosures, and merchant-specific affiliate disclaimers.
2. Check every affiliate program's product/image and trademark usage terms.
3. Do not claim to process checkout or delivery. Avoid fabricated prices, ratings, reviews or stock claims.
4. Update SEO meta, remove noindex and robots.txt disallow only when content is ready to be indexed, and add a valid sitemap.
5. The Payoneer USD/EUR account is configured inside each **affiliate network payout settings**, not on this storefront.
6. See `DNS-MIGRATION.md` for project-specific DNS changes; DO NOT delete mail records.
