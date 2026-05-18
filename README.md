# Unsettling Seas

**Caribbean Women's and Feminist Creative Writing, 1989–2001**

Bibliographic resources for Caribbean women's and feminist creative writing, 1989–2001. Built with [Ed](https://minicomp.github.io/ed/) by Alex Gil, updated for modern Jekyll and Ruby.

## About the project

*Unsettling Seas* is a bibliographic-generated digital humanities project that documents the creative and critical output of Caribbean women writers across the period 1989-2001. Employing the principles of minimal computing, the site currently catalogs the works of Opal Palmer Adisa, Dionne Brand, and five additional writers currently in development (Georgina Herrera, Nancy Morejón, M. NourbeSe Philip, Soleida Ríos, and Évelyne Trouillot) and will expand to at least one-hundred (100) writers. Each writer receives a profile page and per-category bibliography pages rendered from BibTeX source files via Jekyll Scholar that center the writers’ works. This digital humanities project seeks to extend a digital forum for the public, librarians, creative writers, scholars, archivists, students, and technologists to study how creative and critical writing were central in gender justice movements across Caribbean spaces (regionally and diasporically). The project is currently being edited by Warren Harding.

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

Not on the GitHub Pages allowlist: `jekyll-scholar` requires local build or a custom deploy step (see [Build & deployment](#build--deployment)).

## Repository structure

```
.
├── _bibliography/          # BibTeX source files for Jekyll Scholar
│   ├── adisa/              #   Per-writer bib files (books.bib, articles.bib)
│   ├── brand/
│   ├── articles.bib        #   Legacy combined bibliography files
│   ├── books.bib
│   ├── chapters.bib
│   └── lectures.bib
├── _includes/
│   ├── head.html           # <head>: Dublin Core, Open Graph, CSS/RSS links
│   ├── sidebar.html        # Toggleable nav sidebar
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
│   └── brand/
├── _writers/               # Jekyll collection: writer profile pages
│   ├── adisa.md
│   └── brand.md
├── assets/
│   ├── css/style.scss      # Main stylesheet entry point
│   └── js/                 # elasticlunr.min.js, search.js
├── _config.yml             # Site configuration
├── ed..gemspec             # Local theme gem specification
├── Gemfile / Gemfile.lock  # Ruby dependency manifest
├── Rakefile                # `rake ed:publish` — build and push to gh-pages
├── index.html              # Homepage: writer list + About section
├── search.html             # Client-side search page
├── atom.xml                # RSS feed
├── zot-to-jekyll.rb        # Utility: normalizes Zotero-exported BibTeX keys/PDFs
├── scripts/
│   └── update_relay_state.py  # CLI helper for AI agent handoff state
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
git clone https://github.com/ccarvel/jekyll-site-theme.git
cd jekyll-site-theme
bundle install
```

### Serve locally

```bash
bundle exec jekyll serve
```

The site is available at `http://127.0.0.1:4000/warren-jekyll-site/`.

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

`writer_id` must match the matching folder names under `_texts/` and `_bibliography/`. For example, `writer_id: brand` pulls bibliography category links from `_texts/brand/` into the profile infobox. `sort_name` controls writer ordering in the sidebar, so use last-name-first format.

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

Each page renders one BibTeX file through Jekyll Scholar. Front-matter:

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

## Adding a new author

Adding an author requires four source pieces: a writer profile page, two bibliography listing pages, and two BibTeX source files. Add a portrait image when a verified image and credit are available. The steps below use `herrera` as an example slug — replace it with the new author's lowercase last name.

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
image: /assets/georgina-herrera.jpg
image_alt: "Georgina Herrera"
image_credit: "Source name"
image_credit_url: "https://example.org/source"
born: "1936"
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

The `writer` layout auto-links to any `_texts/herrera/` pages in the profile infobox, so no manual list maintenance is needed as categories are added. If the portrait image or a fact such as birth date, nationality, or major works is not verified, omit that field until it is confirmed.

### 4. Add the portrait image, if available

Put writer portraits in `assets/` and reference them with a root-relative path in the writer front matter:

```yaml
image: /assets/georgina-herrera.jpg
```

Use descriptive `image_alt` text. Use `https://` for image-credit URLs when the source supports it.

### 5. Verify locally

```bash
bundle exec jekyll build
bundle exec jekyll serve
```

Navigate to the writer's profile page at `http://127.0.0.1:4000/warren-jekyll-site/writers/herrera/` and confirm the bibliography links render. If a BibTeX file is empty or missing, Jekyll Scholar will output a blank page without erroring — double-check the `--file` path matches the actual filename.

### File checklist

```
_bibliography/herrera/books.bib      ← BibTeX source
_bibliography/herrera/articles.bib   ← BibTeX source
_texts/herrera/books.md              ← bibliography listing page
_texts/herrera/articles.md           ← bibliography listing page
_writers/herrera.md                  ← writer profile page
assets/georgina-herrera.jpg          ← optional portrait image
```

## Build & deployment

There is no GitHub Actions workflow. Deployment uses a Rake task that builds the site locally and force-pushes the compiled `_site/` directory to the `gh-pages` branch on `origin`:

```bash
bundle exec rake ed:publish
```

Pushing to `main` updates the source code but does not update the live GitHub Pages site. After committing and pushing source changes, run `bundle exec rake ed:publish` to update `gh-pages`; GitHub's built-in Pages deployment then serves that prebuilt branch.

This approach is required because `jekyll-scholar` is not on the GitHub Pages gem allowlist and cannot be used with the standard GH Pages build.

**Note:** `.travis.yml` is present in the repo but targets Ruby 2.2.2 and does not match the current Gemfile. It is not active.

## Data & assets

There is no `_data/` directory. All structured data lives in BibTeX files under `_bibliography/`.

Static assets:
- Writer portrait images are stored in `assets/` (`.jpg`, `.jpeg`) and referenced from writer page front matter
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

Open an issue or pull request on [GitHub](https://github.com/ccarvel/jekyll-site-theme). For bibliography additions, follow the BibTeX key convention and per-writer file structure described above.

## License

MIT — see [`LICENSE.md`](LICENSE.md). Copyright 2016 Alex Gil (Ed theme); incorporated Mark Otto (Poole/Lanyon). The license covers theme code; no license statement currently covers the bibliography data or project content.
