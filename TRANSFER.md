# Transferring the Repo to Warren's GitHub Account

This document covers how to transfer *Unsettling Seas* from
`github.com/ccarvel/warren-jekyll-site` to Warren's GitHub account,
optionally rename the repository, re-enable GitHub Pages and GitHub Actions,
update the site config, and add Cody as a collaborator.

**Placeholders used below:**
- `<warren-username>` — Warren's GitHub username
- `<repo-name>` — the final repository name (see Step 0)

---

## Step 0 — Decide the repository name

Before initiating the transfer, agree on the final repository name. The name
determines the live URL (`https://<warren-username>.github.io/<repo-name>/`)
and must be reflected in several config files.

**Options:**

| Name | Live URL | Notes |
|---|---|---|
| `warren-jekyll-site` (current) | `https://<warren-username>.github.io/warren-jekyll-site/` | No file changes beyond `url:` in `_config.yml` |
| `unsettling-seas` | `https://<warren-username>.github.io/unsettling-seas/` | Cleaner URL; requires file updates listed below |
| `unsettling-seas-bibliography` | `https://<warren-username>.github.io/unsettling-seas-bibliography/` | Descriptive; same file updates |

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
| `_config.yml` | `baseurl:` | `'/<repo-name>'` |
| `_config.yml` | `scholar.relative:` | `'/<repo-name>/bibliography.html'` |

**Documentation — update for accuracy (site still works without these):**

| File | What to change |
|---|---|
| `README.md` | Clone URL, Actions tab URL, local dev URL (`http://127.0.0.1:4000/<repo-name>/`), htmlproofer `--swap-urls` flag |
| `MAINTENANCE.md` | GitHub repo URL in Section 2, folder name in Section 4, `baseurl` example in Section 5 |
| `APPS_AND_WORKFLOWS.md` | Local folder name references in Task A and Task B step-by-step workflows |

**No changes needed — these auto-update via Liquid at build time:**

| File / area | Why |
|---|---|
| `site.webmanifest` | Uses `{{ site.baseurl }}` — Jekyll substitutes the correct path |
| All `_includes/` and `_layouts/` | Use `{{ site.baseurl }}` or the `relative_url` filter |
| All `_writers/*.md` image paths | Rendered through the writer infobox include using `relative_url` |

---

## Step 1 — Transfer the repository

Cody does this from the current repo settings.

1. Go to **https://github.com/ccarvel/warren-jekyll-site/settings**
2. Scroll to the bottom: **Danger Zone → Transfer repository**
3. Click **Transfer**
4. In the dialog, type `warren-jekyll-site` to confirm the current repo name
5. Enter Warren's GitHub username (`<warren-username>`) as the destination
6. Click **I understand, transfer this repository**

GitHub will send Warren an email with a link to **accept the transfer**.
Warren must click that link — the transfer is not complete until he accepts.

---

## Step 2 — Warren accepts the transfer

Warren opens the email from GitHub and clicks **Accept transfer**. The repo now
lives at `github.com/<warren-username>/<repo-name>`.

---

## Step 3 — Add Cody as a collaborator

Warren does this so Cody can continue pushing updates directly.

1. Go to **https://github.com/<warren-username>/<repo-name>/settings/access**
2. Click **Add people**
3. Search for `ccarvel` and select Cody's account
4. Set the role to **Write** (allows push; Warren retains Admin)
5. Click **Add ccarvel to this repository**

GitHub will send Cody an invitation email. Cody must accept it before push
access is active.

---

## Step 4 — Enable GitHub Actions and set workflow permissions

GitHub sometimes disables Actions workflows on transferred repositories as a
safety measure. Warren must verify they are enabled and correctly permissioned
before the first deploy — **this step is the most common cause of a failed
first deploy after a transfer.**

1. Go to **https://github.com/<warren-username>/<repo-name>/settings/actions**
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

---

## Step 5 — Enable GitHub Pages

