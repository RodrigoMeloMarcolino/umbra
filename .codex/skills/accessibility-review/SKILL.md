---
name: accessibility-review
description: Review React, Storybook, or Next.js UI for semantic HTML, accessible names, keyboard use, focus, forms, dialogs, status announcements, contrast-related risks, and responsive interaction. Use as a focused accessibility audit before release or after implementing a screen. Do not silently redesign the UI or claim formal WCAG compliance from code review alone.
---

# Accessibility Review

Perform an evidence-based review and make minimal fixes when requested.

## Workflow

1. Read `AGENTS.md`.
2. Inspect the target screen, stories, shared components, and tests.
3. Run available automated accessibility checks.
4. Review manually from code and, when available, browser behavior.
5. Classify findings.
6. Fix only in-scope issues or provide a remediation plan.
7. Re-run relevant checks.

## Review areas

### Structure

- semantic landmarks;
- heading hierarchy;
- lists and tables;
- button versus link semantics;
- language and page title.

### Names and descriptions

- form labels;
- icon-only controls;
- helper text;
- field errors;
- image alternatives;
- accessible names for custom controls.

### Keyboard and focus

- logical tab order;
- visible focus;
- no keyboard traps;
- dialog focus entry/return;
- menu and combobox behavior;
- skip/navigation support where needed.

### Dynamic feedback

- loading;
- success;
- errors;
- validation;
- toasts;
- expanded/collapsed state;
- selected/current state.

### Visual and responsive risks

- color-only meaning;
- contrast concerns;
- zoom/reflow;
- clipping;
- target size;
- reduced motion.

## Severity

Use:

- `BLOCKER`: prevents a core task for keyboard or assistive-technology users.
- `HIGH`: major barrier with no reasonable workaround.
- `MEDIUM`: meaningful friction or standards issue.
- `LOW`: limited impact or polish.
- `NOTE`: manual verification or enhancement.

For every finding include:

- severity;
- file/component;
- observed behavior;
- user impact;
- concrete remediation;
- whether automated or manual verification is needed.

## Constraints

- Do not claim full WCAG conformance from static review.
- Do not add ARIA when native HTML solves the problem.
- Do not change visual design beyond what is needed without approval.

## Completion report

Provide findings first, then fixes made, checks run, and residual manual tests.
