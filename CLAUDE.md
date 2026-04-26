# CLAUDE.md — Unsettling Seas

Claude Code entry point. Read these files in order before starting any work:

1. `AI_CONTEXT.md` — repo overview, tech stack, commands, collections, infrastructure
2. `AI_WORK_LOG.md` — session history; what was done, why, and what was decided
3. `ai_status.json` — current focus, exact next step, blockers
4. `TODO.md` — full backlog of known issues

## Claude-specific notes

- Branch: `master`. Direct commits are normal for this repo — no PR workflow.
- Deploy command: `bundle exec rake ed:publish` (builds locally, force-pushes `_site/` to `gh-pages`).
- Do not modify source code files outside the scope of the current task.
- `jekyll-scholar` is not on the GitHub Pages allowlist — the local Rake deploy is intentional.
- `.travis.yml` is stale; ignore it. There is no active CI.
- `Gemfile.lock` is in `.gitignore` — this is a known issue (see TODO.md), not a mistake to fix silently.
