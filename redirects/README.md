# Redirects

GitHub Pages cannot send real 301 redirects, so the old WordPress URLs are redirected by Cloudflare once
delbuenostudio.com points at the new site.

## Files

- `redirects.csv`: one row per old URL, ready for Cloudflare Bulk Redirects.
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
