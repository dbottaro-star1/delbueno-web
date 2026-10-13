# Security policy

## Reporting a vulnerability

If you find a security problem with delbueno Studio's website or this repository, please tell us privately first.

- Email hello@delbuenostudio.com with the subject "Security report".
- Or use GitHub private vulnerability reporting: open the Security tab of this repository and choose "Report a vulnerability".

Please include the URL or file involved, the steps to reproduce, and what you think the impact is. Do not open a public issue or pull request for a vulnerability, and please do not access, change or delete data that is not yours.

We will acknowledge your report within 5 working days and tell you what we plan to do. We do not run a paid bounty program, but we are glad to credit you if you want that.

The same contact details are published in `/.well-known/security.txt` on the site.

## How the site is built, and why that matters

The site was rebuilt after the previous WordPress site was compromised. The new architecture removes most of what attackers go after.

- Static files only. Every page is generated at build time and served as plain HTML, CSS, JavaScript and images.
- No server code. Nothing runs on the server when someone visits, so there is nothing to inject code into.
- No database. There is no data store to dump, poison or fill with spam pages.
- No admin panel and no login. There is no `/wp-admin` style entry point to brute force. Content changes only through reviewed commits to this repository.
- No third-party runtime scripts. The site does not load analytics, tag managers, chat widgets or ad scripts from other domains. Fonts are bundled with the site. The only external media are a few playground videos hotlinked from Dribbble.
- No forms that store data. Contact happens through email and an external booking link.
- Publishing is controlled. Only the build in GitHub Actions publishes the site, with minimal token permissions, and all actions are pinned to exact commit versions. Dependencies are checked by `npm audit` on every build and updated through Dependabot.
- Edge protection. Traffic goes through Cloudflare, which adds HTTPS, security headers and DNSSEC. The setup is documented in `docs/security/cloudflare.md`.

The owner's own tasks (account security, repository settings, launch steps) are listed in `docs/security/checklist.md`.
