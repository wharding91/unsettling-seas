# Maintenance Guide — Unsettling Seas

**Who this is for:** Anyone maintaining this website who is comfortable using a web browser and editing plain text, but has not necessarily used a command line or Git before. Every step below is spelled out in full.

**What this site is:** *Unsettling Seas* is a static website built with Jekyll. "Static" means the pages are pre-built files — there is no database and no live server to manage. You edit plain text files, save them to GitHub, and the site rebuilds itself automatically within a minute or two.

---

## Section 1: Where Do I Edit? — Directory Map

The table below lists every folder and file you are likely to interact with. Anything not listed here is part of the underlying system and should be left alone.

### Safe to Edit

| Path | What it is | What you change there |
|---|---|---|
| `_writers/adisa.md`<br>`_writers/brand.md`<br>`_writers/herrera.md`<br>… (one file per writer) | **Writer profile pages** — the biographical text and metadata for each writer | Bio text, birth/death dates, listed works, portrait image path, photo credit |
| `_bibliography/adisa/books.bib`<br>`_bibliography/adisa/articles.bib`<br>`_bibliography/brand/books.bib`<br>… (two `.bib` files per writer) | **BibTeX bibliography files** — the structured citation data exported from Zotero | Replaced wholesale when you export a new version from Zotero |
| `assets/adisa.jpeg`<br>`assets/brand.jpg`<br>… (one image per writer) | **Writer portrait photographs** | Replace with a higher-resolution image using the exact same filename |
| `index.html` | **Homepage** — the main landing page with the project description | The About section text only. Do not touch the HTML tags around it. |

### System Files — Do Not Touch

> **Warning:** Editing these files can break the entire site. If you need a change in any of these areas, contact the developer.

| Path | What it does |
|---|---|
| `_config.yml` | Master site configuration (URLs, plugin settings, collection definitions) |
| `_layouts/` | Page templates that control how every page is structured |
| `_includes/sidebar.html`<br>`_includes/writer-infobox.html` | Reusable HTML fragments (sidebar navigation, writer info panel) |
| `_sass/` | All visual styles and colours |
| `_texts/` | Bibliography listing pages — each contains one line of code that renders the bibliography |
| `Gemfile` / `Gemfile.lock` | Declares which software packages the site depends on |
| `Rakefile` | Old local build-and-deploy script (now replaced by the GitHub Actions workflow) |
| `.github/workflows/deploy.yml` | The automated deployment pipeline — do not modify |

### Front Matter Explained

Every file in `_writers/` begins with a block that looks like this:

```
---
layout: writer
title: "Opal Palmer Adisa"
sort_name: "Adisa, Opal Palmer"
born: "6 November 1954"
---
```

**This is called Front Matter.** It is the configuration block at the top of each text file, contained between the `---` lines. Everything between those two `---` markers is structured data — not prose. Everything after the second `---` is the biographical text that appears on the page. Do not remove the `---` markers and do not add extra spaces at the start of lines inside this block.

---

## Section 2: Non-Technical Content Updates

### Task A — Editing an Existing Bio or Bibliography

You can make small text changes directly on the GitHub website without installing anything.

1. Go to the repository page on **GitHub** (e.g., `https://github.com/ccarvel/warren-jekyll-site`).
2. Click on the file you want to edit — for example, `_writers/brand.md`.
3. Click the **pencil icon** (✏) in the top-right corner of the file view. This opens the in-browser editor.
4. Make your changes to the **biographical text** (the content below the second `---` line). Do not edit the front matter block unless you are confident about the exact format.
5. When you are finished, scroll to the bottom of the page to the **"Commit changes"** panel.
6. Write a short note in the first field describing what you changed (e.g., `Update Brand biography`).
7. Click **"Commit changes"**.

The site will automatically rebuild and go live within 1–2 minutes. You can watch the progress by clicking the **Actions** tab at the top of the repository page. A green checkmark means the deploy succeeded; a red X means something went wrong.

> **Warning:** Do not edit the front matter block (between the `---` lines) through the GitHub web editor unless you are very careful about spacing and punctuation. A misplaced colon or extra space can prevent the page from building. See Section 5 for troubleshooting.

---

### Task B — Adding an 8th Writer

Adding a new writer involves four steps: creating the profile page, adding the bibliography files, creating the bibliography listing pages, and uploading a portrait. The sidebar updates **automatically** — you do not need to edit any navigation file.

#### Step 1: Create the writer profile page

In the `_writers/` folder, create a new file named **all lowercase with no spaces and no accent marks**. For example:

- Michelle Cliff → `_writers/cliff.md`
- Edwidge Danticat → `_writers/danticat.md`
- Jean Rhys → `_writers/rhys.md`

Copy the following template exactly and fill in the values for your new writer. The `---` lines must be the very first and second structural markers in the file — nothing before the first one.

