---
name: frontend-code-review
description: Review a React or Next.js frontend diff for correctness, scope, App Router boundaries, design-system reuse, accessibility, data integration, authorization, performance, tests, and consistency with an approved Storybook prototype. Use before merge or when the user asks for a frontend review. Do not perform a broad rewrite unless explicitly requested.
---

# Frontend Code Review

Find actionable defects and risks before suggesting polish.

## Workflow

1. Read `AGENTS.md`.
2. Identify the intended change and approved Storybook reference.
3. Inspect the diff plus enough surrounding code to understand behavior.
4. Run targeted checks where available.
5. Report findings ordered by severity.
6. Suggest minimal remediation.
7. Do not modify code unless asked.

## Review checklist

### Correctness

- requirement implemented;
- all relevant UI states;
- race conditions;
- stale state;
- duplicate submission;
- pagination/filter behavior;
- error recovery.

### Next.js

- Server Component default;
- minimal Client Component boundary;
- no server-only import in client code;
- appropriate route/loading/error/not-found files;
- explicit cache behavior;
- safe params and search params.

### Architecture

- feature ownership;
- no transport logic in presentational components;
- no duplicate design-system primitives;
- no unnecessary abstraction;
- no unrelated rewrite;
- no generated-file edits.

### Accessibility

- semantic controls;
- labels and names;
- keyboard/focus;
- errors/status;
- dialog behavior;
- color-only meaning.

### Security and permissions

- no secrets in client bundle;
- no token logging;
- UI permission checks not treated as enforcement;
- safe redirect behavior;
- sensitive content not rendered before hiding.

### Performance

- avoid unnecessary client rendering;
- avoid accidental large imports;
- stable list keys;
- avoid avoidable request waterfalls;
- image/font conventions;
- expensive rendering only where justified.

### Tests

- risk-focused coverage;
- loading/error/empty;
- mutations and validation;
- permission states;
- no brittle implementation-detail assertions.

## Severity

- `BLOCKER`: unsafe to merge; security, data-loss, broken core flow, or build failure.
- `HIGH`: likely user-visible defect or serious maintainability risk.
- `MEDIUM`: meaningful edge case, accessibility barrier, or inconsistency.
- `LOW`: limited-impact issue.
- `SUGGESTION`: optional improvement.

Each finding must contain:

- severity and concise title;
- file and line/range when possible;
- why it matters;
- minimal fix.

If no material findings exist, say so and list remaining test or manual-verification gaps.

## Completion report

Use this order:

1. Findings.
2. Assumptions/questions.
3. Checks run.
4. Residual risks.
