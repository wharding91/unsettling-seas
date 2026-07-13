# Transferring the Repo to Warren's GitHub Account

This document covers how to transfer *Unsettling Seas* from
`github.com/ccarvel/warren-jekyll-site` to Warren's GitHub account,
optionally rename the repository, re-enable GitHub Pages and GitHub Actions,
update the site config, and add Cody as a collaborator.

**Placeholders used below:**
- `wharding91` — Warren's GitHub username
- `unsettling-seas` — the final repository name (see Step 0)

---

## Before the meeting — info to collect in advance

Gather these before you sit down with Warren. Decisions made at the keyboard
under time pressure lead to typos in config files and broken deploys.

| Item | Why you need it |
|---|---|
| Warren's GitHub username (exact, case-sensitive) | Used in every URL and git remote command |
| Final repository name | Determines the live URL; must be set before the first deploy |
| Warren's GitHub account email address | Confirms where the transfer invitation and collaborator invite will land |
| Warren's GitHub account type | Free accounts can receive transferred repos; confirm he has one |
| Custom domain intentions | If Warren wants `unsettlingseas.org` eventually, note it now — it affects how `baseurl` is set long-term |
| Warren available to click the transfer email in real time | Transfer is not complete until Warren accepts; plan for him to be at his inbox during Step 2 |

---

## Step 0 — Decide the repository name *(5 min)*

Before initiating the transfer, agree on the final repository name. The name
determines the live URL (`https://wharding91.github.io/unsettling-seas/`)
and must be reflected in several config files.

**Options:**

| Name | Live URL | Notes |
|---|---|---|
| `warren-jekyll-site` (current) | `https://ccarvel.github.io/warren-jekyll-site/` | No file changes beyond `url:` in `_config.yml` |
| `unsettling-seas` | `https://wharding91.github.io/unsettling-seas/` | Cleaner URL; requires file updates listed below |

GitHub allows renaming a repository at any point — before, during, or after
the transfer. If you rename before transfer, Cody does it from the current
repo settings. If you rename after transfer, Warren does it from his account.

> **Note:** GitHub automatically redirects the old URL to the new one for a
> period after a rename, but this redirect is not permanent. Update bookmarks
> and any external links once the new name is confirmed.

---

### Files that must be updated if the repo is renamed

If the repo name changes from `warren-jekyll-site` to anything else, update
these files **before pushing the first deploy** under the new name. A push to
`main` with a wrong `baseurl` will build and deploy a broken site.

**Critical — site breaks without these:**

| File | Field | Change to |
|---|---|---|
| `_config.yml` | `baseurl:` | `'/unsettling-seas'` |
| `_config.yml` | `scholar.relative:` | `'/unsettling-seas/bibliography.html'` |

**Documentation — update for accuracy (site still works without these):**

| File | What to change |
|---|---|
| `README.md` | Clone URL, Actions tab URL, local dev URL (`http://127.0.0.1:4000/unsettling-seas/`), htmlproofer `--swap-urls` flag |
| `MAINTENANCE.md` | GitHub repo URL in Section 2, folder name in Section 4, `baseurl` example in Section 5 |
| `APPS_AND_WORKFLOWS.md` | Local folder name references in Task A and Task B step-by-step workflows |

**No changes needed — these auto-update via Liquid at build time:**

| File / area | Why |
|---|---|
| `site.webmanifest` | Uses `{{ site.baseurl }}` — Jekyll substitutes the correct path |
| All `_includes/` and `_layouts/` | Use `{{ site.baseurl }}` or the `relative_url` filter |
| All `_writers/*.md` image paths | Rendered through the writer infobox include using `relative_url` |

---

## Step 1 — Transfer the repository *(5 min)*

Cody does this from the current repo settings.

1. Go to **https://github.com/ccarvel/warren-jekyll-site/settings**
2. Scroll to the bottom: **Danger Zone → Transfer repository**
3. Click **Transfer**
4. In the dialog, type `warren-jekyll-site` to confirm the current repo name
5. Enter Warren's GitHub username (`wharding91`) as the destination
6. Click **I understand, transfer this repository**

GitHub will send Warren an email with a link to **accept the transfer**.
Warren must click that link — the transfer is not complete until he accepts.

---

## Step 2 — Warren accepts the transfer *(2 min)*

Warren opens the email from GitHub and clicks **Accept transfer**. The repo now
lives at `github.com/wharding91/unsettling-seas`.

---

## Step 3 — Add Cody as a collaborator *(3 min)*

Warren does this so Cody can continue pushing updates directly.

1. Go to **https://github.com/wharding91/unsettling-seas/settings/access**
2. Click **Add people**
3. Search for `ccarvel` and select Cody's account
4. Set the role to **Write** (allows push; Warren retains Admin)
5. Click **Add ccarvel to this repository**

GitHub will send Cody an invitation email. Cody must accept it before push
access is active.

---

## Step 4 — Enable GitHub Actions and set workflow permissions *(5 min)*

