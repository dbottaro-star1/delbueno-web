# Cloudflare security setup for delbuenostudio.com

This guide is for Dani. Do the steps in order. Cloudflare moves menu items around from time to time, so if a name below is slightly different on your screen, use the search box at the top of the dashboard and look for the setting name in quotes.

Do these after the domain is added to Cloudflare and pointed at GitHub Pages (see the README for the cutover steps). Steps 1 to 3 are safe to do early. Step 11 is easiest right before the cutover.

Use the same Cloudflare account that holds delbuenostudio.com. In this guide, "the dashboard" means https://dash.cloudflare.com and "the zone" means the delbuenostudio.com site you open from the home screen.

## 0. Point the domain at GitHub Pages (reference)

In the zone, open DNS, then Records. These are the GitHub Pages values. Leave the orange cloud (Proxied) on for all of them.

- Four A records for the name `@` with the values 185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153.
- Four AAAA records for the name `@` with the values 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153 and 2606:50c0:8003::153.
- One CNAME record named `www` with the target `dbottaro-star1.github.io`.

Check GitHub's current values at https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site before you copy these, because GitHub can change them.

## 1. SSL/TLS: Full (strict), HTTPS only, TLS 1.2 or newer

1. Open the zone, then SSL/TLS, then Overview.
2. Under SSL/TLS encryption mode choose Configure (or Edit), pick Custom SSL/TLS, then Full (strict), and save.
3. Open SSL/TLS, then Edge Certificates.
4. Turn on Always Use HTTPS.
5. Set Minimum TLS Version to TLS 1.2.
6. Make sure TLS 1.3 is On and Automatic HTTPS Rewrites is On.

Full (strict) needs a valid certificate on the GitHub side. GitHub creates one for your custom domain automatically (from Let's Encrypt) once the domain is set in the repository Pages settings and the DNS check passes. If GitHub says it cannot issue the certificate while the orange cloud is on, switch the records to DNS only (grey cloud) for a few minutes until GitHub shows "Enforce HTTPS" as available, tick it, then turn the orange cloud back on. Never use the Flexible mode, because it sends traffic to the origin without encryption.

### HSTS

HSTS tells browsers to never use plain HTTP for the site. It is hard to undo, so enable it only after the site works over HTTPS on the real domain and on www.

1. Stay on SSL/TLS, then Edge Certificates, and find HTTP Strict Transport Security (HSTS). Select Enable HSTS and read the warning.
2. Set Max Age Header to 12 months (31536000 seconds).
3. Turn on Apply HSTS policy to subdomains (includeSubDomains). Before you do, make sure every subdomain you use, such as a mail web portal, works over HTTPS.
4. Turn on No-Sniff Header. (This is the same header as `X-Content-Type-Options: nosniff` in step 2, so you do not need to add it twice. Keep it in one place.)
5. Leave Preload off for now. Save.

Turn Preload on only after you verify all of this:

- https://delbuenostudio.com and https://www.delbuenostudio.com both load with a valid certificate.
- `curl -sI http://delbuenostudio.com` returns a redirect to HTTPS.
- `curl -sI https://delbuenostudio.com` shows `strict-transport-security` with `max-age=31536000; includeSubDomains`.
- You have waited at least a week with no problems.

Then turn on Preload in the same panel and submit the domain at https://hstspreload.org. Removal from the preload list takes months, so do not rush this.

## 2. Security headers with a Response Header Transform Rule

GitHub Pages cannot set custom headers, so Cloudflare adds them.

1. Open the zone, then Rules, then Overview (older dashboards: Rules, Transform Rules).
2. Choose Create rule, then Modify Response Header.
3. Rule name: `Security headers`.
4. Under If incoming requests match, choose Custom filter expression and use the editor to enter:
   `(http.host eq "delbuenostudio.com") or (http.host eq "www.delbuenostudio.com")`
5. Under Then, choose Set static for each of the headers below, one row each, using Add to get more rows. Use the header name and value exactly as shown.

| Header name                           | Value                                                                                                                                                                 |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Content-Security-Policy-Report-Only` | the CSP from the next section (start here, see "Test in Report-Only mode")                                                                                            |
| `X-Content-Type-Options`              | `nosniff` (skip if you already turned on No-Sniff in the HSTS panel)                                                                                                  |
| `Referrer-Policy`                     | `strict-origin-when-cross-origin`                                                                                                                                     |
| `Permissions-Policy`                  | `accelerometer=(), bluetooth=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), serial=(), usb=()` |
| `X-Frame-Options`                     | `DENY`                                                                                                                                                                |
| `Cross-Origin-Opener-Policy`          | `same-origin`                                                                                                                                                         |

6. Choose Deploy. The rule applies within seconds.
7. Check it: `curl -sI https://delbuenostudio.com/ | grep -i -E "content-security|nosniff|referrer|permissions|x-frame|cross-origin"`.

