---
name: storybook-screen-prototype
description: Create or update screen-level UI prototypes in Storybook for React and Next.js projects. Use before production implementation when a requirement, user flow, screenshot, or rough description must become a reviewable mocked screen. Do not use for wiring real APIs or creating production App Router routes unless explicitly requested.
---

# Storybook Screen Prototype

Create a reviewable screen prototype that acts as a visual and behavioral contract for later implementation.

## Workflow

1. Read the root `AGENTS.md` and inspect the closest existing stories.
2. Identify:
   - user goal;
   - primary and secondary actions;
   - information hierarchy;
   - states and edge cases;
   - existing design-system components.
3. Inspect existing tokens, typography, spacing, layout primitives, icons, and responsive conventions.
4. Produce a short implementation outline before editing.
5. Create or update the screen prototype and its stories.
6. Run Storybook-related checks, lint, and typecheck when available.
7. Summarize visual decisions and unresolved product questions.

## Required states

Create only states that apply, but explicitly evaluate all of these:

- default/populated;
- loading;
- empty;
- recoverable error;
- success feedback;
- disabled or submitting;
- permission denied;
- long text and large data;
- narrow/mobile viewport.

For asynchronous states, prefer Storybook args, loaders, decorators, or MSW handlers according to existing project conventions.

## Boundaries

- Use mock data. Do not connect a real backend.
- Do not create a production route during prototyping.
- Do not place business rules in the prototype.
- Do not introduce a new component library when the repository already has one.
- Do not silently redesign established patterns.
- Do not make the entire prototype one monolithic component.
- Do not over-abstract components that only exist to communicate the screen concept.

## File placement

Follow repository conventions. When no convention exists, prefer:

```text
src/features/<feature>/
├── prototypes/
│   └── <ScreenName>.tsx
├── stories/
│   └── <ScreenName>.stories.tsx
└── mocks/
    └── <feature>.mock.ts
```

## Story expectations

- Use typed Storybook metadata and stories.
- Give stories descriptive names based on state.
- Make important callbacks visible through Storybook actions where supported.
- Include realistic data rather than lorem ipsum.
- Keep deterministic mock data.
- Add viewport parameters for materially different mobile behavior.
- Use accessibility-friendly markup even in prototypes.

## Completion report

Report:

- stories created or changed;
- components reused;
- new primitives proposed;
- states represented;
- commands executed;
- product or design decisions requiring approval.