GitHub sometimes disables Actions workflows on transferred repositories as a
safety measure. Warren must verify they are enabled and correctly permissioned
before the first deploy — **this step is the most common cause of a failed
first deploy after a transfer.**

1. Go to **https://github.com/wharding91/unsettling-seas/settings/actions**
2. Under **Actions permissions**, confirm **"Allow all actions and reusable workflows"** is selected
3. Under **Workflow permissions**, select **"Read and write permissions"**
4. Check **"Allow GitHub Actions to create and approve pull requests"** if it is not already checked
5. Click **Save**

> **Why "Read and write permissions" is required:** the deploy workflow
> (`.github/workflows/deploy.yml`) uses GitHub's built-in `GITHUB_TOKEN` to
> push the compiled site to the `gh-pages` branch. If the account default is
> read-only, the push will be rejected with a `403` or
> `remote: Permission to ... denied` error — even though
> `permissions: contents: write` is declared in the workflow file. The
> account-level setting must allow it.

> **Custom theme note:** this site uses a local copy of the Ed theme (not
> a gem from RubyGems), and `jekyll-scholar` is not on the GitHub Pages
> allowlist. For both reasons the site **cannot** use GitHub Pages' built-in
> Jekyll processing. The Actions workflow (`deploy.yml`) builds the site
> locally with Ruby 3.4 and `bundle exec jekyll build`, then pushes the
> pre-built `_site/` directory to the `gh-pages` branch. GitHub Pages then
> serves that static output directly (no re-processing). This is why Pages
> must be pointed at the `gh-pages` branch (Step 5), not at `main`.

---

## Step 5 — Enable GitHub Pages *(3 min)*

1. Go to **https://github.com/wharding91/unsettling-seas/settings/pages**
2. Under **Source**, select **"Deploy from a branch"**
   — not "GitHub Actions"; the workflow pushes to `gh-pages` and Pages serves
   that branch directly
3. Branch: **gh-pages** / Folder: **/ (root)**
4. Click **Save**

The `gh-pages` branch transfers with the repo and already contains the last
built site, so Pages will serve content immediately after this step.

---

## Step 6 — Update `_config.yml` *(5 min)*

`url:` always changes on transfer (tied to the GitHub username). `baseurl:`
and `scholar.relative:` only change if the repo is also being renamed.

Open `_config.yml` and update:

```yaml
# Always update url: on transfer
url: 'https://wharding91.github.io'

# Update baseurl: only if repo is renamed
baseurl: '/unsettling-seas'

# Under the scholar: block — update relative: only if repo is renamed
relative: "/unsettling-seas/bibliography.html"
```

**Example — transfer only, keeping the name `warren-jekyll-site`:**

```yaml
url: 'https://wharding91.github.io'
baseurl: '/warren-jekyll-site'                       # unchanged
# scholar.relative: "/warren-jekyll-site/bibliography.html"  # unchanged
```

**Example — transfer and rename to `unsettling-seas`:**

```yaml
url: 'https://wharding91.github.io'
baseurl: '/unsettling-seas'
# under scholar:
relative: "/unsettling-seas/bibliography.html"
```

If the repo name changed, also update the documentation files listed in the
**Step 0 file table** above.

---

## Step 7 — Update the local git remote *(2 min)*

Cody runs this in the local repo to point to Warren's new URL:

```bash
git remote set-url origin https://github.com/wharding91/unsettling-seas
git remote -v   # confirm
```

---

## Step 8 — Commit config changes and push *(5 min + 1–2 min for Actions to run)*

```bash
git add _config.yml
git commit -m "fix(config): update url and baseurl for transfer to wharding91/unsettling-seas"
git push origin main
```

Pushing to `main` automatically triggers the GitHub Actions deploy workflow.
Watch the deploy at `https://github.com/wharding91/unsettling-seas/actions`.
A green checkmark means the live site has updated (typically within 1–2 minutes).

The site will be live at:

```
https://wharding91.github.io/unsettling-seas/
```

---

## Step 9 — Verify *(5 min)*

- [ ] GitHub Actions run shows green at `https://github.com/wharding91/unsettling-seas/actions`
- [ ] Homepage loads at `https://wharding91.github.io/unsettling-seas/`
- [ ] Sidebar links (Home, Search, Writers) are not broken
- [ ] Writer profile pages load with images
- [ ] Bibliography pages render citations
- [ ] Search returns results
- [ ] `robots.txt` is accessible at `https://wharding91.github.io/unsettling-seas/robots.txt`

---

## Optional: custom domain

If Warren later wants the site at a custom domain (e.g., `unsettlingseas.org`):

1. Purchase the domain and add a `CNAME` DNS record pointing to `wharding91.github.io`
2. In GitHub Pages settings, enter the custom domain and enable "Enforce HTTPS"
3. In `_config.yml`, set `url: 'https://unsettlingseas.org'` and `baseurl: ''`
4. Push to `main` — Actions rebuilds and deploys automatically
5. With `baseurl: ''`, all `{{ site.baseurl }}` Liquid references produce clean root-relative URLs with no sub-path prefix