`X-Frame-Options: DENY` is the old way to block framing, and `frame-ancestors 'none'` in the CSP is the modern way. Keep both. Browsers only honor `frame-ancestors` from a header (not from a meta tag), which is one reason to set the CSP here.

### The Content-Security-Policy value

Paste this as one line. It is generated from `security/csp.json`, and `npm run check:csp` fails if this line and that file ever differ, so do not edit it by hand here. Change the file, then copy the new line.

```
default-src 'self'; script-src 'self' https://static.hotjar.com https://script.hotjar.com https://static.cloudflareinsights.com 'sha256-kSaX0iOryjpCQSkOMxVYvdTnp6BAnJysgVbj9wm/ERw='; style-src 'self' https://static.hotjar.com https://script.hotjar.com; style-src-attr 'unsafe-inline'; img-src 'self' data: https://static.hotjar.com https://script.hotjar.com; media-src 'self' https://cdn.dribbble.com; font-src 'self' https://script.hotjar.com; connect-src 'self' https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com https://cloudflareinsights.com; manifest-src 'self'; frame-src 'none'; worker-src 'none'; form-action 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests
```

What each part does:

- `default-src 'self'` blocks everything that is not listed from any other origin. The only third parties are the Dribbble videos, Hotjar and Cloudflare Web Analytics.
- `script-src 'self' 'sha256-...'` allows the site's own script files and exactly one inline script: the small boot script in `src/layouts/BaseLayout.astro` that adds the `js` class. The hash is the same on every page, because that script never changes between builds. There is no `'unsafe-inline'` for scripts, so an injected `<script>` or `onclick=` attribute does not run. The JSON-LD blocks are data, not scripts, and are not affected.
- `style-src 'self'` allows stylesheet files only. The build writes every stylesheet to a file (`build.inlineStylesheets: 'never'` in `astro.config.mjs`), so there are no inline `<style>` blocks.
- `style-src-attr 'unsafe-inline'` is the one deliberate exception. A few elements carry a `style="..."` attribute (shot and case study cover aspect ratios, a few SVG labels). CSS in an attribute cannot run script, and the exception covers attributes only, not `<style>` elements.
- `img-src 'self' data:` allows the site's images and the small inline SVG used for the film grain. `manifest-src 'self'` and `form-action 'self'` keep the manifest and form posts on the site itself.
- Hotjar (heatmaps and recordings, loaded by `src/scripts/analytics.ts` on the production domain only) gets the minimum hosts from [Hotjar's CSP guide](https://help.hotjar.com/hc/en-us/articles/36820026388881-Content-Security-Policies): `static.hotjar.com` and `script.hotjar.com` in `script-src`, `style-src` and `img-src`, `script.hotjar.com` in `font-src`, and `*.hotjar.com`, `*.hotjar.io` and `wss://*.hotjar.com` in `connect-src`. Hotjar's guide also suggests `'unsafe-inline'` for scripts and styles. The site leaves it out: the loader is a bundled file, not an inline snippet. If Hotjar surveys or the feedback widget are ever turned on, they may need `style-src 'unsafe-inline'` and `frame-src https://*.hotjar.com`; the console will say so.
- Cloudflare Web Analytics runs in automatic setup: Cloudflare injects its beacon into each HTML response at the edge, so it is not in the repository. It needs `https://static.cloudflareinsights.com` in `script-src` and `https://cloudflareinsights.com` in `connect-src`. It sets no cookies. If automatic setup is ever turned off, those two entries can go.
- `media-src 'self' https://cdn.dribbble.com` allows the playground videos that are hotlinked from Dribbble. If the playground ever shows images or poster frames from Dribbble, add `https://cdn.dribbble.com` to `img-src` too (the Report-Only test will show it).
- `frame-src 'none'` and `worker-src 'none'` block embedded pages and workers. `object-src 'none'` disables plugins. `base-uri 'none'` stops an injected `<base>` tag from redirecting relative links.
- `frame-ancestors 'none'` stops other sites from framing ours. `upgrade-insecure-requests` upgrades any stray http:// link to https://.

The same policy is also written into every page as a `<meta http-equiv="Content-Security-Policy">` tag, as a second layer that works even where this header is missing (for example the GitHub Pages preview). A meta tag cannot carry `frame-ancestors`, and the site leaves `upgrade-insecure-requests` out of it so the local http preview keeps working, so those two are header only. The meta tag is the first thing in `<head>`, before the inline script, because a meta policy only covers what comes after it. Browsers enforce every policy they receive, and a page must satisfy all of them, so the header and the meta tag are identical and never conflict.

### When the boot script changes

The allowed hash belongs to the exact text of the inline script in `src/layouts/BaseLayout.astro`. If anybody edits that script, even a space, the hash changes and the browser would block it (the site then loses its `js` class and the reduced motion handling). That is why CI runs `npm run check:csp` after the build: it hashes every inline script in `dist/` and fails when a hash is not in `security/csp.json`, and it prints the new hash. To update:

1. Run `npm run build && npm run check:csp`. Copy the hash from the failure message.
2. Replace the `sha256-...` value in `security/csp.json` (under `script-src`).
3. Run `npm run build && npm run check:csp` again. It now fails only if the line in this document differs, and shows the line to paste into the code block above and into the Cloudflare rule.

The same check also fails the build for any inline `<style>`, any `on*=` event attribute, any `javascript:` URL, any script or stylesheet from another origin, and a missing or misplaced meta tag.

### Test in Report-Only mode first

A wrong CSP can silently break the site (missing video, missing fonts), so run it in test mode before enforcing.

1. Create the rule with the header name `Content-Security-Policy-Report-Only` (as in the table). In this mode the browser logs violations in the console but blocks nothing.
2. Open https://delbuenostudio.com in Chrome, open DevTools (Cmd+Option+I on Mac), and choose the Console tab. Browse the home page, a work page, a blog post, the playground, careers and contact. Scroll everything and play the videos.
3. Any message starting with "Refused to..." or "[Report Only] Refused to..." is something the policy would block. Fix each one by adding the exact origin to the matching directive (for example, `https://cdn.dribbble.com` in `img-src`), or remove the thing that needs it.
4. When a full click-through is silent, edit the rule and rename the header from `Content-Security-Policy-Report-Only` to `Content-Security-Policy`. Deploy.
5. Repeat the click-through once more. If anything breaks, switch back to Report-Only immediately (a one-click edit) and fix it.

## 3. Bulk Redirects for the old WordPress URLs

Follow `redirects/README.md` in this repository, section "How to import". In short: Manage Account, Bulk Redirects, create the list, upload `redirects/redirects.csv`, create a Bulk Redirect Rule that uses the list, and deploy. Do this only after the domain points at the new site. Then test with `curl -sI https://delbuenostudio.com/our-work/` and confirm a 301 to `/work/`.

## 4. Return 410 Gone for old spam URLs

The hacked WordPress site left spam URLs in Google. A 410 tells search engines the pages are gone for good, so they drop them faster than with a 404. The real list is kept privately (see `redirects/gone.txt`).

1. Open the zone, then Security, then WAF, then Custom rules, then Create rule.
2. Rule name: `Gone: old spam URLs`.
3. Choose Edit expression and enter, with your real paths (each path in quotes, separated by spaces):
   `http.request.uri.path in {"/spam-one/" "/spam-two/"}`
4. Under Then take action, choose Block, then set the response to Custom response with Response code 410, Response type Plain text (or HTML), and a short body such as `Gone`.
5. Deploy. Test with `curl -sI https://delbuenostudio.com/spam-one/` and confirm `HTTP/2 410`.

An expression has a length limit (about 4,000 characters), so split a long list across several rules. Free plans have a small number of custom rules, so check your plan. If the dashboard does not offer a 410 response code for Block on your plan, use Rules, Redirect Rules or Error/Response rules instead, whichever lets you choose the status 410. Keep these paths out of the Bulk Redirect list.

## 5. DNSSEC

DNSSEC signs your DNS answers so nobody can forge them.

1. Open the zone, then DNS, then Settings.
2. Select Enable DNSSEC. Cloudflare shows a DS record (key tag, algorithm, digest type, digest).
3. Log in to your domain registrar and find the DNSSEC or DS record section for the domain. Add the DS record with exactly the values Cloudflare shows. (If the domain is registered at Cloudflare Registrar, this happens automatically.)
4. Back in Cloudflare, wait until the DNSSEC status says Active. This can take up to a day.

## 6. CAA records

CAA records say which companies may issue certificates for the domain, so a forged certificate is much harder to get.

Cloudflare's own documentation (checked 2026-10-13, https://developers.cloudflare.com/ssl/reference/certificate-authorities/) says its Universal certificates come from Let's Encrypt, Google Trust Services and SSL.com, with Sectigo used for backup certificates. Cloudflare also adds the CAA entries for these CAs automatically as soon as you add any CAA record, so the list is covered even if you only add the first two. Check this page again before you do this, because the CA list can change.

1. Open the zone, then DNS, then Records, then Add record.
2. Type: CAA. Name: `@`. Tag: Only allow specific hostnames (issue). CA domain name: `letsencrypt.org`. Save.
3. Repeat with CA domain name `pki.goog`. (GitHub Pages uses Let's Encrypt for its own certificate, so `letsencrypt.org` must stay.)
4. Optional, to match what Cloudflare adds itself: repeat with `ssl.com` and `sectigo.com`.
5. Add one more CAA record with Tag: Only allow wildcards (issuewild) and the same CA names, or a record with CA domain name `;` to forbid wildcard certificates entirely if you do not need them.
6. Add a CAA record with Tag: Send violation reports to URL (iodef) and the value `mailto:hello@delbuenostudio.com`.
7. Verify: `dig delbuenostudio.com CAA +short`. You should see the CAs above.

## 7. Registrar lock

At the company where the domain is registered, log in (with 2FA on, see the checklist) and find the domain settings.

1. Turn on Registrar Lock (also called Transfer Lock, or the clientTransferProhibited status). This blocks transfers to another registrar without your approval.
2. If the registrar offers a "registry lock" or "transfer authorization code required" option, turn that on too.
3. Check that auto-renew is on and the contact email is one you read. An expired domain is a common way sites get taken over.
4. If the domain is at Cloudflare Registrar: open the dashboard, Domain Registration, Manage Domains, select the domain, then Configuration, and confirm the lock is on.

## 8. Email anti-spoofing: SPF, DKIM, DMARC

This makes it hard for others to send email that pretends to come from @delbuenostudio.com, which also protects the people who write to you. You need to know which service sends and receives mail for hello@delbuenostudio.com (for example Google Workspace, Zoho, Fastmail or Microsoft 365). Use that provider's help pages for the exact values. Add each record in the zone, under DNS, then Records, then Add record. Email records must be DNS only (grey cloud).

1. SPF. Type TXT, Name `@`, Content: your provider's SPF string. For example, for Google Workspace it is `v=spf1 include:_spf.google.com ~all`. A domain may have only one SPF record, so merge providers into one record. If the domain sends no email at all, use `v=spf1 -all`.
2. DKIM. In your mail provider's admin page, generate the DKIM key. It gives you a TXT record name (for example `google._domainkey`) and a long value. Add it as TXT in Cloudflare, then use the provider's "Start authentication" button.
3. DMARC. Type TXT, Name `_dmarc`, Content: `v=DMARC1; p=none; rua=mailto:hello@delbuenostudio.com`. This only collects reports and blocks nothing.
4. Read the reports for two to four weeks (they arrive as XML attachments, and free tools such as dmarcian or Postmark's DMARC digest can summarize them). When your real mail passes SPF or DKIM everywhere, change the value to `v=DMARC1; p=quarantine; rua=mailto:hello@delbuenostudio.com`. After a few more clean weeks you can move to `p=reject`.
5. Test by sending an email to a Gmail account, then Show original, and confirm SPF, DKIM and DMARC all say PASS.

## 9. Bot Fight Mode must not block the AI crawlers we welcome

The site's `robots.txt` welcomes AI crawlers such as GPTBot, ClaudeBot and PerplexityBot so the studio shows up in AI answers. Some Cloudflare settings block them regardless of robots.txt.

1. Open the zone, then Security, then Settings (or Security, then Bots), and look at the Bots section.
2. Find Block AI bots (also shown as "AI Scrapers and Crawlers"). It must be Off, or set to "Do not block (allow crawlers)". If it is on, GPTBot, ClaudeBot and similar are blocked at the edge.
3. Check Manage AI crawlers or AI Crawl Control (if your dashboard has it). Make sure none of the crawlers you want are set to Block. Some accounts also have a Managed robots.txt option that adds extra rules to robots.txt; leave it off, so Cloudflare does not change the file from the repository.
4. Bot Fight Mode (the free basic one) is fine to keep on for normal traffic, because it challenges known bad bots and not the verified crawlers. After turning it on, test with `curl -sI -A "GPTBot" https://delbuenostudio.com/` and `curl -sI -A "ClaudeBot" https://delbuenostudio.com/`. You should get `HTTP/2 200`, not 403. (A request with a faked user agent can still be challenged because it is not from the real crawler's IP range, so also check Security, then Events for blocked requests of those bots after a few days.)
5. Do not add custom WAF rules that block by user agent for these bots.

## 10. Smaller settings worth checking

- SSL/TLS, then Edge Certificates, then Certificate Transparency Monitoring: turn on so you get an email if anybody gets a certificate for the domain.
- Security, then Settings: Security Level Medium, Browser Integrity Check On.
- Account, then Members: remove anybody who should not have access, and make sure 2FA is on for your user (see `docs/security/checklist.md`).

## 11. After cutover: clean up DNS and protect the GitHub Pages domain

Leftover DNS records pointing at old services are a classic way sites get taken over, because an attacker can claim the abandoned target.

1. Open the zone, then DNS, then Records. Go through every row.
2. Delete records that pointed to the old WordPress host: its A and AAAA records, `staging`, `dev`, `old`, `ftp`, `cpanel`, `webmail` and similar names, and any CNAME to a service you no longer use. Keep only what the new site and your email need (the GitHub A, AAAA and CNAME records from step 0, MX, SPF, DKIM, DMARC, CAA).
3. Do not leave a CNAME that points at `*.github.io` for a name that is not set up in GitHub Pages. Do not leave `*` (wildcard) records.
4. Verify the domain in GitHub, which stops other GitHub users from claiming your domain on their own Pages sites:
   1. Log in to GitHub as dbottaro-star1. Click your profile picture, then Settings, then Pages (in the left menu).
   2. Choose Add a domain and enter `delbuenostudio.com`.
   3. GitHub shows a TXT record name (`_github-pages-challenge-dbottaro-star1` plus the domain) and a value. Add it in Cloudflare, under DNS, as a TXT record. This record can be DNS only.
   4. Return to GitHub and choose Verify. Do the same for `www.delbuenostudio.com` if you use it. Leave the TXT record in place.
5. Then, in the repository: Settings, Pages, set Custom domain to `delbuenostudio.com`, wait for the DNS check, and tick Enforce HTTPS.
6. Finally, take the old WordPress site offline (see `docs/security/checklist.md`).
