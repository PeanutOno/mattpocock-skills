# Ship skills directly to opencode via the agent-skills standard

This ADR supersedes the original 0002 ("ship as a Claude Code plugin") and records the current distribution model: skills are written once in the agent-skills standard and consumed by opencode with no manifest, marketplace, or plugin wrapper.

## Decision

- **No plugin manifest.** Drop `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json`. opencode has no marketplace concept for skills, and the Claude Code plugin was the only consumer of those files.
- **Single skills layout.** Keep the existing `skills/<bucket>/<skill>/SKILL.md` layout — bucketed so promoted (`engineering/`, `productivity/`) and non-promoted (`misc/`, `personal/`, `in-progress/`, `deprecated/`) sets stay separate. opencode walks every nested `SKILL.md` under its discovery roots, so the buckets don't require any glue.
- **Install via skills.sh or symlinks.** End users install via `npx skills add mattpocock/skills` (writes into `.agents/skills/`). Maintainers and people hacking on the set run `scripts/link-skills.sh`, which now targets `~/.config/opencode/skills/` (opencode global) and `~/.agents/skills/` (agent-skills standard, also picked up by opencode).
- **Native opencode plugins stay skills, not JS hooks.** Anything Claude Code did via `.claude/settings.json` hooks (e.g. `git-guardrails-claude-code`) becomes an opencode [plugin](https://opencode.ai/docs/plugins/) loaded from `.opencode/plugins/` — but the user-facing entry point remains a `SKILL.md` that explains how to install it.

## What this leaves alone

- Frontmatter is just `name` + `description`. `disable-model-invocation` is still set on user-invoked skills as a signal; opencode ignores unknown fields, but the signal is load-bearing for Claude Code/Codex users who still pull from this repo. `agents/openai.yaml` stays for the same reason — it's a no-op for opencode and keeps the bucket dual-installable for the small remaining Codex audience.
- The docs tree (`docs/<bucket>/<skill>.md`) and the bucket READMEs are unchanged in shape.

## Why we don't write a native opencode plugin

An opencode "plugin" is a JS/TS module exporting hooks (see [opencode plugin docs](https://opencode.ai/docs/plugins/)). It's the right primitive for `git-guardrails`-style guardrails, which is why the rewritten `git-guardrails` skill now ships an opencode plugin template. But wrapping the *whole skill set* in a plugin would mean re-emitting every `SKILL.md` as a JS file the plugin reads — duplication, two sources of truth, no upside. The discovery model is enough.