1. Go to **https://github.com/<warren-username>/<repo-name>/settings/pages**
2. Under **Source**, select **"Deploy from a branch"**
   — not "GitHub Actions"; the workflow pushes to `gh-pages` and Pages serves
   that branch directly
3. Branch: **gh-pages** / Folder: **/ (root)**
4. Click **Save**

The `gh-pages` branch transfers with the repo and already contains the last
built site, so Pages will serve content immediately after this step.

---

## Step 6 — Update `_config.yml`

`url:` always changes on transfer (tied to the GitHub username). `baseurl:`
and `scholar.relative:` only change if the repo is also being renamed.

Open `_config.yml` and update:

```yaml
# Always update url: on transfer
url: 'https://<warren-username>.github.io'

# Update baseurl: only if repo is renamed
baseurl: '/<repo-name>'

# Under the scholar: block — update relative: only if repo is renamed
relative: "/<repo-name>/bibliography.html"
```

**Example — transfer only, keeping the name `warren-jekyll-site`:**

```yaml
url: 'https://<warren-username>.github.io'
baseurl: '/warren-jekyll-site'                       # unchanged
# scholar.relative: "/warren-jekyll-site/bibliography.html"  # unchanged
```

**Example — transfer and rename to `unsettling-seas`:**

```yaml
url: 'https://<warren-username>.github.io'
baseurl: '/unsettling-seas'
# under scholar:
relative: "/unsettling-seas/bibliography.html"
```

If the repo name changed, also update the documentation files listed in the
**Step 0 file table** above.

---

## Step 7 — Update the local git remote

Cody runs this in the local repo to point to Warren's new URL:

```bash
git remote set-url origin https://github.com/<warren-username>/<repo-name>
git remote -v   # confirm
```

---

## Step 8 — Commit config changes and push

```bash
git add _config.yml
git commit -m "fix(config): update url and baseurl for transfer to <warren-username>/<repo-name>"
git push origin main
```

Pushing to `main` automatically triggers the GitHub Actions deploy workflow.
Watch the deploy at `https://github.com/<warren-username>/<repo-name>/actions`.
A green checkmark means the live site has updated (typically within 1–2 minutes).

The site will be live at:

```
https://<warren-username>.github.io/<repo-name>/
```

---

## Step 9 — Verify

- [ ] GitHub Actions run shows green at `https://github.com/<warren-username>/<repo-name>/actions`
- [ ] Homepage loads at `https://<warren-username>.github.io/<repo-name>/`
- [ ] Sidebar links (Home, Search, Writers) are not broken
- [ ] Writer profile pages load with images
- [ ] Bibliography pages render citations
- [ ] Search returns results
- [ ] `robots.txt` is accessible at `https://<warren-username>.github.io/<repo-name>/robots.txt`

---

## Optional: custom domain

If Warren later wants the site at a custom domain (e.g., `unsettlingseas.org`):

1. Purchase the domain and add a `CNAME` DNS record pointing to `<warren-username>.github.io`
2. In GitHub Pages settings, enter the custom domain and enable "Enforce HTTPS"
3. In `_config.yml`, set `url: 'https://unsettlingseas.org'` and `baseurl: ''`
4. Push to `main` — Actions rebuilds and deploys automatically
5. With `baseurl: ''`, all `{{ site.baseurl }}` Liquid references produce clean root-relative URLs with no sub-path prefix

---

## Summary of who does what

| Step | Who |
|---|---|
| Decide final repo name | Cody + Warren |
| Rename repo before transfer (if desired) | Cody |
| Initiate transfer | Cody (current owner) |
| Accept transfer | Warren |
| Rename repo after transfer (if not done before) | Warren |
| Add Cody as collaborator | Warren |
| Enable GitHub Actions + set workflow permissions | Warren |
| Enable GitHub Pages (source: gh-pages branch) | Warren |
| Update `_config.yml` | Cody |
| Update documentation files (if repo renamed) | Cody |
| Update local git remote | Cody |
| Commit, push, watch Actions run | Cody |
| Verify live site | Both |