```markdown
---
layout: writer
title: "Full Writer Name Here"
writer_id: lastname
sort_name: "Lastname, Firstname"
image: /assets/lastname.jpg
image_alt: "Full Writer Name Here"
image_credit: "Source of the photograph"
image_credit_url: "https://link-to-photo-source.example.com"
born: "Day Month Year"
nationality: "Nationality"
forms:
  - Poetry
  - Fiction
major_works:
  - Title of First Book
  - Title of Second Book
themes:
  - Theme One
  - Theme Two
---

Write the biographical text here. This is normal prose — it will appear on the
writer's profile page beneath the infobox.

## Literary Significance

A paragraph about the writer's place in the broader literary tradition.
```

> **The `sort_name` field controls sidebar order.** It must be written as `"Lastname, Firstname"` — last name first, separated by a comma. This is what causes the sidebar to list writers alphabetically by last name. If this field is missing or formatted differently, the writer will appear out of order.

A correctly filled-in `sort_name` looks like this:

```
sort_name: "Cliff, Michelle"
```

Not like this:

```
sort_name: "Michelle Cliff"        ← wrong — sidebar sorts by first name
sort_name: Cliff, Michelle         ← wrong — missing quotation marks
```

#### Step 2: Add the bibliography files

Create a new folder inside `_bibliography/` named exactly the same as the `writer_id` value you used in Step 1 (e.g., `_bibliography/cliff/`). Inside that folder, create two files:

- `books.bib` — paste in the BibTeX from Zotero for books and monographs
- `articles.bib` — paste in the BibTeX for journal articles, chapters, and essays

See **Section 3** for how to export these from Zotero correctly.

#### Step 3: Create the bibliography listing pages

Create a new folder inside `_texts/` named the same as the `writer_id` (e.g., `_texts/cliff/`). Inside that folder, create two files.

**`_texts/cliff/books.md`** — paste this in, changing `cliff` to your writer's ID:

```markdown
---
layout: page
title: Books
author: Full Writer Name Here
editor: Warren Harding
---

{% bibliography --file cliff/books %}
```

**`_texts/cliff/articles.md`** — paste this in:

```markdown
---
layout: page
title: Articles
author: Full Writer Name Here
editor: Warren Harding
---

{% bibliography --file cliff/articles %}
```

> **Warning:** The filename inside `{% bibliography --file ... %}` must match the folder name in `_bibliography/` exactly, including capitalisation. `cliff/books` and `Cliff/books` are not the same.

#### Step 4: Upload the portrait image

Upload the portrait photograph to the `assets/` folder. Name it using the same ID (e.g., `cliff.jpg`). Make sure the filename in the front matter `image:` field of the writer profile page matches exactly, including the file extension (`.jpg` vs `.jpeg` are different).

#### Step 5: Save and deploy

Commit all the new files through GitHub (or the terminal). The sidebar will automatically include the new writer in alphabetical order on the next build.

---

## Section 3: The Zotero-to-Jekyll Pipeline Guide

This site reads bibliography data from `.bib` files exported from **Zotero**. If you add new citations or correct existing ones in Zotero, you must re-export and replace the relevant `.bib` file.

### How to export from Zotero

1. In Zotero, select the collection for the writer you want to export.
2. Click **File → Export Library** (or right-click the collection and choose **Export Collection**).
3. In the format dropdown, select **BibTeX**.
4. Set the encoding to **UTF-8** (this is usually the default).
5. Leave **"Export Notes"** unchecked.
6. Save the file with a name matching the existing file (e.g., `books.bib`).

### After exporting

Run the normalisation script before replacing the existing `.bib` file. This script fixes formatting differences between Zotero's output and what Jekyll Scholar expects:

```bash
bundle exec ruby zot-to-jekyll.rb
```

Open `zot-to-jekyll.rb` in a text editor first and set the `bib_file` variable at the top to the path of the file you just exported.

### Citation keys — critical warning

> **Warning:** Every citation in a `.bib` file has a **citation key** — a short identifier like `adisa_traveling_1989`. This key is used internally by Jekyll to create permanent links to individual citation entries on the website. **If a citation key changes, any existing links to that entry will break.**
>
> Citation keys change when you edit an item in Zotero in a way that alters its author, title, or year — Zotero may auto-generate a new key. Before replacing a `.bib` file, compare the keys in the new export against the keys in the existing file. If any key has changed for an entry that was already on the live site, either manually restore the old key in the new `.bib` file, or accept that the old link will become a 404.

The key format used on this site is: `authorlastname_shorttitle_year`
Example: `brand_nolanguage_1990`

---

## Section 4: Local Preview Environment Setup

If you want to preview changes on your own computer before they go live, you need to set up a local development environment. This is optional — small edits can be made and reviewed using the GitHub web interface and the live site.

### Prerequisites

