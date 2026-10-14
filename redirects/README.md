# Redirects

GitHub Pages cannot send real 301 redirects, so the old WordPress URLs are redirected by Cloudflare once
delbuenostudio.com points at the new site.

## Files

- `redirects.csv`: one row per old URL, ready for Cloudflare Bulk Redirects.
- `es-subdomain.csv`: the old Spanish subdomain (es.delbuenostudio.com) mapped to the new `/es/` pages. Same format as `redirects.csv`, see "The Spanish subdomain" below.
- `gone.txt`: paths that should answer 410 Gone. Empty on purpose (see below).

## redirects.csv format

There is no header row. Columns, in order:

1. `source_url`: the old URL, with the full origin and a trailing slash.
2. `target_url`: the new URL on https://delbuenostudio.com.
3. `status_code`: always 301.
4. `preserve_query_string`: `true`, so tracking parameters survive.

Cloudflare also accepts optional columns after these (`include_subdomains`, `subpath_matching`,
`preserve_path_suffix`). They are left out because every rule is an exact match.

If the Cloudflare dashboard asks for a header row in your account, add one as the first line.

Blog posts keep their exact URLs, so they have no redirect. `/careers/` and `/contact/` also keep their URLs.

What the file covers:

- Pages: every legitimate page in the old site's URL inventory, mapped to the closest new page.
- Landing pages: `/delbueno-nocode-landing/`, `/design-speed-for-startups/`, `/ux-product-design-landing/` and `/product-design-for-ai-tools/`.
- Categories: `/category/stories/` goes to `/work/`, `/category/blog/marketing/` to its journal category, the other blog
  categories to `/journal/`.
- Author archives: the three real authors go to `/about/`.
- Feeds: `/feed/`, `/comments/feed/` and every category feed go to `/journal/rss.xml`.
- Sitemaps: `/sitemap.xml`, `/sitemap_index.xml`, `/post-sitemap.xml`, `/page-sitemap.xml` and `/category-sitemap.xml`
  go to `/sitemap-index.xml`. These sources are files, so they have no trailing slash.

Not in the file on purpose: junk test pages and URLs that should return 410. Those belong in the private 410 list (see
below), together with any author archive that is not one of the real authors. Per-post comment feeds
(`/<post-slug>/feed/`) are not redirected. If Search Console shows requests for them, add rows that point to
`/journal/rss.xml`.

## How to import

1. In the Cloudflare dashboard open the delbuenostudio.com account, then Manage Account, Bulk Redirects.
2. Create a Bulk Redirect List (for example `delbueno-legacy`) and choose Upload CSV, or add the file to an existing list.
3. Upload `redirects.csv` and fix any row Cloudflare reports.
4. Create a Bulk Redirect Rule that uses the list, and deploy it.
5. Test a few old URLs with `curl -sI https://delbuenostudio.com/our-work/` and confirm a 301 to `/work/`.

Check the entry limit of your Cloudflare plan before importing. Bulk Redirect lists are capped per plan.

Do this after the domain is switched to the new site, not before. Until then the old URLs still belong to the old site.

## Keeping the targets valid

After a build, run:

```
npm run build
npm run check:redirects
```

The check confirms that every target in `redirects.csv` exists in `dist/`. Targets under `/work/` only exist
once the matching case study is added to `src/content/work/`.

## Old URLs without a trailing slash

The rules match the exact old URL, which always ended with a slash. A request without the slash is not matched.
If you see traffic for slashless versions, add rows for them.

## 410 Gone for spam URLs

`gone.txt` is a placeholder. The real list of spam URLs is kept privately. To serve 410 for them, create a
Cloudflare rule (Rules, Custom rules or Response rules, depending on the plan) that matches the paths in the list
with an expression such as `http.request.uri.path in {"/spam-one/" "/spam-two/"}` and answers with status 410.
For long lists, use a Cloudflare List of type URL path and reference it from the expression.

## The Spanish subdomain (es.delbuenostudio.com)

`es.delbuenostudio.com` is a DNS CNAME to GTranslate (`gtranslate.net`). GTranslate fetches the English site,
translates it on its own servers and serves the result from that host. It is not part of this repository. It still
receives traffic: in Search Console (April to October 2026) its home page had 19 clicks from 111 impressions, a 17% click
rate. At the time of the snapshot the host was not responding.

The site now has a native Spanish version under `/es/` (English stays at the root). Every English page has a Spanish
twin except the journal posts, which are English only and listed from `/es/blog/`. The mapping between the two is one
table, `src/i18n/routes.ts`, and `hreflang` links join the pairs.

So the subdomain should redirect to the matching `/es/` pages with a 301. Search engines then move the Spanish listing
to the new URLs, and the third-party proxy and its scripts (which the site's content security policy would block anyway)
go away.

### How to set it up in Cloudflare

1. Make the host reach Cloudflare. In DNS, change the `es` record from the GTranslate CNAME to a proxied (orange cloud)
   record. The target does not matter because the redirect answers first. A CNAME to `delbuenostudio.com` works. Do this
   only when you are ready to switch, because it ends the GTranslate service on that host.
2. Import the exact-match rows. In Manage Account, Bulk Redirects, create a list (for example `delbueno-es-subdomain`),
   upload `es-subdomain.csv`, and add it to a Bulk Redirect Rule, in the same way as `redirects.csv` above. The file has
   no header row and uses the same four columns: source URL with the full origin and a trailing slash, target URL, status
   301, preserve query string. The source with `%C3%AD` is the percent-encoded form of `auditoría`, which is how
   Search Console reports it.
3. Catch everything else. GTranslate served a translation of every old page, so other paths will show up in the logs. Add
   one Redirect Rule below the Bulk Redirect Rule: when the hostname equals `es.delbuenostudio.com`, redirect with a
   static 301 to `https://delbuenostudio.com/es/` and do not preserve the path. A guess at a Spanish path would be a 404,
   the Spanish home page is a better landing. Keep the order: Bulk Redirects first, the catch-all after.
4. Test with `curl -sI https://es.delbuenostudio.com/our-work/` and confirm `301` and
   `location: https://delbuenostudio.com/es/trabajo/`.

### Where the rows point

| es.delbuenostudio.com                                                                         | New target                                  |
| --------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `/`                                                                                           | `/es/`                                      |
| `/our-work/`                                                                                  | `/es/trabajo/`                              |
| `/solutions/web-design-and-development/`, `/-E-commerce/desarrollo-web/`                      | `/es/servicios/diseno-web/`                 |
| `/-E-commerce/auditor%C3%ADa-de-producto/`                                                    | `/es/servicios/estrategia-de-producto/`     |
| `/EdTech/`, `/HealthTech/`                                                                    | `/es/servicios/`                            |
| `/contact/`                                                                                   | `/es/contacto/`                             |
| `/changing-the-role-of-product-designers/`, `/how-ai-is-transforming-design/` (journal posts) | the same English post on delbuenostudio.com |

The two journal posts have no Spanish version, so they go to the English article at the same path. If a post is
translated later, change its row to the Spanish address.

`npm run check:redirects` reads both CSV files and confirms every target exists in `dist/`.

Whichever way the DNS switch is timed, do not change the DNS record until the redirect rules are in place.
