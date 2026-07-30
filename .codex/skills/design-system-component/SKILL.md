---
name: design-system-component
description: Create or evolve reusable React design-system components with Storybook stories, accessible behavior, typed APIs, and repository-consistent styling. Use when several screens need the same primitive or composed UI pattern. Do not use for one-off feature-specific layout that has no credible reuse.
---

# Design System Component

Build the smallest reusable component that satisfies current use cases without speculative generalization.

## Workflow

1. Read `AGENTS.md`.
2. Search for an existing equivalent before creating anything.
3. Inspect neighboring design-system components and stories.
4. List required use cases and derive the minimum API.
5. Implement the component.
6. Add representative stories and behavioral tests when appropriate.
7. Run lint, typecheck, tests, and Storybook checks.

## API rules

- Prefer explicit, strongly typed props.
- Prefer composition and slots over many boolean flags.
- Preserve native HTML semantics.
- Support `className` only according to project conventions.
- Forward refs when consumers reasonably need DOM access.
- Avoid exposing internal implementation details.
- Avoid broad unions such as arbitrary strings when a stable variant set exists.
- Preserve controlled and uncontrolled semantics when relevant.
- Do not mix remote data access or feature business rules into design-system components.

## Accessibility baseline

Evaluate:

- semantic element choice;
- accessible name;
- keyboard operation;
- visible focus;
- disabled semantics;
- error/status announcements;
- dialog focus management;
- label and description relationships;
- reduced-motion preferences where animation exists.

Use an established accessible primitive library already present in the repository when suitable.

## Story coverage

Include applicable stories for:

- default;
- variants;
- sizes;
- disabled;
- loading;
- error;
- long content;
- composition;
- keyboard-sensitive behavior;
- narrow container.

## Change safety

When modifying an existing component:

1. Search usages.
2. Preserve backwards compatibility unless a breaking change is explicitly approved.
3. Update dependent stories and tests.
4. Explain migration impact.

## Completion report

State:

- why reuse is justified;
- resulting public API;
- accessibility behavior;
- stories/tests added;
- usages affected;
- commands run.
