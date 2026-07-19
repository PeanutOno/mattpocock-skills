---
"mattpocock-skills": major
---

Repoint the skill set at **opencode** as the primary target harness. opencode auto-discovers `SKILL.md` files from `.opencode/skills/`, `.agents/skills/`, and `.claude/skills/` — no manifest, marketplace, or install command needed.

- **Drop the Claude Code plugin surface.** `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` are deleted. The README's "Install as a Claude Code plugin" section is replaced with "Using with opencode" pointing at the discovery paths.
- **`CLAUDE.md` merges into `AGENTS.md`.** The repo now has a single `AGENTS.md` (the previously-broken 9-byte stub is replaced with the real content). The "edit `CLAUDE.md` if it exists, else `AGENTS.md`" rule in `setup-matt-pocock-skills` collapses to "edit `AGENTS.md`".
- **`claude-handoff` becomes `opencode-handoff`.** Same shape (`disable-model-invocation: true`, user-invoked), but the launch command is now `opencode run --title "<name>" "<handoff summary>"` instead of `claude --bg`.
- **`git-guardrails-claude-code` becomes `git-guardrails`.** The `.claude/settings.json` PreToolUse hook is replaced with an opencode [plugin](https://opencode.ai/docs/plugins/) (`plugins/git-guardrails.js`) using `tool.execute.before`. Drop it into `.opencode/plugins/` (project) or `~/.config/opencode/plugins/` (global).
- **`scripts/link-skills.sh` retargets opencode.** Symlinks now land in `~/.config/opencode/skills/` (opencode global) and `~/.agents/skills/` (agent-skills standard, also discovered by opencode). The `~/.claude/skills` target is removed.
- **ADR 0002 superseded, ADR 0003 added.** "Ship as Claude Code plugin" is replaced by "Ship skills directly to opencode via the agent-skills standard".
- **Docs clarified.** `CONTEXT.md`, `README.md`, `.agents/invocation.md`, and the bucket READMEs lose the Codex/Claude-specific invocation notes; opencode's `permission.skill` rule is the recommended way to harden user-invoked skills against auto-loading.

Skills themselves are unchanged in shape — frontmatter is just `name` + `description`, and opencode ignores unknown fields. `disable-model-invocation` and `agents/openai.yaml` stay as Codex/Claude-compat metadata so the bucket remains dual-installable, but opencode is the primary target.