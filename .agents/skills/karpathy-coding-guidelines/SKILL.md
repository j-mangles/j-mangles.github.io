---
name: "karpathy-coding-guidelines"
description: "Use when writing, editing, reviewing or refactoring code, so changes stay simple, surgical and verified instead of overbuilt or sprawling."
---

# Coding guidelines (Karpathy-style)

Adapted from forrestchang's andrej-karpathy-skills (MIT, github.com/multica-ai/andrej-karpathy-skills), which distils Andrej Karpathy's public observations on common LLM coding mistakes. Rule 1 is adjusted to fit how this user wants work done.

These lean toward care over speed. For trivial tasks, use judgment.

## 1. Think before coding

Don't hide confusion. Surface tradeoffs.

- State the assumptions you're making.
- If a reasonable assumption exists, make it, say what it was, and keep going. Ask only when something important is genuinely unclear or a wrong guess would be expensive or hard to undo.
- If there are several reasonable readings and the choice matters, name them instead of picking one silently.
- If a simpler approach exists, say so. Push back when it's warranted.

## 2. Simplicity first

The minimum code that solves the problem. Nothing speculative.

- No features beyond what was asked.
- No abstractions for code used once.
- No flexibility or configuration nobody asked for.
- No error handling for situations that can't happen.
- If 200 lines could be 50, rewrite it.

Test: would a senior engineer call this overcomplicated? If so, simplify.

## 3. Surgical changes

Touch only what you must. Clean up only your own mess.

- Don't "improve" nearby code, comments or formatting.
- Don't refactor things that aren't broken.
- Match the existing style, even if you'd do it differently.
- If you notice unrelated dead code or a problem, mention it; don't delete or fix it unasked.
- Remove imports, variables or functions that your own change made unused, and nothing else.
- In a shared repo, pull first, and never overwrite or reformat files outside the task.

Test: every changed line traces back to the request.

## 4. Goal-driven execution

Define success. Loop until it's verified.

- "Add validation" becomes: write tests for bad input, then make them pass.
- "Fix the bug" becomes: write a test that reproduces it, then make it pass.
- "Refactor X" becomes: tests pass before and after.
- For visual work, "looks right" becomes: screenshot at the widths it ships at and check it.

For multi-step work, keep a short plan with a check for each step:

1. [step] → verify: [check]
2. [step] → verify: [check]

Strong success criteria let you work independently; weak ones ("make it work") mean constant back-and-forth.