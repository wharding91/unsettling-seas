# Apps & Workflows — Unsettling Seas

**Who this is for:** Someone taking over maintenance of this Jekyll site on a Mac who wants clear, concrete guidance on which free apps to install and exactly what buttons to click to do the most common tasks.

**The short version:** You only ever edit plain text files. When you save your changes and click one button, a robot called GitHub Actions automatically rebuilds and redeploys the live website within a couple of minutes. You never need to touch a server.

---

## Section 1: The Three macOS Setup Pathways

Choose the one that matches your comfort level. All apps below are free. There is no wrong choice — you can always switch later.

| | **Setup 1** | **Setup 2 (Recommended)** | **Setup 3** |
|---|---|---|---|
| **Name** | The Zero-Terminal Visual Learner | The Aspiring Technical Creator | The All-In-One Integrated Environment |
| **Best for** | Pure "what you see is what you get" editing with zero command line | Clean, helpful editor + a friendly visual app for syncing to GitHub | Developers comfortable learning one tool that does everything |
| **Text editor** | MacDown or MarkText | VS Code | VS Code |
| **Git / sync tool** | GitHub Desktop | GitHub Desktop | VS Code's built-in Source Control panel |
| **Terminal required?** | No | No | No |

---

### Setup 1 — The Zero-Terminal Visual Learner (Easiest)

This setup lets you write and edit Markdown files in an app that shows you a live formatted preview as you type, with no raw syntax to worry about.

**Apps to download and install:**

