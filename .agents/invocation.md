# Model-invoked vs user-invoked

Every `SKILL.md` in this repo is a skill. The one axis that splits them is **invocation** — who can reach it:

- **User-invoked** — reachable **only by the human typing its name**. Mark with `disable-model-invocation: true` in the frontmatter. The `description` is **human-facing**: a one-line summary read by a person browsing slash-commands. Strip trigger lists ("Use when the user says…"). In opencode, narrow this further with a `permission.skill` rule in `opencode.json` (e.g. `"user-only-*": "ask"`) so the model never auto-loads it.
- **Model-invoked** — reachable by **model or user**. The default: omit `disable-model-invocation`. The `description` is **model-facing** and keeps rich trigger phrasing ("Use when the user wants…, mentions…, asks for…") so auto-invocation fires. The test for whether a skill should stay model-invoked: _could the model usefully reach for this autonomously?_ (Reuse is the reason to extract a skill, not the test.)

opencode lists every skill it discovers in the `skill` tool description and the model decides which to load. `disable-model-invocation` is a signal, not a hard barrier — pair it with a `permission.skill` rule in `opencode.json` if you need to actually hide a skill from the model.

Each skill also carries an `agents/openai.yaml` beside its `SKILL.md`. opencode ignores it, but it holds Codex picker metadata (`interface.display_name`, `interface.short_description`) so the same set still installs cleanly into Codex via `npx skills add`. Keep the file even though opencode doesn't read it — it's the cheapest way to keep the bucket dual-installable.

Bucket `README.md`s and the top-level `README.md` group entries into **User-invoked** and **Model-invoked**.

## Dependencies between them

Dependencies are expressed as **`/skill`-style prose invocation** ("Run the `/grilling` skill"), not deep `../other-skill/FILE.md` cross-references. Shared reference docs live inside the skill that owns them; other skills reach that material by invoking the skill, not by linking across folders.

## Passive vs active domain work

Merely _reading_ `CONTEXT.md` for vocabulary is a one-line prose pointer, not the `domain-modeling` skill. Only the active build/sharpen discipline (challenge terms, edge-case scenarios, write ADRs, update `CONTEXT.md` inline) is `domain-modeling`.