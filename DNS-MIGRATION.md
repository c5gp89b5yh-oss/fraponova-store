# Fraponova DNS migration — external BusinessIdentity DNS

**Status (2026-10-27): NOT APPLIED.** External DNS is currently delegated to:
- `ns1.hosting.businessidentity.llc`
- `ns2.hosting.businessidentity.llc`

Fraponova project: `fraponova-store` (Vercel). The project domains `fraponova.com` and `www.fraponova.com` are added and verified in Vercel, but apex DNS still resolves to `66.223.49.89` and Vercel reports misconfigured.

## Web records to replace at current authoritative DNS provider

Vercel get_domain_config latest recommendations:
| Type | Host | Target |
| --- | --- | --- |
| A | @ | 216.198.79.1 |
| A | @ | 64.29.17.1 |
| CNAME | www | 5e0740039641fd19.vercel-dns-017.com. |

- Replace existing apex A `@` -> `66.223.49.89` with the TWO A records above.
- Remove existing `www` A -> `66.223.49.89` before creating the CNAME; a CNAME and A cannot coexist for the same name.
- Confirm project-specific recommendations again in Vercel **Settings → Domains** before saving, since they may change.
- Leave wildcard A (`*`) untouched unless separately reviewed.

## Mail and verification records to PRESERVE
- `mail` A -> `66.223.49.89`
- `@` MX priority 10 -> `mailserver.businessidentity.llc.`
- `@` TXT SPF -> `v=spf1 a mx include:spf.postal.businessidentity.llc ~all`
- `_dmarc` TXT -> retain exact existing DMARC policy
- `postal-4mto8r._domainkey` TXT -> retain exact existing DKIM key
- `_acme-challenge` TXT entries -> retain unless provider confirms no longer needed
- `psrp` CNAME -> `rp.postal.businessidentity.llc.`
- `@` NS delegation -> retain `ns1.hosting.businessidentity.llc`, `ns2.hosting.businessidentity.llc`

**Critical SPF review:** The existing SPF authorizes the root domain's A record via `a`. Changing the root A will change what IP the `a` mechanism authorizes. Ask the current mail host if the old IP `66.223.49.89` also sends outgoing mail. If yes, include it explicitly as `ip4:66.223.49.89` while preserving one single SPF TXT record, or follow provider's supported SPF settings. DO NOT blindly change SPF.

## After changing DNS
1. Confirm `fraponova.com` and `www.fraponova.com` serve Vercel with valid TLS and www redirects to apex.
2. Confirm existing MX, SPF, DKIM, and DMARC; test outbound and inbound professional mail and verify SPF/DKIM alignment.
3. Leave `noindex` until the affiliate catalogue and policies are ready.

External DNS changes cannot be performed from Vercel alone while authoritative NS is BusinessIdentity.
