# Fraponova.com DNS — verified recommendations, 2026-10-27

**Vercel project**: `fraponova-store` in the khdiras260 account.
**Domain names**: `fraponova.com` and `www.fraponova.com` are already associated with the Vercel project and verified within Vercel.
**DNS authority**: ns1.hosting.businessidentity.llc / ns2.hosting.businessidentity.llc — external, NOT Vercel.
**Website still not routed**: DNS at registrar points `@` and `www` to `66.223.49.89`.

## Exact web changes to apply at current DNS provider

1. Replace old `@` A `66.223.49.89` with **TWO** root A records:
    - Type A, Host @, Value `216.198.79.1`, TTL 1 min
    - Type A, Host @, Value `64.29.17.1`, TTL 1 min
   These are Vercel primary rank-1 recommended apex IPs for *this connected project*. Alternative legacy fallback is 76.76.21.21 but don't combine with the rank-1 recommendations unnecessarily.
2. Delete the old A `www` -> `66.223.49.89`.
3. Create Type CNAME, Host `www`, Value `5e0740039641fd19.vercel-dns-017.com.` TTL 1 min.
4. Don't set both A and CNAME for www.

## Preserve email and existing services

- Preserve A `mail` -> `66.223.49.89`
- Preserve MX `@`, priority 10, `mailserver.businessidentity.llc.`
- Preserve TXT `_dmarc`, TXT `postal-4mto8r._domainkey`, TXT `_acme-challenge` x2, CNAME `psrp`.
- Preserve NS at registrar and zone: `NS1.HOSTING.BUSINESSIDENTITY.LLC.`, `NS2.HOSTING.BUSINESSIDENTITY.LLC.`
- Leave wildcard A `*` unchanged for now and audit separately.
- SPF TXT `v=spf1 a mx include:spf.postal.businessidentity.llc ~all`: After changing root A, the `a` mechanism will authorize Vercel rather than the previous web host. Discuss with mail provider whether `a` is needed for outgoing mail before editing SPF. Never add a second SPF record.
- DNS actions here are **instructions only**: no edits have been made to the external DNS provider.

## Verification
After DNS propagation, verify HTTPS for apex and www, redirect (www to apex), and live MX/SPF/DKIM/DMARC. Confirm Vercel Project → Domains shows correctly configured; then test receiving and sending email.
