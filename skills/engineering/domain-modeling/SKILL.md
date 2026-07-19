---
name: domain-modeling
description: Build and sharpen a project's domain model. Use when the user wants to pin down domain terminology or a ubiquitous language, record an architectural decision, or when another skill needs to maintain the domain model.
---

# Domain Modeling

Actively build and sharpen the project's domain model as you design. This is the *active* discipline — challenging terms, inventing edge-case scenarios, and writing the glossary and decisions down the moment they crystallise. (Merely *reading* `CONTEXT.md` for vocabulary is not this skill — that's a one-line habit any skill can do. This skill is for when you're changing the model, not just consuming it.)

## Asking the user

When this skill needs user input, **use opencode's `question` tool when available** — a structured picker (single- or multi-select) with the recommended option or option set marked `(Recommended)`. In other harnesses use the equivalent structured ask tool. Only when neither is available, fall back to **numbered plain text in chat** — keep the same options and recommendation so the answer is portable.

Conventions:

- **2–4 meaningful options**, with a free-text answer when the tool exposes one. Use that custom-input field as the only catch-all; every listed option must be a substantive direction.
- **Single-select by default.** Only switch to multi-select when both the options _and_ the rest of this skill can handle every combination of picks — otherwise the result is ambiguous.
- **Lead with the recommendation.** When there's evidence (a ref you already resolved, a file you already found), name the full recommended answer in the question text with a one-line reason, put its option or options first, and mark each `(Recommended)`. Evidence must come from user statements, the repository, or tool output; generic conventions and model priors do not count. For pure fact-lookups with no basis, recommend a fact-finding form or state no preference.
- **Batch independent questions; serialise dependent ones.** Resolve one dependent decision at a time — a new definition locks downstream scope — wait and recompute its options before asking the next question.
- **Pause when there's no human.** Decisions about requirements/scope, irreversible changes, external side effects, money, permissions, or sensitive data must wait. Other decisions are AFK-capable only when local, reversible, and not requirements; state the assumption before proceeding.

### Skill-specific

Surface every one of these as a structured question, in this order of severity:

- **Term conflict** with an existing glossary entry.
- **Fuzzy / overloaded term** that needs a precise canonical replacement.
- **Scenario boundary** under stress-test — which side of the line the new concept sits on.
- **Code contradiction** with what the user just stated.

## File structure

Most repos have a single context:

```
/
├── CONTEXT.md
├── docs/
│   └── adr/
│       ├── 0001-event-sourced-orders.md
│       └── 0002-postgres-for-write-model.md
└── src/
```

If a `CONTEXT-MAP.md` exists at the root, the repo has multiple contexts. The map points to where each one lives:

```
/
├── CONTEXT-MAP.md
├── docs/
│   └── adr/                          ← system-wide decisions
├── src/
│   ├── ordering/
│   │   ├── CONTEXT.md
│   │   └── docs/adr/                 ← context-specific decisions
│   └── billing/
│       ├── CONTEXT.md
│       └── docs/adr/
```

Create files lazily — only when you have something to write. If no `CONTEXT.md` exists, create one when the first term is resolved. If no `docs/adr/` exists, create it when the first ADR is needed.

## During the session

### Challenge against the glossary

When the user uses a term that conflicts with the existing language in `CONTEXT.md`, call it out immediately. "Your glossary defines 'cancellation' as X, but you seem to mean Y — which is it?"

### Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term. "You're saying 'account' — do you mean the Customer or the User? Those are different things."

### Discuss concrete scenarios

When domain relationships are being discussed, stress-test them with specific scenarios. Invent scenarios that probe edge cases and force the user to be precise about the boundaries between concepts.

### Cross-reference with code

When the user states how something works, check whether the code agrees. If you find a contradiction, surface it: "Your code cancels entire Orders, but you just said partial cancellation is possible — which is right?"

### Update CONTEXT.md inline

When a term is resolved, update `CONTEXT.md` right there. Don't batch these up — capture them as they happen. Use the format in [CONTEXT-FORMAT.md](./CONTEXT-FORMAT.md).

`CONTEXT.md` should be totally devoid of implementation details. Do not treat `CONTEXT.md` as a spec, a scratch pad, or a repository for implementation decisions. It is a glossary and nothing else.

### Offer ADRs sparingly

Only offer to create an ADR when all three are true:

1. **Hard to reverse** — the cost of changing your mind later is meaningful
2. **Surprising without context** — a future reader will wonder "why did they do it this way?"
3. **The result of a real trade-off** — there were genuine alternatives and you picked one for specific reasons

If any of the three is missing, skip the ADR. Use the format in [ADR-FORMAT.md](./ADR-FORMAT.md).
