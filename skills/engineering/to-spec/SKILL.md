---
name: to-spec
description: Turn the current conversation into a spec and publish it to the project issue tracker — no interview, just synthesis of what you've already discussed.
disable-model-invocation: true
---

This skill takes the current conversation context and codebase understanding and produces a spec (you may know this document as a PRD). Do NOT interview the user — just synthesize what you already know.

The issue tracker and triage label vocabulary should have been provided to you — run `/setup-matt-pocock-skills` if not.

## Asking the user

1. In opencode, use the `question` tool when available; other harnesses use the equivalent structured-question tool. Fall back to numbered prose only when no structured tool is available, keeping the same options and recommendation.
2. Offer 2–4 meaningful options and preserve a custom answer. Use the tool's custom input as the only catch-all, so every listed option is a substantive direction. Use single-select for mutually exclusive choices; use multi-select only when every option and the subsequent flow supports the full combination.
3. When there is a basis, give one complete recommended answer in the question with a short reason, list its option or options first, and mark each `(Recommended)`. Evidence must come from user statements, the repository, or tool output; generic conventions and model priors do not count. When only the user knows the fact, ask how to provide it, or note no preference.
4. Batch only independent questions in one call; questions that depend on a prior answer wait and are recomputed once the answer lands.
5. With no user interaction, pause on requirements/scope, irreversible changes, external side-effects, costs, permissions, or sensitive data. Only clearly AFK-capable flows may proceed on a local, reversible, non-requirements question using the recommended answer — and the assumption must be stated when chosen.

## Process

1. Explore the repo to understand the current state of the codebase, if you haven't already. Use the project's domain glossary vocabulary throughout the spec, and respect any ADRs in the area you're touching.

2. Sketch out the seams at which you're going to test the feature. Existing seams should be preferred to new ones. Use the highest seam possible. If new seams are needed, propose them at the highest point you can. The fewer seams across the codebase, the better - the ideal number is one.

Confirm the seams via a structured question — this is the one interactive seam in the skill; treat it as a hard gate and do not publish the spec until the user has approved the seams.

3. Write the spec using the template below, then publish it to the project issue tracker. Apply the `ready-for-agent` triage label - no need for additional triage.

<spec-template>

## Problem Statement

The problem that the user is facing, from the user's perspective.

## Solution

The solution to the problem, from the user's perspective.

## User Stories

A LONG, numbered list of user stories. Each user story should be in the format of:

1. As an <actor>, I want a <feature>, so that <benefit>

<user-story-example>
1. As a mobile bank customer, I want to see balance on my accounts, so that I can make better informed decisions about my spending
</user-story-example>

This list of user stories should be extremely extensive and cover all aspects of the feature.

## Implementation Decisions

A list of implementation decisions that were made. This can include:

- The modules that will be built/modified
- The interfaces of those modules that will be modified
- Technical clarifications from the developer
- Architectural decisions
- Schema changes
- API contracts
- Specific interactions

Do NOT include specific file paths or code snippets. They may end up being outdated very quickly.

Exception: if a prototype produced a snippet that encodes a decision more precisely than prose can (state machine, reducer, schema, type shape), inline it within the relevant decision and note briefly that it came from a prototype. Trim to the decision-rich parts — not a working demo, just the important bits.

## Testing Decisions

A list of testing decisions that were made. Include:

- A description of what makes a good test (only test external behavior, not implementation details)
- Which modules will be tested
- Prior art for the tests (i.e. similar types of tests in the codebase)

## Out of Scope

A description of the things that are out of scope for this spec.

## Further Notes

Any further notes about the feature.

</spec-template>
