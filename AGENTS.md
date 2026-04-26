# AGENTS.md — Unsettling Seas

Codex / OpenAI Agents entry point. Read these files in order before starting any work:

1. `AI_CONTEXT.md` — repo overview, tech stack, commands, collections, infrastructure
2. `AI_WORK_LOG.md` — session history; what was done, why, and what was decided
3. `ai_status.json` — current focus, exact next step, blockers
4. `TODO.md` — full backlog of known issues

## Notes

- Ruby/Jekyll project. No Node build step — ignore any `npm install` prompts.
- All setup: `bundle install`. All local serving: `bundle exec jekyll serve`.
- Do not run `rake ed:publish` unless explicitly asked — it force-pushes to the live `gh-pages` branch.
- Append new entries to `AI_WORK_LOG.md` (newest at top); never rewrite existing entries.
- Update `ai_status.json` at the end of each session with the exact next step.
