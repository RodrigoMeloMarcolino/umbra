---
name: implement-screen-from-story
description: Convert an approved Storybook screen prototype into production Next.js App Router code while preserving the approved UI and replacing mocks with real application boundaries. Use after a screen story has been reviewed. Do not use when no approved story or equivalent visual contract exists unless the user explicitly accepts implementation from requirements alone.
---

# Implement Screen From Story

Treat the approved story as the visual and interaction contract, not as the final architecture.

## Workflow

1. Read `AGENTS.md`.
2. Locate the approved story, prototype component, mock data, and related design-system components.
3. Inspect the target route and neighboring features.
4. Produce a concise mapping:
   - prototype element;
   - production component;
   - data source;
   - server/client ownership;
   - loading/error behavior.
5. Implement incrementally.
6. Compare the result against every approved story state.
7. Add or update tests.
8. Run the project quality gate.

## Architecture rules

- Keep route files thin.
- Use Server Components by default.
- Isolate interactivity in the smallest Client Component.
- Replace mock data through feature-level data access, not direct fetch calls inside presentational components.
- Separate view components from orchestration when it improves testability.
- Preserve existing project organization.
- Do not copy the entire prototype into `page.tsx`.
- Do not leave prototype-only handlers, fake delays, or mock imports in production paths.
- Do not broaden scope into unrelated refactors.

## Visual fidelity

Preserve:

- information hierarchy;
- content density;
- responsive behavior;
- component variants;
- interactive states;
- empty/loading/error states;
- labels and helper text.

When production constraints require a visible difference, explain it instead of silently changing the UI.

## Integration checklist

Evaluate:

- route params and search params;
- initial loading and navigation loading;
- authorization;
- error mapping;
- query invalidation;
- optimistic behavior;
- form submission;
- analytics hooks already required by the project;
- metadata;
- not-found behavior.

## Completion report

Include:

- story used as reference;
- route and feature files changed;
- mock-to-production replacements;
- intentional deviations;
- tests and commands run;
- remaining manual visual checks.
