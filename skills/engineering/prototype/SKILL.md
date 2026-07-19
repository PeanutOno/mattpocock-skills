---
name: prototype
description: Build a throwaway prototype to answer a design question. Use when the user wants to sanity-check whether a state model or logic feels right, or explore what a UI should look like.
---

# Prototype

A prototype is **throwaway code that answers a question**. The question decides the shape.

## Asking the user

When this skill needs user input, **use opencode's `question` tool when available** — a structured picker (single- or multi-select) with the recommended option or option set marked `(Recommended)`. In other harnesses use the equivalent structured ask tool. Only when neither is available, fall back to **numbered plain text in chat** — keep the same options and recommendation so the answer is portable.

Conventions:

- **2–4 meaningful options**, with a free-text answer when the tool exposes one. Use that custom-input field as the only catch-all; every listed option must be a substantive direction.
- **Single-select by default.** Only switch to multi-select when both the options _and_ the rest of this skill can handle every combination of picks — otherwise the result is ambiguous.
- **Lead with the recommendation.** When there's evidence (a ref you already resolved, a file you already found), name the full recommended answer in the question text with a one-line reason, put its option or options first, and mark each `(Recommended)`. Evidence must come from user statements, the repository, or tool output; generic conventions and model priors do not count. For pure fact-lookups with no basis, recommend a fact-finding form or state no preference.
- **Batch independent questions; serialise dependent ones.** If a downstream question depends on the previous answer, wait and recompute its options — don't ask a question whose options would be wrong half the time.
- **Pause when there's no human.** Decisions about requirements/scope, irreversible changes, external side effects, money, permissions, or sensitive data must wait. Other decisions are AFK-capable only when local, reversible, and not requirements; state the assumption before proceeding.

### Skill-specific

- **LOGIC vs UI ambiguity** — structured single-select of the two branches. If the user can't be reached **and** the question is genuinely ambiguous, **pause** and explain which branch you'd take and why — the choice defines requirements/scope, which is not AFK-capable. Do not auto-build a branch on the user's behalf.

## Pick a branch

Identify which question is being answered — from the user's prompt, the surrounding code, or by asking if the user is around:

- **"Does this logic / state model feel right?"** → [LOGIC.md](LOGIC.md). Build a tiny interactive terminal app that pushes the state machine through cases that are hard to reason about on paper.
- **"What should this look like?"** → [UI.md](UI.md). Generate several radically different UI variations on a single route, switchable via a URL search param and a floating bottom bar.

The two branches produce very different artifacts — getting this wrong wastes the whole prototype. If the question is genuinely ambiguous and the user isn't reachable, stop before building. State which branch you would recommend and why, then wait; choosing the prototype's question defines requirements and is not AFK-capable.

## Rules that apply to both

1. **Throwaway from day one, and clearly marked as such.** Locate the prototype code close to where it will actually be used (next to the module or page it's prototyping for) so context is obvious — but name it so a casual reader can see it's a prototype, not production. For throwaway UI routes, obey whatever routing convention the project already uses; don't invent a new top-level structure.
2. **One command to run.** Whatever the project's existing task runner supports — `pnpm <name>`, `python <path>`, `bun <path>`, etc. The user must be able to start it without thinking.
3. **No persistence by default.** State lives in memory. Persistence is the thing the prototype is _checking_, not something it should depend on. If the question explicitly involves a database, hit a scratch DB or a local file with a clear "PROTOTYPE — wipe me" name.
4. **Skip the polish.** No tests, no error handling beyond what makes the prototype _runnable_, no abstractions. The point is to learn something fast.
5. **Surface the state.** After every action (logic) or on every variant switch (UI), print or render the full relevant state so the user can see what changed.
6. **Capture it when done.** Fold any validated decision into the real code, then capture the prototype itself as a **primary source**: commit it to a throwaway branch, out of main, and leave a context pointer to that branch on the implementation issue. Capture the answer too — the verdict and the question it settled — in the issue or a commit. The main branch keeps only the validated decision.
