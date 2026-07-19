---
name: opencode-handoff
description: Hand the current conversation off to a fresh opencode session that picks up the work immediately.
argument-hint: "What will the next session be used for?"
disable-model-invocation: true
---

Write a handoff summary of the current conversation so a fresh opencode session can continue the work. Launch the session seeded with the summary as its prompt:

```
opencode run --title "<descriptive name>" "<handoff summary>"
```

Always pass `--title` with a descriptive name (e.g. `--title "Fix login bug"`) — it sets the session title shown in `opencode session list` and the session picker.

The `opencode run` command starts a new session in the current working directory, runs the prompt non-interactively, and exits when the agent finishes. To manage sessions afterwards, use `opencode session list`, `opencode session delete <id>`, or `opencode attach <session-id>` to drop back into the TUI against that session.

For fire-and-forget background execution, enable experimental background subagents (`OPENCODE_EXPERIMENTAL_BACKGROUND_SUBAGENTS=true`) and invoke the subagent task tool instead.

Include a "suggested skills" section in the summary, which suggests skills that the next agent should invoke.

Do not duplicate content already captured in other artifacts (PRDs, plans, ADRs, issues, commits, diffs). Reference them by path or URL instead.

Redact any sensitive information, such as API keys, passwords, or personally identifiable information — the summary becomes the agent's prompt.

If the user passed arguments, treat them as a description of what the next session will focus on and tailor the summary accordingly.