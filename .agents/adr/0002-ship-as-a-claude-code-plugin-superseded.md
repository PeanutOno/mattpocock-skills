# Supersession: ADR 0002 — Claude Code plugin (replaced by opencode-native skills)

ADR 0002 ("Ship the skill set as a native Claude Code plugin; defer a native Codex plugin") is **superseded** as of the opencode-native rework. The Claude Code plugin manifest is gone; the project now ships skills directly to opencode via the agent-skills standard.

## What replaces it

opencode auto-discovers `SKILL.md` files in `.opencode/skills/`, `.agents/skills/`, and `.claude/skills/` (Claude-compatible path) at every level from the cwd up to the git worktree. That gives the project a single discovery surface — no manifest, no marketplace, no install command beyond copying or symlinking the skills.

For dev/install, `scripts/link-skills.sh` now targets `~/.config/opencode/skills/` (opencode global) and `~/.agents/skills/` (agent-skills standard, also discovered by opencode).

## Why

- `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` were Claude Code-specific — opencode has no equivalent marketplace concept; its native plugin system is JS/TS hooks, not skill manifests.
- The skills themselves are harness-agnostic: frontmatter is just `name` + `description`, and opencode ignores unknown fields. No duplication or generated copies needed.
- The bucketed `skills/` layout (`engineering/`, `productivity/`, `misc/`, …) carries over unchanged — opencode walks every nested `SKILL.md`.

See ADR 0003 for the current architecture decision.