---

## Summary of who does what

| Step | Who | Est. time |
|---|---|---|
| Collect pre-meeting info | Cody + Warren (async) | Before meeting |
| Decide final repo name | Cody + Warren | 5 min |
| Rename repo before transfer (if desired) | Cody | 2 min |
| Initiate transfer | Cody (current owner) | 5 min |
| Accept transfer | Warren | 2 min |
| Rename repo after transfer (if not done before) | Warren | 2 min |
| Add Cody as collaborator | Warren | 3 min |
| Enable GitHub Actions + set workflow permissions | Warren | 5 min |
| Enable GitHub Pages (source: gh-pages branch) | Warren | 3 min |
| Update `_config.yml` | Cody | 5 min |
| Update documentation files (if repo renamed) | Cody | 10 min |
| Update local git remote | Cody | 2 min |
| Commit, push, watch Actions run | Cody | 5 min |
| Verify live site | Both | 5 min |
| **Total** | | **~45–55 min** |

---

## Appendix — Complete file edit reference

All edits required for the site to deploy correctly under Warren's ownership,
assuming the repo is renamed to `unsettling-seas` (adjust if using `unsettlingseas`
or keeping `warren-jekyll-site`).

### A. `_config.yml` — required, site breaks without these

```yaml
# Line 8 — was: url: 'https://ccarvel.github.io'
url: 'https://wharding91.github.io'

# Line 9 — was: baseurl: '/warren-jekyll-site'
baseurl: '/unsettling-seas'

# Line 91 — was: relative: "/warren-jekyll-site/bibliography.html"
relative: "/unsettling-seas/bibliography.html"
```

These three values are the only changes needed for the site to build and deploy
correctly. Everything else in `_config.yml` (title, description, collections,
scholar settings) stays as-is.

---

### B. `README.md` — documentation accuracy only, site still deploys without these

Four locations reference the old owner/repo name:

1. **Clone URL** (line ~115):
   ```
   # was:
   git clone https://github.com/ccarvel/warren-jekyll-site.git
   cd warren-jekyll-site

   # change to:
   git clone https://github.com/wharding91/unsettling-seas.git
   cd unsettling-seas
   ```

2. **Local dev server note** (line ~126):
   ```
   # was: "...overrides the /warren-jekyll-site prefix..."
   # change /warren-jekyll-site to /unsettling-seas in that sentence
   ```

3. **htmlproofer swap-urls flag** (line ~132):
   ```
   # was:
   bundle exec htmlproofer ./_site --disable-external --swap-urls '^/warren-jekyll-site/:/'

   # change to:
   bundle exec htmlproofer ./_site --disable-external --swap-urls '^/unsettling-seas/:/'
   ```

4. **Actions tab monitoring URL** (line ~407):
   ```
   # was: https://github.com/ccarvel/warren-jekyll-site/actions
   # change to: https://github.com/wharding91/unsettling-seas/actions
   ```

---

### C. `MAINTENANCE.md` — documentation accuracy only

Three locations:

1. **Section 2 — GitHub repo URL**: change `https://github.com/ccarvel/warren-jekyll-site` → `https://github.com/wharding91/unsettling-seas`
2. **Section 4 — local folder name**: change `warren-jekyll-site` → `unsettling-seas` wherever it appears as a folder path
3. **Section 5 — baseurl example**: change `/warren-jekyll-site` → `/unsettling-seas`

---

### D. `APPS_AND_WORKFLOWS.md` — documentation accuracy only

Two workflows (Task A and Task B) reference the local folder name and the GitHub repo URL:

- Change all instances of `warren-jekyll-site` (as a folder or URL segment) → `unsettling-seas`
- Change `github.com/ccarvel/` → `github.com/wharding91/`

---

### E. `.github/workflows/deploy.yml` — no changes needed

The workflow uses `GITHUB_TOKEN`, which is automatically scoped to whichever
account owns the repository. It requires no hardcoded usernames or repo names.
The only prerequisite is that Warren has enabled "Read and write permissions"
for workflow tokens (Step 4 above).

---

### F. Files that need no changes (auto-update via Liquid)

| File / area | Reason |
|---|---|
| `site.webmanifest` | Uses `{{ site.baseurl }}` |
| All `_includes/` and `_layouts/` | Use `{{ site.baseurl }}` or `relative_url` filter |
| `_writers/*.md` image paths | Go through the writer infobox include via `relative_url` |
| `_bibliography/` BibTeX files | No URL references |
| `_sass/`, `assets/` | No URL references |

---

### G. Summary: minimum viable edit set

To get the site live with zero broken links after transfer and rename:

1. Edit `_config.yml` — 3 field values (url, baseurl, scholar.relative)
2. Update git remote locally — 1 command
3. Commit and push — triggers Actions, site deploys automatically

Documentation files (README, MAINTENANCE, APPS_AND_WORKFLOWS) can be updated
in a follow-up commit and do not block the deploy.
