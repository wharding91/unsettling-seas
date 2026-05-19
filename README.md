# Unsettling Seas

**Caribbean Women's and Feminist Creative Writing, 1989–2001**

Bibliographic resources for Caribbean women's and feminist creative writing, 1989–2001. Built with [Ed](https://minicomp.github.io/ed/) by Alex Gil, updated for modern Jekyll and Ruby.

## About the project

*Unsettling Seas* is a bibliographic digital humanities project that documents the creative and critical output of Caribbean women writers across the period 1989–2001. Employing the principles of minimal computing, the site currently catalogs the works of seven writers — Opal Palmer Adisa, Dionne Brand, Georgina Herrera, Nancy Morejón, M. NourbeSe Philip, Soleida Ríos, and Évelyne Trouillot — and will expand to at least one hundred (100) writers. Each writer receives a profile page and per-category bibliography pages rendered from BibTeX source files via Jekyll Scholar that center the writers' works. This digital humanities project seeks to extend a digital forum for the public, librarians, creative writers, scholars, archivists, students, and technologists to study how creative and critical writing were central in gender justice movements across Caribbean spaces (regionally and diasporically). The project is currently edited by Warren Harding.

## Tech stack

| Component | Version |
|---|---|
| Ruby | `~> 3.4.0` (tested: 3.4.4) |
| Jekyll | `~> 4.4.0` (locked: 4.4.1) |
| Theme | `ed.` 2.0.0 — local gemspec, forked from [minicomp/ed](https://minicomp.github.io/ed/) |
| Jekyll Scholar | 7.2.0 — bibliography rendering (Chicago fullnote style) |
| html-proofer | 5.0.10 — link/markup validation |
| webrick | 1.9.1 — local dev server |
| Markdown | kramdown + kramdown-parser-gfm |
| Search | elasticlunr.js (client-side, no server required) |

`jekyll-scholar` is not on the GitHub Pages gem allowlist. Deployment uses a GitHub Actions workflow that builds the site on GitHub's runners and pushes the compiled output to `gh-pages` (see [Build & deployment](#build--deployment)).

## Repository structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml      # Automated build + gh-pages deploy on push to main
├── _bibliography/          # BibTeX source files for Jekyll Scholar
│   ├── adisa/              #   Per-writer subdirs (books.bib, articles.bib)
│   ├── brand/
│   ├── herrera/
│   ├── morejon/
│   ├── philip/
│   ├── rios/
│   └── trouillot/
├── _includes/
│   ├── head.html           # <head>: Dublin Core, Open Graph, favicon links, CSS/RSS
│   ├── sidebar.html        # Toggleable nav sidebar (auto-sorted by sort_name)
│   └── writer-infobox.html # Writer profile infobox, driven by front matter
├── _layouts/
│   ├── default.html        # Base layout: sidebar + masthead + content
│   ├── page.html           # Standard page (extends default)
│   ├── writer.html         # Writer profile layout: infobox + bio
│   ├── bibliography.html   # Single Scholar entry with annotation/PDF link
│   ├── poem.html           # Ed literary genre layouts (available, not yet in use)
│   ├── narrative.html
│   ├── drama.html
│   └── post.html
├── _sass/
│   ├── _ed.scss            # Ed theme styles
│   └── _syntax.scss        # Code/pre syntax highlighting
├── _texts/                 # Jekyll collection: bibliography listing pages
│   ├── adisa/              #   books.md, articles.md (render per-writer bib)
│   ├── brand/
│   ├── herrera/
│   ├── morejon/
│   ├── philip/
│   ├── rios/
│   └── trouillot/
├── _writers/               # Jekyll collection: writer profile pages
│   ├── adisa.md
│   ├── brand.md
│   ├── herrera.md
│   ├── morejon.md
│   ├── philip.md
│   ├── rios.md
│   └── trouillot.md
├── assets/
│   ├── css/style.scss      # Main stylesheet entry point
│   ├── js/                 # elasticlunr.min.js, search.js
│   ├── favicon.ico         # Multi-size favicon (16×16, 32×32)
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon-48x48.png
│   ├── favicon-512.png
│   ├── apple-touch-icon.png          # 180×180 iOS home screen icon
│   ├── android-chrome-192x192.png    # PWA manifest icons
│   ├── android-chrome-512x512.png
│   └── [writer portrait .jpg/.jpeg files]
├── _config.yml             # Site configuration
├── ed..gemspec             # Local theme gem specification
├── Gemfile / Gemfile.lock  # Ruby dependency manifest
├── Rakefile                # `rake ed:publish` — manual build-and-push fallback
├── site.webmanifest        # PWA web manifest (Liquid-templated for baseurl)
├── index.html              # Homepage: writer list + About section
├── search.html             # Client-side search page
├── atom.xml                # RSS feed
├── zot-to-jekyll.rb        # Utility: normalizes Zotero-exported BibTeX keys/PDFs
├── scripts/
│   └── update_relay_state.py  # CLI helper for AI agent handoff state
├── MAINTENANCE.md          # Non-technical content-update guide (5 sections)
├── APPS_AND_WORKFLOWS.md   # macOS app setup guide for non-technical editors
├── TRANSFER.md             # Step-by-step repo transfer guide (ccarvel → Warren)
├── AI_CONTEXT.md           # AI agent context (repo overview, commands, conventions)
├── AI_WORK_LOG.md          # Append-only AI session log
├── ai_status.json          # Machine-readable current focus and next step
└── LICENSE.md              # MIT (Ed theme)
```

## Local development

### Prerequisites

- Ruby `~> 3.4.0` (use [rbenv](https://github.com/rbenv/rbenv) or [mise](https://mise.jdx.dev/))
- Bundler (`gem install bundler`)

### Setup

```bash
git clone https://github.com/ccarvel/warren-jekyll-site.git
cd warren-jekyll-site
bundle install
```

### Serve locally

```bash
bundle exec jekyll serve --baseurl ""
```

The site is available at `http://127.0.0.1:4000/`. The `--baseurl ""` flag overrides the `/warren-jekyll-site` prefix used on the live site — without it, WEBrick 404s on the root URL instead of serving the homepage.

To validate links and markup after a build:

```bash
bundle exec jekyll build
bundle exec htmlproofer ./_site --disable-external --swap-urls '^/warren-jekyll-site/:/'
```

The `--swap-urls` option lets html-proofer resolve links that include the GitHub Pages `baseurl` while checking the local `_site/` directory. Remove `--disable-external` when you intentionally want to check outbound links too.

## Content authoring

### Writer profiles (`_writers/`)

Each writer gets one Markdown file. Use `layout: writer` for author pages. Dionne Brand's page (`_writers/brand.md`) is the current prototype.

Minimum front matter:

```yaml
---
layout: writer
title: "Writer Name"
writer_id: writer-slug
sort_name: "Last, First Middle"
---
```

`writer_id` must match the folder names under `_texts/` and `_bibliography/`. For example, `writer_id: brand` pulls bibliography category links from `_texts/brand/` into the profile infobox. `sort_name` controls writer ordering in the sidebar — use last-name-first format.

Optional infobox front matter:

```yaml
image: /assets/example-writer.jpg
image_alt: "Writer Name"
image_credit: "Photographer or publication"
image_credit_url: "https://example.org/source"
born: "1 January 1950"
nationality: "Country or regional identity"
forms:
  - Poetry
  - Fiction
major_works:
  - First Selected Work
  - Second Selected Work
themes:
  - Migration
  - Memory
```

Only add fields that are verified. Empty or absent optional fields are omitted from the infobox automatically.

The file body should contain the writer's narrative biography and any critical framing in Markdown. Do not add the old "Works by Category" Liquid loop manually; `_layouts/writer.html` generates bibliography category links from `writer_id` and displays them in the top infobox.

### Bibliography pages (`_texts/<writer>/`)

Each page renders one BibTeX file through Jekyll Scholar. Front matter:

```yaml
---
layout: page
title: Books
author: Opal Palmer Adisa
editor: Warren Harding
---
```

Body (one line):

```liquid
{% bibliography --file adisa/books %}
```

The `author` and `editor` fields populate Dublin Core `<meta>` tags in `_includes/head.html`.

### BibTeX files (`_bibliography/<writer>/`)

Bibliography source files live in per-writer subdirectories. Keys follow the pattern `author_shorttitle_year` (e.g., `adisa_traveling_1989`). Supported entry-level fields beyond standard BibTeX:

- `annote` — displayed as an annotation note below the citation
- `file` — path to a PDF in `archive/`; rendered as a "PDF" link

To normalize a Zotero export before adding entries, update `bib_file` in `zot-to-jekyll.rb` and run:

```bash
bundle exec ruby zot-to-jekyll.rb
```

## Search

### How it works

Search is powered by [elasticlunr.js](http://elasticlunr.com/), a lightweight client-side JavaScript library. There is no server-side component — the entire search index is built at Jekyll build time and shipped to the browser as a JavaScript file.

`assets/js/search.js` has `---` front matter, which makes it a Liquid template. During the build, Jekyll processes it, looping over the `site.texts` collection and serializing every document into an elasticlunr index. The browser downloads the pre-built index and runs all queries locally.

### What is searchable

**Searched:** everything in the `_texts/` collection — the bibliography listing pages. For each page, four fields are indexed:

| Field | What it contains |
|---|---|
| `title` | The page title from front matter (e.g., "Books", "Articles") |
| `author` | The writer's full name from front matter (e.g., "Nancy Morejón") |
| `layout` | The page layout name (e.g., "page") — rarely useful for querying |
| `content` | The full rendered, HTML-stripped text of the page — this includes all formatted citation text produced by the `{% bibliography %}` tag, so book titles, publisher names, years, and any `annote` annotation text are all searchable |

**Not searched:** writer profile pages (`_writers/`), the homepage, or any page outside the `_texts/` collection. Biographical text, themes, and writer infobox data are not in the search index.

### What happens automatically

Every time a `.bib` file is updated and pushed, the next GitHub Actions build re-generates the index automatically. No manual step is needed — the Liquid template re-runs on every build.

Similarly, adding a new writer (new `_texts/<writer>/books.md` + `_bibliography/<writer>/books.bib`) automatically adds that writer's bibliography to the search index on the next build.

### Extending search to writer profiles

To make writer biographical text searchable, `assets/js/search.js` would need a second loop over `site.writers`. The relevant block currently reads:

```liquid
{% for text in site.texts %}
index.addDoc({
  title: {{text.title | jsonify}},
  author: {{text.author | jsonify}},
  layout: {{text.layout | jsonify}},
  content: {{text.content | jsonify | strip_html}},
  id: {{count}}
});{% endfor %}
```

To also index writer profiles, duplicate that block replacing `site.texts` with `site.writers` and increment `count` across both loops. This is a developer change to `assets/js/search.js` — it does not require changes to any content files.

### Known issue — jQuery dependency

`search.html` loads jQuery 1.11.3 from Google's CDN. This version is over a decade old. It is listed in `TODO.md` for replacement with either a current locally-bundled version or vanilla JavaScript.

## Adding a new author

Adding an author requires four source pieces: a writer profile page, two bibliography listing pages, and two BibTeX source files. Add a portrait image when a verified image and credit are available. The steps below use `herrera` as an example slug — replace it with the new author's lowercase last name (no spaces, no accent marks).

### 1. Create the BibTeX source files

```
_bibliography/herrera/books.bib
_bibliography/herrera/articles.bib
```

Each file is a standard BibTeX file. Keys follow the pattern `lastname_shorttitle_year`:

```bibtex
@book{herrera_gatos_1995,
  title     = {Gatos y liebres, o, Book of Heroes},
  author    = {Herrera, Georgina},
  year      = {1995},
  publisher = {Ediciones Unión},
  address   = {Havana},
  annote    = {Optional annotation displayed below the citation.},
}
```

Two extra fields are supported: `annote` (displayed as a note below the citation) and `file` (path to a PDF in `archive/`, rendered as a download link). All other standard BibTeX fields work normally. If you're exporting from Zotero, update `bib_file` in `zot-to-jekyll.rb` and run `bundle exec ruby zot-to-jekyll.rb` to normalize keys before saving.

### 2. Create the bibliography listing pages

```
_texts/herrera/books.md
_texts/herrera/articles.md
```

Each page has the same structure — just swap `title` and the `--file` argument:

**`_texts/herrera/books.md`**
```yaml
---
layout: page
title: Books
author: Georgina Herrera
editor: Warren Harding
---

{% bibliography --file herrera/books %}
```

**`_texts/herrera/articles.md`**
```yaml
---
layout: page
title: Articles
author: Georgina Herrera
editor: Warren Harding
---

{% bibliography --file herrera/articles %}
```

### 3. Create the writer profile page

```
_writers/herrera.md
```

```markdown
---
layout: writer
title: "Georgina Herrera"
writer_id: herrera
sort_name: "Herrera, Georgina"
image: /assets/herrera.jpg
image_alt: "Georgina Herrera"
image_credit: "Source name"
image_credit_url: "https://example.org/source"
born: "23 April 1936"
nationality: "Cuban"
forms:
  - Poetry
major_works:
  - Gatos y liebres, o, Book of Heroes
themes:
  - Memory
  - Black Cuban writing
---

Georgina Herrera (born 1936) is a Cuban poet...

## Literary Significance

Add a short critical overview of the writer's themes, forms, and relevance to the project.
```

The `writer` layout auto-links to any `_texts/herrera/` pages in the profile infobox — no manual list maintenance is needed as categories are added. If the portrait image or any fact (birth date, nationality, major works) is not verified, omit that field until it is confirmed.

### 4. Add the portrait image, if available

Put writer portraits in `assets/` and reference them with a root-relative path in the writer front matter:

```yaml
image: /assets/herrera.jpg
```

Use descriptive `image_alt` text. Use `https://` for image-credit URLs when the source supports it.

### 5. Verify locally

```bash
bundle exec jekyll build
bundle exec jekyll serve --baseurl ""
```

Navigate to `http://127.0.0.1:4000/writers/herrera/` and confirm the bibliography links render. If a BibTeX file is empty or missing, Jekyll Scholar outputs a blank page without erroring — double-check the `--file` path matches the actual filename.

### File checklist

```
_bibliography/herrera/books.bib      ← BibTeX source
_bibliography/herrera/articles.bib   ← BibTeX source
_texts/herrera/books.md              ← bibliography listing page
_texts/herrera/articles.md           ← bibliography listing page
_writers/herrera.md                  ← writer profile page
assets/herrera.jpg                   ← optional portrait image
```

## Build & deployment

**Why a custom deploy pipeline is needed:** `jekyll-scholar` (the bibliography plugin) is not on the GitHub Pages gem allowlist. GitHub's standard Pages build would silently ignore it. The solution — used by both deployment paths below — is to build the site externally and push only the compiled `_site/` output to the `gh-pages` branch. GitHub Pages then serves that pre-built content directly without running Jekyll again.

### Automated deployment — GitHub Actions (primary)

**File:** `.github/workflows/deploy.yml`

Every push to `main` triggers this workflow automatically on GitHub's runners. You never need to run a local build command for a routine update — edit a file, commit, push, and the site is live within 1–2 minutes.

**What the workflow does, step by step:**

| Step | Action |
|---|---|
| `actions/checkout@v4` | Checks out the `main` branch source onto the runner |
| `ruby/setup-ruby@v1` | Installs Ruby 3.4 and restores the full gem bundle from cache (speeds up subsequent runs) |
| `bundle exec jekyll build` | Compiles the site into `_site/` with `JEKYLL_ENV=production` |
| `touch _site/.nojekyll` | Writes an empty `.nojekyll` marker — tells GitHub Pages not to re-run Jekyll on the pre-built output (Jekyll excludes dotfiles from `_site/` by default, so this must be an explicit step) |
| `peaceiris/actions-gh-pages@v3` | Opens a temp workspace, commits the `_site/` contents as a single orphan commit, and force-pushes it to the `gh-pages` branch using `GITHUB_TOKEN` — no credentials or SSH keys required |

**Monitoring a deploy:** open the **Actions** tab at `https://github.com/ccarvel/warren-jekyll-site/actions`. A spinning circle means in progress; a green checkmark means the live site has updated; a red X means the build failed — click the run to read the error log.

**Workflow file annotated:**

```yaml
name: Build and Deploy to GitHub Pages

on:
  push:
    branches:
      - main          # fires on every push to main; no other branches trigger it

permissions:
  contents: write     # allows GITHUB_TOKEN to push to gh-pages

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout source
        uses: actions/checkout@v4

      - name: Set up Ruby and cached gems
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.4'
          bundler-cache: true   # reads Gemfile.lock; restores gem cache across runs

      - name: Build site with Jekyll
        run: bundle exec jekyll build
        env:
          JEKYLL_ENV: production

      - name: Add .nojekyll marker
        run: touch _site/.nojekyll

      - name: Deploy to gh-pages branch
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
          force_orphan: true    # each deploy is a single fresh commit; keeps gh-pages history clean
```

### Manual fallback — Rake task

**File:** `Rakefile` — task `ed:publish`

Use this when the Actions workflow is unavailable (e.g., GitHub outage, Node.js deprecation break before the workflow is updated) or when you need to force a deploy from a specific local state that hasn't been pushed to `main` yet.

**Prerequisites:** a working local Ruby 3.4 environment with `bundle install` already run.

```bash
bundle exec rake ed:publish
```

**What the Rake task does, step by step:**

1. Sets `JEKYLL_ENV=production` (matches the Actions workflow environment)
2. Runs `Jekyll::Site.new(...).process` — equivalent to `bundle exec jekyll build`
3. Writes `_site/.nojekyll` — same `.nojekyll` marker the Actions workflow adds explicitly
4. Captures the `origin` remote URL from the local git config
5. Creates a temporary directory, copies all of `_site/` into it
6. Inits a fresh git repo in that temp directory, commits all files, adds `origin` as the remote, and force-pushes to `gh-pages` — then the temp directory is deleted automatically

The push authenticates using your local git credential store (same as any `git push`). The result on `gh-pages` is identical to what the Actions workflow produces.

**When not to use it:** do not run `rake ed:publish` for routine updates — push to `main` instead and let Actions handle it. Using both paths for the same commit creates redundant deploys and can cause a race condition if Actions fires at the same time.

### Node.js deprecation in the deploy workflow

The `peaceiris/actions-gh-pages@v3` action currently used in `.github/workflows/deploy.yml` runs on Node.js 20. GitHub is retiring Node.js 20 from Actions runners on a fixed schedule:

| Date | Event |
|---|---|
| **June 2, 2026** | Node.js 24 becomes the default; deprecation warnings turn into forced upgrades |
| **September 16, 2026** | Node.js 20 removed from runners; the action will stop working |

**How to fix it before the deadline.** Open `.github/workflows/deploy.yml` and swap the last deploy step:

```yaml
# Remove this block:
- name: Deploy to gh-pages branch
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./_site
    force_orphan: true

# Replace with this block:
- name: Deploy to gh-pages branch
  uses: JamesIves/github-pages-deploy-action@v4
  with:
    folder: _site
    branch: gh-pages
    single-commit: true
```

`JamesIves/github-pages-deploy-action` is actively maintained and Node.js 24-compatible. `single-commit: true` preserves the clean single-commit `gh-pages` history that `force_orphan: true` produced. No other workflow changes are needed — commit and push; the new action will be used on the next run.

## Project documentation

Three non-technical guides live at the repo root and are excluded from the Jekyll build:

| File | Audience | Contents |
|---|---|---|
| [`MAINTENANCE.md`](MAINTENANCE.md) | Non-technical content editors | Directory map (safe vs. system files), step-by-step bio editing via GitHub web UI, adding an 8th writer, Zotero export guide, local preview setup, troubleshooting |
| [`APPS_AND_WORKFLOWS.md`](APPS_AND_WORKFLOWS.md) | Non-technical macOS users taking over the site | Three setup pathways (MacDown/GitHub Desktop → VS Code/GitHub Desktop → VS Code only), VS Code extension checklist, click-by-click task workflows, macOS Smart Quotes and hidden-extension warnings |
| [`TRANSFER.md`](TRANSFER.md) | Cody + Warren | Step-by-step checklist for transferring the repository from `ccarvel` to Warren's GitHub account, choosing the final repo name, updating all affected config and docs files, enabling Actions permissions, re-enabling Pages, and verifying the live site |

## Data & assets

There is no `_data/` directory. All structured data lives in BibTeX files under `_bibliography/`.

Static assets:

- Writer portrait images are stored in `assets/` (`.jpg`, `.jpeg`) and referenced from writer page front matter
- `assets/favicon.ico` and companion PNG sizes — full favicon set for all browsers and platforms
- `site.webmanifest` — PWA web manifest; Liquid-templated so `baseurl` paths update automatically on repo transfer
- `assets/banner_digital-scholarship.png` — institutional banner (currently commented out in sidebar)
- `assets/open-graph-logo.png` — Open Graph / social sharing image
- No external CDN dependencies except a jQuery 1.11.3 script tag in `search.html`

## AI agent handoff

This repo uses a lightweight multi-agent handoff system to preserve context across AI sessions. Three files at the repo root carry the state:

| File | Purpose |
|---|---|
| `AI_CONTEXT.md` | Repo overview, commands, collection schemas, BibTeX conventions — read first |
| `AI_WORK_LOG.md` | Append-only log of what each session did and decided |
| `ai_status.json` | Current focus, exact next step, blockers, current git SHA |

`scripts/update_relay_state.py` manages these files from the command line. It requires Python 3 and no external dependencies. It is also available globally as `update_relay_state` if the [relay skills](https://github.com/ccarvel/agent-relay) `install.sh` has been run.

```bash
# Print current state
update_relay_state --show

# Refresh git state in ai_status.json
update_relay_state --status --tool "Claude Code"

# Set the next step
update_relay_state --next-step "Add Herrera writer profile" --tool "Claude Code"

# Append a session note to AI_WORK_LOG.md
update_relay_state --log --summary "Fixed duplicate permalink key" --tool "Claude Code"

# Refresh state and append log in one call (typical end-of-session)
update_relay_state --status --log --summary "<what you did>" --tool "<agent>" --next-step "<next>"

# Invoke as a repo-local script if not on PATH
python scripts/update_relay_state.py --show
```

At the end of any AI session, run `--status --log --summary "..." --next-step "..."` to leave a clean handoff for the next agent or collaborator.

## Contributing

Open an issue or pull request on [GitHub](https://github.com/ccarvel/warren-jekyll-site). For bibliography additions, follow the BibTeX key convention and per-writer file structure described above.

## License

MIT — see [`LICENSE.md`](LICENSE.md). Copyright 2016 Alex Gil (Ed theme); incorporated Mark Otto (Poole/Lanyon). The license covers theme code; no license statement currently covers the bibliography data or project content.
