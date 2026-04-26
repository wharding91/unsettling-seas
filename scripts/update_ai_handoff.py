#!/usr/bin/env python3
"""
update_ai_handoff.py — manage AI agent handoff state for Unsettling Seas.

Reads and writes three files in the repo root:
  ai_status.json  — machine-readable current state
  AI_WORK_LOG.md  — append-only session log (new entries prepended)
  AI_CONTEXT.md   — read-only by this script (for reference)

Usage
-----
  python scripts/update_ai_handoff.py --status
  python scripts/update_ai_handoff.py --next-step "Fix _config.yml url: value"
  python scripts/update_ai_handoff.py --log "Fixed duplicate permalink key in _config.yml"
  python scripts/update_ai_handoff.py --append-log
  python scripts/update_ai_handoff.py --update-sha
  python scripts/update_ai_handoff.py --blocker "Waiting on deployed URL confirmation"
  python scripts/update_ai_handoff.py --clear-blockers

Flags may be combined, e.g.:
  python scripts/update_ai_handoff.py --update-sha --next-step "Add Herrera writer profile"
"""

import argparse
import json
import os
import subprocess
import sys
from datetime import date
from pathlib import Path


# ---------------------------------------------------------------------------
# Repo root detection
# ---------------------------------------------------------------------------

def find_repo_root(start: Path) -> Path:
    """Walk up from start until a .git directory is found."""
    current = start.resolve()
    for parent in [current, *current.parents]:
        if (parent / ".git").exists():
            return parent
    raise RuntimeError(f"No git repository found above {start}")


REPO_ROOT = find_repo_root(Path(__file__))
STATUS_FILE = REPO_ROOT / "ai_status.json"
WORK_LOG = REPO_ROOT / "AI_WORK_LOG.md"


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def git_sha() -> str:
    result = subprocess.run(
        ["git", "rev-parse", "HEAD"],
        capture_output=True, text=True, cwd=REPO_ROOT
    )
    return result.stdout.strip() if result.returncode == 0 else "unknown"


def git_branch() -> str:
    result = subprocess.run(
        ["git", "branch", "--show-current"],
        capture_output=True, text=True, cwd=REPO_ROOT
    )
    return result.stdout.strip() if result.returncode == 0 else "unknown"


def load_status() -> dict:
    if not STATUS_FILE.exists():
        sys.exit(f"Error: {STATUS_FILE} not found. Run /relay-init first.")
    with STATUS_FILE.open() as f:
        return json.load(f)


def save_status(data: dict) -> None:
    data["updated"] = str(date.today())
    with STATUS_FILE.open("w") as f:
        json.dump(data, f, indent=2)
        f.write("\n")


# ---------------------------------------------------------------------------
# Commands
# ---------------------------------------------------------------------------

def cmd_status() -> None:
    data = load_status()
    print(json.dumps(data, indent=2))


def cmd_next_step(text: str) -> None:
    data = load_status()
    data["next_step"]["description"] = text
    # Clear the command field so it doesn't mislead; caller can set it manually
    data["next_step"].pop("command", None)
    data["next_step"].pop("file", None)
    data["next_step"].pop("todo_item", None)
    save_status(data)
    print(f"Next step updated: {text}")


def cmd_update_sha() -> None:
    data = load_status()
    sha = git_sha()
    branch = git_branch()
    data["git_sha"] = sha
    data["branch"] = branch
    save_status(data)
    print(f"SHA updated: {sha[:12]}  branch: {branch}")


def cmd_blocker(text: str) -> None:
    data = load_status()
    blockers = data.get("blockers", [])
    if text not in blockers:
        blockers.append(text)
    data["blockers"] = blockers
    save_status(data)
    print(f"Blocker added: {text}")


def cmd_clear_blockers() -> None:
    data = load_status()
    data["blockers"] = []
    save_status(data)
    print("Blockers cleared.")


def cmd_log(message: str) -> None:
    """Prepend a new dated entry to AI_WORK_LOG.md."""
    sha = git_sha()
    branch = git_branch()
    today = str(date.today())

    entry = (
        f"## {today} — session note\n\n"
        f"**Branch:** {branch} @ {sha[:12]}\n\n"
        f"{message.strip()}\n\n"
        "---\n\n"
    )

    if WORK_LOG.exists():
        existing = WORK_LOG.read_text()
        # Insert after the header block (first blank line after "# AI_WORK_LOG…")
        header_end = existing.find("\n---\n")
        if header_end == -1:
            # No separator found — just prepend after the first heading
            newline_pos = existing.find("\n\n")
            insert_at = newline_pos + 2 if newline_pos != -1 else 0
        else:
            insert_at = header_end + 5  # after "\n---\n"
        new_content = existing[:insert_at] + entry + existing[insert_at:]
    else:
        new_content = "# AI_WORK_LOG.md — append-only session log\n\nNewest entries at top.\n\n---\n\n" + entry

    WORK_LOG.write_text(new_content)
    print(f"Log entry prepended to {WORK_LOG.name}")


def cmd_append_log() -> None:
    """Open AI_WORK_LOG.md in $EDITOR for manual editing."""
    editor = os.environ.get("EDITOR", os.environ.get("VISUAL", "vi"))
    os.execvp(editor, [editor, str(WORK_LOG)])


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Manage AI agent handoff state for Unsettling Seas.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument(
        "--status",
        action="store_true",
        help="Print ai_status.json",
    )
    parser.add_argument(
        "--next-step",
        metavar="TEXT",
        help="Update the next_step description in ai_status.json",
    )
    parser.add_argument(
        "--log",
        metavar="MESSAGE",
        help="Prepend a dated entry to AI_WORK_LOG.md (auto-fills date and git SHA)",
    )
    parser.add_argument(
        "--append-log",
        action="store_true",
        help="Open AI_WORK_LOG.md in $EDITOR for manual editing",
    )
    parser.add_argument(
        "--update-sha",
        action="store_true",
        help="Update git_sha and branch in ai_status.json to current HEAD",
    )
    parser.add_argument(
        "--blocker",
        metavar="TEXT",
        help="Append a blocker string to ai_status.json",
    )
    parser.add_argument(
        "--clear-blockers",
        action="store_true",
        help="Clear all blockers in ai_status.json",
    )

    args = parser.parse_args()

    if not any(vars(args).values()):
        parser.print_help()
        sys.exit(0)

    # Order matters for combined flags: sha first, then content, then display
    if args.update_sha:
        cmd_update_sha()
    if args.next_step:
        cmd_next_step(args.next_step)
    if args.blocker:
        cmd_blocker(args.blocker)
    if args.clear_blockers:
        cmd_clear_blockers()
    if args.log:
        cmd_log(args.log)
    if args.status:
        cmd_status()
    if args.append_log:
        cmd_append_log()  # exec — must be last


if __name__ == "__main__":
    main()
