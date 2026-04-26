# AI_CONTEXT.md — Unsettling Seas

Repository context for AI agents. Read this file first, then AI_WORK_LOG.md, then ai_status.json.

## Project identity

**Name:** Unsettling Seas: Caribbean Women's and Feminist Creative Writing, 1989–2001
**Type:** Jekyll static site — digital humanities bibliography
**Editor:** Warren Harding
**Remote:** https://github.com/ccarvel/jekyll-site-theme
**Branch:** master (direct commits; no PR workflow)
**Upstream:** https://github.com/elotroalex/bib-pollock (Ed theme origin — do not merge from upstream)

## Tech stack

| Layer | Tool | Version |
|---|---|---|
| Language | Ruby | ~> 3.4.0 (locked 3.4.4) |
| Framework | Jekyll | ~> 4.4.0 (locked 4.4.1) |
| Theme | ed. gem (local gemspec) | 2.0.0 |
| Bibliography | jekyll-scholar | 7.2.0 |
| Markdown | kramdown + kramdown-parser-gfm | — |
| Search | elasticlunr.js | client-side |
| Validation | html-proofer | 5.0.10 |
| Dev server | webrick | 1.9.1 |
| Bundler | bundler | 2.6.9 |

## Key directories

```
_bibliography/          BibTeX source (per-writer subdirs: adisa/, brand/)
_writers/               Jekyll collection: writer profile pages
_texts/                 Jekyll collection: bibliography listing pages
_layouts/               Liquid layouts (default → page/bibliography/poem/drama/narrative)
_includes/              head.html, sidebar.html
_sass/                  _ed.scss (theme), _syntax.scss
assets/js/              elasticlunr.min.js, search.js
assets/css/             style.scss
```

## Commands

| Purpose | Command |
|---|---|
| Install dependencies | `bundle install` |
| Local dev server | `bundle exec jekyll serve` |
| Production build | `bundle exec jekyll build` |
| Link/HTML validation | `bundle exec htmlproofer ./_site --only-4xx --check-favicon --check-html` |
| Deploy to gh-pages | `bundle exec rake ed:publish` |
| Normalize Zotero BibTeX | `bundle exec ruby zot-to-jekyll.rb` (edit `bib_file` var first) |

## Collections

| Collection | Output | Items | Front-matter required |
|---|---|---|---|
| `_writers` | true | adisa.md, brand.md | `layout: page`, `title:` |
| `_texts` | true | adisa/{books,articles}.md, brand/{books,articles}.md | `layout: page`, `title:`, `author:`, `editor:` |

Bibliography pages use one Liquid tag: `{% bibliography --file <writer>/<type> %}`

## BibTeX conventions

- Key pattern: `author_shorttitle_year` (e.g., `adisa_traveling_1989`)
- Extra fields in use: `annote` (annotation shown below citation), `file` (PDF path in `archive/`)
- Citation style: Chicago fullnote bibliography
- Per-writer files live in `_bibliography/<writer>/books.bib` and `articles.bib`
- Legacy combined files (`articles.bib`, `books.bib`, `chapters.bib`, `lectures.bib`) are at repo root of `_bibliography/` — not actively referenced by any page

## Infrastructure

| Resource | Detail |
|---|---|
| Deploy target | GitHub Pages — `gh-pages` branch, populated by `rake ed:publish` |
| Build method | Local build + force-push (jekyll-scholar not on GH Pages allowlist) |
| CI | None active (.travis.yml present but stale — targets Ruby 2.2.2) |
| Domain/CNAME | Not configured |

## Sensitive files — never commit

- `.env` (none currently, but guard against)
- Any file containing API keys or credentials
- `archive/` PDFs (in .gitignore)
- `*.pdf`, `*.docx` (in .gitignore — note: `website proofing.docx` is currently tracked, needs removal)

## Read order for new agents

1. `AI_CONTEXT.md` (this file) — repo overview and commands
2. `AI_WORK_LOG.md` — history of what has been done and why
3. `ai_status.json` — current focus, exact next step, blockers
4. `TODO.md` — full backlog of known issues
5. `README.md` — user-facing documentation
