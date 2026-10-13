# Owner security checklist

Things only Dani can do. Tick each one off. Cloudflare steps are in `docs/security/cloudflare.md`.

## Do now

### Accounts (the most common way sites get hacked)

- [ ] GitHub: the account dbottaro-star1 signs in with Google, so GitHub is only as safe as the Google account. Turn on 2-step verification and add a passkey to the Google account (https://myaccount.google.com/security, then 2-Step Verification, then Passkeys and security keys). Remove old phones and apps you do not use under Your devices.
- [ ] GitHub itself: Settings, Password and authentication. Turn on two-factor authentication there too (a passkey or an authenticator app), and add a passkey. Save the recovery codes in a password manager, not in email.
- [ ] Cloudflare: My Profile, Authentication. Turn on two-factor authentication (an authenticator app or a security key) and save the backup codes. Set a long unique password in a password manager.
- [ ] Domain registrar: turn on 2FA, set a unique password, check that the account email is one you control, and turn on auto-renew. The registrar lock is covered in `docs/security/cloudflare.md`, section 7.
- [ ] Old hosting account (where WordPress runs): turn on 2FA if offered, and change the password. Do this even though the site is being retired, because it holds backups and the domain DNS history.
- [ ] Email account for hello@delbuenostudio.com: turn on 2FA with a passkey or security key. Email access lets an attacker reset every other password.
- [ ] Use a password manager (1Password, Bitwarden or the built-in Apple or Google one) so every account has a different long password.

### Clean up the old WordPress site before shutting it down

- [ ] Log in to WordPress admin. Under Users, delete every user you do not recognize (attackers often leave extra Administrator accounts). Check all roles, not only Administrators.
- [ ] Change the password of every remaining user, including yours. Also change the database password, the hosting control panel password, and FTP, SFTP and SSH passwords.
- [ ] Do not copy anything from the old site to the new one except the written content and images that are already in the new site. Do not reuse any plugin, theme or uploads folder, because they may contain backdoors.
- [ ] Keep a private list of the spam URLs (they go into the Cloudflare 410 rule, see `docs/security/cloudflare.md`, section 4).
- [ ] After the cutover works, take the old site offline. At the host, delete the WordPress files and the database, or cancel the hosting plan. Do not leave it running "just in case". An old unpatched WordPress is exactly how the site was hacked.
- [ ] Delete old backups that contain credentials or database dumps (on the host, in plugin backup folders, in cloud storage and on your computer). Keep one clean copy of the plain content only, stored somewhere private.
- [ ] Remove any API keys, SMTP passwords and third-party tokens that the old site used, and rotate them at the provider.
- [ ] Check Google Search Console (add the domain, if you have not yet). Look at Security issues and Manual actions, and use the Removals tool for any spam URLs still in the index.

## GitHub repository settings

Already applied by Claude with Dani's permission (Settings in dbottaro-star1/delbueno-web):

- [x] Ruleset on `main` that blocks force pushes and deletion.
- [x] Secret scanning and push protection.
- [x] Dependabot alerts and Dependabot security updates.
- [x] Private vulnerability reporting (it backs `SECURITY.md`).
- [x] Actions default token is read-only.
- [x] "Allow GitHub Actions to create and approve pull requests" is OFF. Keep it off. The Dribbble sync workflow pushes to the `dribbble-sync` branch and you open the pull request yourself from the link in the job summary.

Still to do:

- [ ] Add "Require status checks to pass" to the `main` ruleset and select the check named `checks` from `.github/workflows/ci.yml`. Do this after `ci.yml` has been pushed and has run once, because GitHub only offers checks it has seen.
- [ ] Actions, General: allow only selected actions (GitHub-created and Marketplace verified creators), and require approval for fork pull request workflows. Note that `peter-evans/create-pull-request` is no longer used, so no extra allow-list entry is needed.
- [ ] Pages: tick Enforce HTTPS once the custom domain is set. Verify the domain at the account level first (see `docs/security/cloudflare.md`, section 11).
- [ ] Environments, github-pages: limit deployment branches to `main`.

## At launch

- [ ] Cloudflare: work through `docs/security/cloudflare.md` in order: Full (strict) SSL, Always Use HTTPS, Minimum TLS 1.2, HSTS (without preload at first), the security header rule in Report-Only mode and then enforced, DNSSEC, CAA records, registrar lock.
- [ ] Verify the domain in GitHub (account Settings, Pages) before pointing DNS at GitHub Pages, so nobody else can claim it.
- [ ] Add `public/CNAME` and switch the three values in `.github/workflows/deploy.yml` (see the comment in that file), then deploy.
- [ ] Import the Bulk Redirects and create the 410 rule.
- [ ] Set up SPF, DKIM and DMARC (start with `p=none`, move to `quarantine` after the reports look clean).
- [ ] Check that Cloudflare "Block AI bots" is off so the crawlers in `robots.txt` can reach the site.
- [ ] Delete leftover WordPress DNS records.
- [ ] Take the old WordPress site offline and delete its backups (see above).
- [ ] Test the final site at https://securityheaders.com and https://www.ssllabs.com/ssltest/. The headers should be A or better, and the TLS grade should be A or A+.
- [ ] After a week with no problems, turn on HSTS preload and submit at https://hstspreload.org.
- [ ] Put a reminder in your calendar for 2027-09-01 to renew `public/.well-known/security.txt` (its Expires date is 2027-10-13), and for a review of this checklist every six months.
- [ ] Merge Dependabot pull requests when CI is green. Do not ignore them for months.
