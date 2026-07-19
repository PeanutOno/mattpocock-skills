---
name: git-guardrails
description: Set up an opencode plugin to block dangerous git commands (push, reset --hard, clean, branch -D, etc.) before the agent executes them. Use when the user wants to prevent destructive git operations or add git safety hooks to opencode.
---

# Setup Git Guardrails for opencode

Sets up an opencode [plugin](https://opencode.ai/docs/plugins/) that intercepts and blocks dangerous git commands before the agent runs them.

## What Gets Blocked

- `git push` (all variants including `--force`)
- `git reset --hard`
- `git clean -f` / `git clean -fd`
- `git branch -D`
- `git checkout .` / `git restore .`

When blocked, the agent sees an error telling it that the command was rejected by a guardrail.

## Steps

### 1. Ask scope

Ask the user: install for **this project only** (`.opencode/plugins/`) or **all projects** (`~/.config/opencode/plugins/`)?

### 2. Copy the plugin

The bundled plugin is at: [plugins/git-guardrails.js](plugins/git-guardrails.js)

Copy it to the target location based on scope:

- **Project**: `.opencode/plugins/git-guardrails.js`
- **Global**: `~/.config/opencode/plugins/git-guardrails.js`

opencode auto-loads every `.js` and `.ts` file in these directories at startup — no manifest entry is needed.

### 3. Verify

Ask the agent to attempt `git push origin main`. It should be blocked with the guardrail error message.

### 4. Ask about customization

Ask if the user wants to add or remove any patterns from the blocked list. Edit the copied plugin's `DANGEROUS_PATTERNS` array accordingly.