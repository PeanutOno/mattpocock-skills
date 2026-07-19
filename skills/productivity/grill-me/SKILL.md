---
name: grill-me
description: A relentless interview to sharpen a plan or design.
disable-model-invocation: true
---

Run a `/grilling` session.

## Asking the user

Every question goes through the harness's structured-question tool — strictly one question per call.

1. **Tool choice.** In opencode, use the `question` tool when available. Other harnesses: use the equivalent structured-question tool. If neither is available, fall back to a numbered text list that preserves the same options and the recommendation in the same order.
2. **Shape.** Offer 2–4 meaningful options per question and use the tool's custom-answer path as the only catch-all, so every listed option is a substantive direction. Pick single vs multi by the question's semantics and what the next step can actually act on: single unless a combination of choices is genuinely supported downstream.
3. **Recommendation.** Every question carries a complete, ready-to-adopt recommended answer grounded in user statements, the repository, or tool output, with a short reason; generic conventions and model priors do not count. Its option or options are listed first and each marked `(Recommended)`.
4. **Batching.** Never batch. One question per `question` call. A dependent question waits for the prior answer and is recomputed from it.
5. **AFK hard gate.** Without an interactive user, pause every question and never adopt the recommendation for them. Do not act until the user confirms shared understanding.
