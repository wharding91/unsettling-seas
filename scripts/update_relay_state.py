#!/usr/bin/env python3
"""
update_relay_state.py — CLI helper for Relay multi-agent handoff

Updates ai_status.json and/or appends to AI_WORK_LOG.md from the command line.
Designed for use by AI agents and humans alike.

Usage:
    python scripts/update_relay_state.py --status                          # refresh git state
    python scripts/update_relay_state.py --status --tool "Antigravity"     # refresh + set tool
    python scripts/update_relay_state.py --next-step "run pytest" --tool "Claude Code"
    python scripts/update_relay_state.py --log --tool "Gemini CLI" --summary "Fixed nginx config"
    python scripts/update_relay_state.py --status --log --tool "Claude Code"
    python scripts/update_relay_state.py --show                            # print current state
    python scripts/update_relay_state.py --init --tool "Claude Code"       # stamp relay version on init

Notes:
    - Run from anywhere inside a git repo; auto-detects repo root.
    - Zero external dependencies (stdlib only).
    - Does not stage or commit changes.
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path
from typing import List, Optional

# --- Constants ---

RELAY_VERSION = "0.1.0"
STATUS_FILE = "ai_status.json"
WORK_LOG_FILE = "AI_WORK_LOG.md"
CONTEXT_FILE = "AI_CONTEXT.md"


# --- Git layer ---

@dataclass
class GitState:
    repo_root: Path
    branch: str
    short_sha: str
    last_commit_subject: str
    modified: List[str] = field(default_factory=list)
    staged: List[str] = field(default_factory=list)
    untracked: List[str] = field(default_factory=list)
    is_dirty: bool = False

    @property
    def worktree_state(self) -> str:
        if not self.is_dirty:
            return "clean"
        parts = []
        if self.staged:
            parts.append(f"{len(self.staged)} staged")
        unstaged = [f for f in self.modified if f not in self.staged]
        if unstaged:
            parts.append(f"{len(unstaged)} unstaged")
        if self.untracked:
            parts.append(f"{len(self.untracked)} untracked")
        return ", ".join(parts) if parts else "dirty"


def _git(repo: Path, args: List[str]) -> str:
    result = subprocess.run(
        ["git", *args],
        cwd=repo,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError(f"git {' '.join(args)} failed: {result.stderr.strip()}")
    return result.stdout.rstrip("\n")


def find_repo_root(start: Optional[Path] = None) -> Path:
    start = start or Path.cwd()
    result = subprocess.run(
        ["git", "rev-parse", "--show-toplevel"],
        cwd=start,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError("Not inside a git repository.")
    return Path(result.stdout.strip()).resolve()


def get_git_state(start: Optional[Path] = None) -> GitState:
    repo = find_repo_root(start)
    branch = _git(repo, ["branch", "--show-current"]) or "DETACHED_HEAD"

    # SHA — handle repos with no commits
    try:
        short_sha = _git(repo, ["rev-parse", "--short", "HEAD"])
        last_subject = _git(repo, ["log", "-1", "--pretty=%s"])
    except RuntimeError:
        short_sha = "no commits"
        last_subject = ""

    # Porcelain status
    porcelain = _git(repo, ["status", "--porcelain"])
    lines = porcelain.splitlines() if porcelain else []

    modified, staged, untracked = [], [], []
    for raw in lines:
        if not raw.strip():
            continue
        xy = raw[:2]
        path = raw[3:].strip()
        if "->" in path:
            path = path.split("->", 1)[1].strip()

        if xy == "??":
            untracked.append(path)
        else:
            x, y = xy[0], xy[1]
            if x != " ":
                staged.append(path)
            if x != " " or y != " ":
                modified.append(path)

    modified = sorted(set(modified))
    staged = sorted(set(staged))
    untracked = sorted(set(untracked))

    return GitState(
        repo_root=repo,
        branch=branch,
        short_sha=short_sha,
        last_commit_subject=last_subject,
        modified=modified,
        staged=staged,
        untracked=untracked,
        is_dirty=bool(lines),
    )


# --- File helpers ---

def read_json(path: Path) -> dict:
    if not path.exists():
        return {}
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def write_json(path: Path, data: dict) -> None:
    with path.open("w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")


def today() -> str:
    return datetime.now().strftime("%Y-%m-%d")


def now_timestamp() -> str:
    dt = datetime.now().astimezone()
    return dt.strftime("%Y-%m-%d %H:%M %Z")


# --- Core operations ---

def update_status(
    git: GitState,
    tool: Optional[str] = None,
    next_step: Optional[str] = None,
    focus: Optional[str] = None,
    summary: Optional[str] = None,
    completed: Optional[List[str]] = None,
) -> dict:
    """Update ai_status.json preserving existing fields, refreshing git state."""
    path = git.repo_root / STATUS_FILE
    existing = read_json(path)

    # Preserve existing fields, update what we know
    existing["last_updated"] = today()
    if tool:
        existing["last_session"] = f"{tool} (via update_relay_state.py)"
    existing["branch"] = git.branch
    existing["git_sha"] = git.short_sha
    existing["worktree_state"] = git.worktree_state

    if focus:
        existing["current_focus"] = focus
    if next_step:
        existing["exact_next_step"] = next_step
    if summary:
        existing.setdefault("current_focus", summary)
    if completed:
        prev = existing.get("completed_this_session", [])
        existing["completed_this_session"] = prev + completed

    # Ensure required fields exist
    existing.setdefault("blockers", [])
    existing.setdefault("open_tasks", [])
    existing.setdefault("completed_this_session", [])

    write_json(path, existing)
    return existing


def append_log(
    git: GitState,
    tool: Optional[str] = None,
    summary: Optional[str] = None,
    next_step: Optional[str] = None,
    completed: Optional[List[str]] = None,
) -> None:
    """Prepend a session log entry to AI_WORK_LOG.md."""
    path = git.repo_root / WORK_LOG_FILE
    tool_name = tool or "unknown tool"
    summary_text = summary or "Session update via update_relay_state.py"
    next_text = next_step or "TODO: define exact next step"

    completed_lines = ""
    if completed:
        completed_lines = "\n".join(f"- {item}" for item in completed)
    else:
        completed_lines = "- (none recorded by script)"

    files_lines = ""
    if git.modified or git.untracked:
        all_files = sorted(set(git.modified + git.untracked))
        files_lines = "\n".join(f"- `{f}`" for f in all_files)
    else:
        files_lines = "- none (working tree clean)"

    entry = f"""