| App | What it does | Download |
|---|---|---|
| **MacDown** | Free Markdown editor for Mac. Side-by-side split view: raw text on the left, formatted preview on the right. | [macdown.uranusjr.com](https://macdown.uranusjr.com) |
| **MarkText** | Alternative free Markdown editor. More "word processor" feel — hides the Markdown syntax as you type. | [github.com/marktext/marktext/releases/latest](https://github.com/marktext/marktext/releases/latest) |
| **GitHub Desktop** | Free visual app for syncing your local file changes up to GitHub (and back). No typing of Git commands needed. | [desktop.github.com](https://desktop.github.com) |

> **Tip:** You only need one Markdown editor — try both and keep whichever feels more natural. MacDown is closer to a "coding" feel; MarkText is closer to a "writing" feel.

**Installation:** Each app downloads as a `.dmg` file. Open it, drag the app icon into your **Applications** folder, and you are done.

> **Tip:** After installing GitHub Desktop, sign in with your GitHub account credentials and click **"Clone a Repository."** Find `warren-jekyll-site` in the list and choose a local folder for it on your Mac. This downloads the site files so you can open and edit them locally.

---

### Setup 2 — The Aspiring Technical Creator (Balanced — Recommended)

This setup pairs a lightweight, powerful text editor with the friendly GitHub Desktop app. You get helpful writing aids and smart coloring in VS Code, but you never have to touch VS Code's more technical panels — GitHub Desktop handles all the syncing.

**Apps to download and install:**

| App | What it does | Download |
|---|---|---|
| **Visual Studio Code (VS Code)** | Free, lightweight text editor made by Microsoft. Opens any file in the repo with smart syntax coloring. | [code.visualstudio.com/download](https://code.visualstudio.com/download) |
| **GitHub Desktop** | Handles all syncing to and from GitHub — pull, commit, push — through a friendly visual interface. | [desktop.github.com](https://desktop.github.com) |

> **Tip:** Download VS Code as a `.zip` file on macOS. Unzip it and move **Visual Studio Code.app** into your **Applications** folder. On first launch, VS Code may ask if you want to install the `code` command in your Terminal path — you can safely skip this.

**Recommended extensions for VS Code (see Section 2 for details):** Markdown All in One · BibTeX Language · Front Matter CMS

---

### Setup 3 — The All-In-One Integrated Environment (Power User)

This setup uses VS Code alone for both writing and syncing. Instead of GitHub Desktop, you use VS Code's built-in **Source Control** panel (the branch icon in the left sidebar) to stage, commit, and push changes. This is the most streamlined option once you are comfortable with VS Code.

**Apps to download and install:**

| App | What it does | Download |
|---|---|---|
| **Visual Studio Code (VS Code)** | Editor and Git client in one. The Source Control panel in the left sidebar handles all commit and push operations. | [code.visualstudio.com/download](https://code.visualstudio.com/download) |

**How syncing works in VS Code's Source Control panel:**
1. Click the **branch icon** in the left sidebar (third icon from the top, looks like a forked path).
2. Changed files appear under **"Changes."** Hover over a file and click **+** to stage it.
3. Type a short description in the **"Message"** box at the top.
4. Click the blue **"Commit"** button, then click **"Sync Changes"** (or the cloud icon) to push to GitHub.

> **Tip:** The first time you use Source Control in VS Code, it will ask you to sign in with your GitHub account. Follow the browser prompt — it only takes a moment.

---

## Section 2: Zero-Configuration Plugin Checklist (VS Code — Setups 2 and 3)

If you chose Setup 2 or Setup 3, install these free extensions from within VS Code. To install any extension: open VS Code, press **Cmd + Shift + X** to open the Extensions panel, search by name, and click **Install**.

| Extension | Search term | What it does for you |
|---|---|---|
| **Markdown All in One** | `markdown all in one` | Adds keyboard shortcuts for bold (`Cmd+B`), italic (`Cmd+I`), and automatic list handling. Pressing Enter at the end of a bullet list item automatically adds the next `-` for you. Makes writing `.md` files feel much more like a word processor. |
| **BibTeX Language** | `bibtex language` | Adds color-coding to `.bib` files so citation keys, author fields, years, and titles each appear in a distinct color. Makes it easy to visually scan an exported Zotero file for errors before saving it to the repository. |
| **Front Matter CMS** | `front matter cms` | Provides a visual dashboard panel inside VS Code for managing the metadata at the top of writer pages (the block between the `---` lines). Instead of editing raw YAML, you fill in labelled form fields. Especially useful when adding a new writer. |

> **Tip:** Front Matter CMS is optional but highly recommended for anyone who finds the `---` front matter blocks confusing. Once it is installed, a **"Front Matter"** icon appears in the VS Code sidebar. Click it to see a visual form for any `.md` file that is currently open.

> **Tip:** After installing extensions, you do not need to do anything else. They activate automatically whenever you open a relevant file type.

---

## Section 3: Visual Step-by-Step Task Workflows

These two tasks cover 90% of routine site maintenance. Each workflow is written for **Setup 2** (VS Code + GitHub Desktop), which is the recommended path. If you use Setup 1, replace "VS Code" with "MacDown" or "MarkText." If you use Setup 3, replace the GitHub Desktop steps with VS Code's Source Control panel.

---

### Task A — Updating an Existing Writer's Bio

- [ ] **Step 1 — Get the latest version of the files.**
  Open **GitHub Desktop**. At the top of the window, click **"Fetch Origin."** If the button changes to **"Pull Origin"** with a number next to it, click it again to download any recent changes. This ensures you are not editing an out-of-date copy.

- [ ] **Step 2 — Open and edit the writer file.**
  In VS Code, use **File → Open Folder** and select the `warren-jekyll-site` folder on your Mac. In the left file panel, navigate to the **`_writers/`** folder and click the file you want to edit. The seven available files are:

  | Writer | File |
  |---|---|
  | Opal Palmer Adisa | `_writers/adisa.md` |
  | Dionne Brand | `_writers/brand.md` |
  | Georgina Herrera | `_writers/herrera.md` |
  | Nancy Morejón | `_writers/morejon.md` |
  | M. NourbeSe Philip | `_writers/philip.md` |
  | Soleida Ríos | `_writers/rios.md` |
  | Évelyne Trouillot | `_writers/trouillot.md` |

  Edit only the **prose text below the second `---` line.** Do not change any of the lines above it (the front matter block). Save the file with **Cmd + S**.

  > **Tip:** If you are using the Front Matter CMS extension, click the **Front Matter** icon in the VS Code sidebar before editing — it will show a safe visual panel for changing metadata fields like `born:` or `nationality:` without touching the raw YAML.

- [ ] **Step 3 — Review and commit your changes.**
  Switch to **GitHub Desktop**. In the left panel, you will see the filename listed under **"Changed Files"** with a yellow dot next to it. Click the filename to see a diff view (green lines = added, red lines = removed). If everything looks correct, type a short message in the **"Summary"** box at the bottom left — for example: `Update Adisa biography`. Click the blue **"Commit to main"** button.

- [ ] **Step 4 — Push to GitHub.**
  Click the **"Push Origin"** button at the top of the GitHub Desktop window.

  **That is the last step.** The moment you click Push, the GitHub Actions robot (the automated pipeline in `.github/workflows/deploy.yml`) wakes up, rebuilds the entire site on GitHub's servers, and pushes the finished pages to the live `gh-pages` branch. The live website reflects your changes within approximately **1–2 minutes.**

  To watch the progress: open your browser, go to the repository page on GitHub, click the **Actions** tab. You will see a spinning orange circle that turns to a green checkmark when the deploy is complete.

---

### Task B — Importing a New Zotero Bibliography File

Use this workflow whenever you have exported updated citation data from Zotero and need to replace an existing `.bib` file in the repository.

- [ ] **Step 1 — Export the `.bib` file from Zotero.**
  In Zotero, right-click the collection for the writer whose bibliography you are updating and choose **"Export Collection."** Select **BibTeX** as the format, confirm the encoding is **UTF-8**, leave "Export Notes" unchecked, and save the file to your Mac's **Downloads** folder. Name it to match the file it will replace — for example: `books.bib` or `articles.bib`.

- [ ] **Step 2 — Move the file into the repository using Finder.**
  Open a **Finder** window and navigate to your local `warren-jekyll-site` folder. Open the `_bibliography/` folder, then open the subfolder for the writer you are updating (e.g., `_bibliography/adisa/` or `_bibliography/brand/`). Drag the newly exported `.bib` file from your Downloads folder into this subfolder. When macOS asks if you want to replace the existing file, click **Replace.**

  > **Tip:** If you are adding bibliography files for a brand-new writer rather than replacing an existing one, create a new subfolder named after the writer's ID (all lowercase, no accents — e.g., `cliff` for Michelle Cliff) and drop `books.bib` and `articles.bib` inside it. The folder name must match the `writer_id:` value in the writer's profile page. See `MAINTENANCE.md` for the complete new-writer checklist.

- [ ] **Step 3 — Verify the citation key format.**
  Before committing, open the new `.bib` file in VS Code (it will have BibTeX color-coding if you installed the BibTeX Language extension). Scan the citation keys at the top of each entry — they are the identifiers on the first line inside each `@book{...}` or `@article{...}` block. The format used on this site is:

  ```
  authorlastname_shorttitle_year
  ```

  Example: `brand_nolanguage_1990` or `adisa_traveling_1989`

  > **Warning:** If a citation key has changed from the version already on the live site, any permanent link pointing to that entry will become a broken 404 page. If Zotero auto-generated a new key for an item you only edited (rather than added fresh), manually restore the original key in the `.bib` file before committing. The full explanation is in `MAINTENANCE.md`, Section 3.

- [ ] **Step 4 — Commit and push.**
  Open **GitHub Desktop**. The new `.bib` file will appear in the **"Changed Files"** panel. Type a short summary such as `Update Adisa books bibliography`. Click **"Commit to main,"** then click **"Push Origin."** The site will rebuild automatically.

---

## Section 4: The Mac-Specific Safety Net

macOS has several helpful system features that are actively hostile to plain-text code. Here is what to watch for.

---

### Smart Quotes and Smart Dashes

**The problem:** By default, macOS converts straight programming quotes (`"like this"`) into curly typographic quotes (`"like this"`), and converts two hyphens (`--`) into an em-dash (`—`). This substitution happens silently as you type in apps like **TextEdit**, **Notes**, **Pages**, and even some email clients. YAML front matter and Jekyll configurations require straight quotes and standard hyphens. A single smart quote will cause the entire build to fail with a cryptic error.

> **Warning:** Never edit `.md`, `.bib`, or `.yml` files in **TextEdit.** It applies Smart Quotes automatically and there is no reliable way to turn this off while keeping TextEdit useful. VS Code, MacDown, and MarkText do **not** apply smart substitutions to code files — this is one of the core reasons to use a dedicated editor.

**If you need to turn Smart Quotes off system-wide** (affects all apps):

1. Open **System Settings** → **Keyboard**.
2. Click the **"Text Input"** section, then click **"Edit…"** next to your keyboard.
3. Uncheck **"Use smart quotes and dashes."**

This does not affect VS Code, MacDown, or MarkText, which manage their own input settings independently. It does affect TextEdit, Notes, and Pages.

---

### Hidden File Extensions in Finder

**The problem:** By default, macOS Finder hides the file extension part of a filename. A file named `cliff.md` appears in Finder simply as `cliff`. This creates a dangerous trap: if you ever create a new file by saving it from TextEdit or another document app, macOS may silently add `.txt` to the end, giving you `cliff.md.txt` instead of `cliff.md`. Jekyll will ignore the file entirely because it does not recognise the `.txt` extension.

**How to show all extensions in Finder:**

1. Open a **Finder** window.
2. Press **Cmd + ,** to open Finder Settings (or click **Finder → Settings** in the menu bar).
3. Click the **"Advanced"** tab.
4. Check the box next to **"Show all filename extensions."**

All filenames in Finder will now always show their full extension. A correctly named writer file looks like `cliff.md`. A broken one looks like `cliff.md.txt` — if you see this, rename the file in Finder (right-click → Rename) and remove the extra `.txt` part.

> **Tip:** VS Code and GitHub Desktop always show the full filename including extension, regardless of the Finder setting. If a file appears correctly in VS Code but does not render on the site after pushing, check its full name in Finder with extensions visible.

---

## Quick Reference Summary

| Task | What you do | What happens automatically |
|---|---|---|
| Edit a writer bio | Edit `_writers/<name>.md`, commit in GitHub Desktop, click Push | GitHub Actions rebuilds and deploys the live site in ~2 min |
| Replace a bibliography | Drop new `.bib` into `_bibliography/<writer>/`, commit, push | GitHub Actions rebuilds the bibliography pages automatically |
| Add a new writer | Follow the full checklist in `MAINTENANCE.md` Section 2, commit, push | Sidebar updates automatically; new pages go live |
| Something broke | Check the **Actions** tab on GitHub — click the red X to read the error log | — |
