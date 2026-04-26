# TODO

Issues and improvements identified during repository audit (2026-04-26).

## Configuration

- [ ] **Fix duplicate `permalink:` in `_config.yml`** — `pretty` (line 23) is immediately overridden by `/:title/` (line 25). Remove the `pretty` line to make intent explicit.

- [ ] **Fix `url:` in `_config.yml`** — currently set to `http://elotroalex.github.io` (the upstream bib-pollock project). Update to the actual deployed URL so Open Graph tags and canonical links resolve correctly.

- [ ] **Fix missing `references.bib`** — `scholar.bibliography: references.bib` points to a file that does not exist in `_bibliography/`. Either create a combined bibliography file at that path or update the key to point to a file that exists. Without this, Jekyll Scholar's default bibliography context is broken.

## Dependencies & CI

- [ ] **Remove or replace `.travis.yml`** — the file targets Ruby 2.2.2, but the Gemfile requires `~> 3.4.0`. Travis CI is not active on this repo. Delete the file or replace it with a GitHub Actions workflow (`.github/workflows/`) that runs `bundle exec jekyll build` and `bundle exec htmlproofer`.

- [ ] **Remove `Gemfile.lock` from `.gitignore`** — locking the lockfile is recommended for deployed sites to ensure reproducible builds across collaborators and CI. Remove the `Gemfile.lock` entry from `.gitignore` and commit the lockfile.

## Content

- [ ] **Replace lorem ipsum in `index.html`** — the "About Unsettling Seas" section contains five paragraphs of placeholder text. Replace with real scholarly copy describing the project's scope and methodology.

- [ ] **Replace lorem ipsum in writer profiles** — `_writers/adisa.md` and `_writers/brand.md` each contain two paragraphs of dummy text after the opening biographical sentence. Replace with substantive biographical content.

- [ ] **Add content for five placeholder writers** — Georgina Herrera, Nancy Morejón, M. Nourbese Philip, Soleida Ríos, and Évelyne Trouillot are listed on the homepage as plain text with no links. Either add writer profile and bibliography stubs for each, or add a visible "coming soon" / in-progress indication so the omission is intentional rather than broken.

## Assets & Dependencies

- [ ] **Remove `website proofing.docx` from git tracking** — a binary Word document is tracked in the repo. Add `*.docx` to `.gitignore` and remove the file from tracking with `git rm --cached "website proofing.docx"`.

- [ ] **Update jQuery in `search.html`** — jQuery 1.11.3 is loaded from a Google CDN. This version is over a decade old and the external CDN creates an unnecessary dependency. Consider bundling a current version locally under `assets/js/` or replacing it with vanilla JS.

## Metadata & Legal

- [ ] **Fix `fb:admins` in `_includes/head.html`** — the Open Graph tag `<meta property="fb:admins" content="elotroalex"/>` is an upstream artifact. Update or remove it.

- [ ] **Fix `scholar.relative` in `_config.yml`** — currently points to `/ed/bibliography.html`, which is an upstream path that may not match this site's actual URL structure. Verify and update.

- [ ] **Add a content license** — `LICENSE.md` covers only the Ed theme code (MIT, copyright Alex Gil). The bibliography data and editorial content have no stated license. Add a Creative Commons statement (e.g., CC BY 4.0) if the project intends to allow reuse, or note rights explicitly.