- **macOS or Linux** (Windows is possible but more complex)
- **Ruby 3.4** installed (use `rbenv` or `ruby-install`)
- **Bundler** (install with `gem install bundler`)

### Setup checklist

- [ ] Open Terminal and navigate to the repository folder:
  ```bash
  cd /path/to/warren-jekyll-site
  ```
- [ ] Install all gem dependencies (run once, then only when `Gemfile` changes):
  ```bash
  bundle install
  ```
- [ ] Start the local preview server:
  ```bash
  bundle exec jekyll serve --baseurl ""
  ```

### Success criteria

Look for this line in your terminal output:

```
Server address: http://127.0.0.1:4000/
```

Copy that URL (`http://127.0.0.1:4000/`) and paste it into your web browser. The site will appear exactly as it will look on the live server. Any changes you save to files in the project folder will automatically be reflected when you refresh the browser.

To stop the server, press **`Ctrl + C`** in the terminal.

> **Note:** The `--baseurl ""` flag overrides the `/warren-jekyll-site` path prefix used on the live GitHub Pages site. Without it, the local server redirects the root URL to `/warren-jekyll-site` and WEBrick returns a 404. With the flag, the site is available directly at `http://127.0.0.1:4000/` and all navigation works normally.

---

## Section 5: The "Don't Panic" Troubleshooting Guide

### Problem 1 — Page fails to build after editing a `.md` or `_config.yml` file

**Symptom:** The GitHub Actions deploy step shows a red X, or the site does not update after a commit.

**Cause:** YAML (the format used in front matter blocks and `_config.yml`) is **extremely sensitive to whitespace.** Tabs are not allowed — only spaces. A single extra space at the start of a line, a misplaced colon, or a missing quotation mark is enough to cause the entire build to fail.

**What to check:**
- Every line inside the `---` front matter block must be indented with **spaces, not tabs**.
- List items (lines that start with `-`) must all be indented by the same number of spaces.
- Values that contain colons (`:`) or quotation marks must be wrapped in `"double quotes"`.
- Do not add a blank line between the `---` opening marker and the first key.

**How to see the error:** Go to the **Actions** tab on the GitHub repository page. Click the failed run. Click the failing step to expand the log. The exact line number and error message will be printed there.

---

### Problem 2 — Site looks perfect locally but styles and links are broken on the live site

**Symptom:** Running `bundle exec jekyll serve` shows the site correctly, but after deploying to GitHub Pages, the CSS is missing, images don't load, or links lead to 404 pages.

**Cause:** The live site is served from a sub-path (e.g., `https://username.github.io/warren-jekyll-site/`), which means all internal links must begin with `/warren-jekyll-site/`. The `baseurl` setting in `_config.yml` tells Jekyll to add this prefix automatically. When you preview locally, Jekyll uses a different `baseurl` (usually empty), so local previews can mask this class of bug.

**What to check:**
1. Open `_config.yml` and confirm that `baseurl:` is set to `/warren-jekyll-site` (or whatever the correct sub-path is for the live site's URL).
2. If the repository has been transferred to a new GitHub account, the `url:` and `baseurl:` values will need to be updated to reflect the new username and repository name.
3. Never hardcode paths like `/assets/image.jpg` in writer pages — always use `{{ site.baseurl }}/assets/image.jpg` or `{{ '/assets/image.jpg' | relative_url }}`. All existing writer pages already follow this convention.

> **Note for after the repo transfer:** Once the repository is moved to Warren's GitHub account, update `url:` and `baseurl:` in `_config.yml` before deploying. The `TRANSFER.md` file in the repository root has step-by-step instructions for the full transfer process.

---

### Problem 3 — Terminal says "Port 4000 is already in use"

**Symptom:** When running `bundle exec jekyll serve`, the terminal prints an error like:

```
jekyll serve: Address already in use - bind(2)
jekyll 4.4.1 | Error: Address already in use.
```

**Cause:** A previous Jekyll server session did not close cleanly. The port (4000) is still being held by a background process.

**Fix — Option A (quickest):** Close the Terminal window entirely, open a new one, and try again.

**Fix — Option B (more targeted):** Run this command to find and stop the process holding port 4000:

```bash
lsof -ti:4000 | xargs kill -9
```

Then run `bundle exec jekyll serve` again.

**Fix — Option C (use a different port):** Start the server on a different port number instead:

```bash
bundle exec jekyll serve --port 4001
```

The preview URL will then be `http://127.0.0.1:4001/`.

---

## Deployment Summary

When you save a commit to the **`main`** branch (either through the GitHub web editor or by pushing from your terminal), the site rebuilds and deploys automatically via GitHub Actions. You do not need to run `bundle exec rake ed:publish` manually — that step is now handled by the workflow in `.github/workflows/deploy.yml`.

You can monitor every deploy in real time by clicking the **Actions** tab in the GitHub repository. A green checkmark means the site is live with your latest changes. A red X means the build failed — click it to read the error log.
