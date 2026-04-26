# GEMINI.md — Unsettling Seas

Gemini CLI entry point. Read these files in order before starting any work:

1. `AI_CONTEXT.md` — repo overview, tech stack, commands, collections, infrastructure
2. `AI_WORK_LOG.md` — session history; what was done, why, and what was decided
3. `ai_status.json` — current focus, exact next step, blockers
4. `TODO.md` — full backlog of known issues

## Notes

- Ruby/Jekyll project. Primary commands: `bundle install`, `bundle exec jekyll serve`.
- Content lives in `_writers/` (profiles) and `_texts/` (bibliography pages); data lives in `_bibliography/*.bib`.
- Append new entries to `AI_WORK_LOG.md` (newest at top); never rewrite existing entries.
- Update `ai_status.json` at the end of each session with the exact next step.
