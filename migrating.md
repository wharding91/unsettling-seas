# Migrating the Repo to Warren's GitHub Account

This document covers how to transfer the *Unsettling Seas* repository from
`github.com/ccarvel/warren-jekyll-site` to Warren's GitHub account, re-enable
GitHub Pages, update the site config, and add Cody as a collaborator.

---

## Before you start

You will need:
- Warren's GitHub username (referred to below as `<warren-username>`)
- Both Warren and Cody to have GitHub accounts
- Cody to be the one performing most of these steps (as current repo owner)

---

## Step 1 — Transfer the repository

Cody does this from the current repo.

1. Go to **https://github.com/ccarvel/warren-jekyll-site/settings**
2. Scroll to the bottom: **Danger Zone → Transfer repository**
3. Click **Transfer**
4. In the dialog, type `warren-jekyll-site` to confirm the repo name
5. Enter Warren's GitHub username (`<warren-username>`) as the destination
6. Click **I understand, transfer this repository**

GitHub will send Warren an email with a link to **accept the transfer**.
Warren must click that link — the transfer is not complete until he accepts.

> **Note:** GitHub automatically redirects the old URL
> (`github.com/ccarvel/warren-jekyll-site`) to the new one for a period, but
> this redirect is not permanent. Update bookmarks once the transfer is done.

---

## Step 2 — Warren accepts the transfer

Warren opens the email from GitHub and clicks **Accept transfer**. The repo now
lives at `github.com/<warren-username>/warren-jekyll-site`.

---

## Step 3 — Add Cody as a collaborator

Warren does this so Cody can continue pushing updates directly.

1. Go to **https://github.com/<warren-username>/warren-jekyll-site/settings/access**
2. Click **Add people**
3. Search for `ccarvel` and select Cody's account
4. Set the role to **Write** (allows push; Warren retains Admin)
5. Click **Add ccarvel to this repository**

GitHub will send Cody an invitation email. Cody must accept it before push
access is active.

---

## Step 4 — Enable GitHub Pages on Warren's repo

1. Go to **https://github.com/<warren-username>/warren-jekyll-site/settings/pages**
2. Under **Source**, select **Deploy from a branch**
3. Branch: **gh-pages** / Folder: **/ (root)**
4. Click **Save**

The `gh-pages` branch is transferred with the repo, so the built site is
already there — Pages just needs to be switched on.

---

## Step 5 — Update `_config.yml`

The `url:` and `baseurl:` values are tied to the GitHub username. After the
transfer, Cody updates the local clone and pushes.

Open `_config.yml` and change:

```yaml
# Before
url: 'https://ccarvel.github.io'
baseurl: '/warren-jekyll-site'

# After
url: 'https://<warren-username>.github.io'
baseurl: '/warren-jekyll-site'
```

Also update `scholar.relative`:

```yaml
# Before
relative: "/warren-jekyll-site/bibliography.html"

# After (same path, no change needed unless repo is renamed)
relative: "/warren-jekyll-site/bibliography.html"
```

> If Warren renames the repository to something other than
> `warren-jekyll-site`, update `baseurl:` and `scholar.relative:` to match the
> new name.

---

## Step 6 — Update the local git remote

Cody runs this in the local repo to point to Warren's new URL:

```bash
git remote set-url origin https://github.com/<warren-username>/warren-jekyll-site
git remote -v   # confirm
```

---

## Step 7 — Commit the config change and deploy

```bash
git add _config.yml
git commit -m "fix(config): update url and baseurl for repo transfer to <warren-username>"
git push origin main
bundle exec rake ed:publish
```

The `ed:publish` command builds the site locally and force-pushes the built
output to the `gh-pages` branch. After the GitHub Pages action goes green
(visible at `github.com/<warren-username>/warren-jekyll-site/actions`), the
site will be live at:

```
https://<warren-username>.github.io/warren-jekyll-site/
```

---

## Step 8 — Verify

Check the following after deployment:

- [ ] Homepage loads at `https://<warren-username>.github.io/warren-jekyll-site/`
- [ ] Sidebar links (Home, Search, Writers) work
- [ ] Writer profile pages load with images
- [ ] Bibliography pages load
- [ ] Search returns results
- [ ] `robots.txt` is accessible at `.../warren-jekyll-site/robots.txt`

---

## Optional: custom domain

If Warren later wants the site at a custom domain (e.g., `unsettlingseas.org`):

1. Purchase the domain and add a CNAME DNS record pointing to
   `<warren-username>.github.io`
2. In GitHub Pages settings, enter the custom domain
3. In `_config.yml`, set `url: 'https://unsettlingseas.org'` and
   `baseurl: ''`
4. Rebuild and redeploy

---

## Summary of who does what

| Step | Who |
|------|-----|
| Initiate transfer | Cody (current owner) |
| Accept transfer | Warren |
| Add Cody as collaborator | Warren |
| Enable GitHub Pages | Warren |
| Update `_config.yml` + remote | Cody |
| Commit, push, deploy | Cody |
| Verify site | Both |