---

## {today()} — {tool_name}

{summary_text}

**Completed:**
{completed_lines}

**Files touched:**
{files_lines}

**Worktree:** {git.worktree_state}
**Branch:** `{git.branch}` @ `{git.short_sha}`
**Next step:** {next_text}
"""

    if not path.exists():
        # Derive project name from repo dir
        project = git.repo_root.name.replace("-", " ").replace("_", " ").title()
        header = f"""# AI Work Log — {project}

Append-only session log. Most recent entry first.
For current state, see ai_status.json.
"""
        path.write_text(header + entry, encoding="utf-8")
    else:
        # Prepend: read existing, find the divider after header, insert before first ---
        content = path.read_text(encoding="utf-8")
        # Split at the first "---" that's a session separator (not the header)
        # Find end of header block (after the "For current state..." line)
        marker = "For current state, see ai_status.json."
        if marker in content:
            idx = content.index(marker) + len(marker)
            header_part = content[:idx]
            rest = content[idx:]
            new_content = header_part + "\n" + entry + rest
        else:
            # Fallback: just prepend after first line
            new_content = content.rstrip("\n") + "\n" + entry
        path.write_text(new_content, encoding="utf-8")


def stamp_version(git: GitState) -> None:
    """Stamp relay version into ai_status.json during relay-init."""
    path = git.repo_root / STATUS_FILE
    data = read_json(path)
    data["relay_version"] = RELAY_VERSION
    data["relay_initialized"] = today()
    write_json(path, data)


def show_state(git: GitState) -> None:
    """Print current relay state to stdout."""
    path = git.repo_root / STATUS_FILE
    data = read_json(path)

    print(f"{'─' * 50}")
    print(f"  Relay State — {git.repo_root.name}")
    print(f"{'─' * 50}")

    if data:
        print(f"  Last updated:    {data.get('last_updated', '?')}")
        print(f"  Last session:    {data.get('last_session', '?')}")
        print(f"  Branch:          {data.get('branch', '?')} @ {data.get('git_sha', '?')}")
        print(f"  Worktree:        {data.get('worktree_state', '?')}")
        print(f"  Focus:           {data.get('current_focus', '?')}")
        print(f"  Next step:       {data.get('exact_next_step', '?')}")

        blockers = data.get("blockers", [])
        if blockers:
            print(f"  Blockers:        {len(blockers)}")
            for b in blockers:
                desc = b.get("description", b) if isinstance(b, dict) else b
                print(f"    • {desc}")
        else:
            print(f"  Blockers:        none")

        tasks = data.get("open_tasks", [])
        if tasks:
            print(f"  Open tasks:      {len(tasks)}")
            for t in tasks:
                print(f"    • {t}")

        version = data.get("relay_version")
        if version:
            print(f"  Relay version:   {version}")
    else:
        print("  No ai_status.json found. Run relay-init first.")

    print(f"{'─' * 50}")
    print(f"  Git: {git.branch} @ {git.short_sha} ({'dirty' if git.is_dirty else 'clean'})")
    if git.modified:
        for f in git.modified[:10]:
            print(f"    M {f}")
        if len(git.modified) > 10:
            print(f"    ... and {len(git.modified) - 10} more")
    print(f"{'─' * 50}")


# --- CLI ---

def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description="Relay state helper — update ai_status.json and AI_WORK_LOG.md",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""Examples:
  %(prog)s --show                                    # print current state
  %(prog)s --status --tool "Claude Code"             # refresh git state
  %(prog)s --next-step "run pytest" --tool "Gemini"  # set exact next step
  %(prog)s --log --tool "Codex" --summary "Fixed X"  # append log entry
  %(prog)s --status --log --tool "Antigravity"       # both at once
  %(prog)s --init --tool "Claude Code"               # stamp relay version
""",
    )
    p.add_argument("--show", action="store_true", help="Print current relay state")
    p.add_argument("--status", action="store_true", help="Update ai_status.json")
    p.add_argument("--log", action="store_true", help="Append entry to AI_WORK_LOG.md")
    p.add_argument("--init", action="store_true", help="Stamp relay version into ai_status.json")
    p.add_argument("--tool", type=str, default=None, help='Tool name, e.g. "Claude Code"')
    p.add_argument("--next-step", type=str, default=None, help="Exact next step (singular)")
    p.add_argument("--focus", type=str, default=None, help="Current focus / active work area")
    p.add_argument("--summary", type=str, default=None, help="Session summary for log entry")
    p.add_argument("--completed", type=str, nargs="*", default=None, help="Items completed")
    p.add_argument("--repo-root", type=str, default=None, help="Explicit repo root (auto-detected)")
    p.add_argument("--version", action="version", version=f"relay {RELAY_VERSION}")
    return p


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()

    if not any([args.show, args.status, args.log, args.init, args.next_step]):
        parser.error("Specify at least one action: --show, --status, --log, --init, or --next-step")

    try:
        start = Path(args.repo_root).resolve() if args.repo_root else None
        git = get_git_state(start)
    except Exception as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 2

    try:
        # --next-step implies --status
        if args.next_step and not args.status:
            args.status = True

        if args.init:
            stamp_version(git)
            print(f"✓ Stamped relay v{RELAY_VERSION} into {STATUS_FILE}")

        if args.status:
            data = update_status(
                git,
                tool=args.tool,
                next_step=args.next_step,
                focus=args.focus,
                summary=args.summary,
                completed=args.completed,
            )
            print(f"✓ Updated {STATUS_FILE}")

        if args.log:
            append_log(
                git,
                tool=args.tool,
                summary=args.summary,
                next_step=args.next_step,
                completed=args.completed,
            )
            print(f"✓ Appended entry to {WORK_LOG_FILE}")

        if args.show:
            show_state(git)

    except Exception as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 3

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
