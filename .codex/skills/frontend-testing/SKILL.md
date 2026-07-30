---
name: frontend-testing
description: Add or improve tests for React and Next.js frontend behavior using the repository's unit, component, integration, Storybook, MSW, and Playwright tools. Use after or alongside production implementation. Do not use to create brittle tests of implementation details or snapshots with no behavioral value.
---

# Frontend Testing

Test behavior at the cheapest reliable level.

## Workflow

1. Read `AGENTS.md`.
2. Inspect test tooling and nearby examples.
3. Identify user-visible risks.
4. Choose the lowest effective test level.
5. Implement focused tests.
6. Run targeted tests first, then broader checks when practical.
7. Report coverage gaps rather than padding the suite.

## Test levels

### Unit

Use for:

- parsers;
- formatters;
- schema refinements;
- mapping functions;
- reducers;
- deterministic business helpers.

### Component

Use for:

- field behavior;
- dialogs;
- tables;
- menus;
- keyboard interaction;
- local state and composition.

### Integration

Use for:

- screen plus mocked API;
- loading/empty/error/success transitions;
- mutations and cache updates;
- authorization-dependent UI;
- route-state behavior where feasible.

### End-to-end

Use for critical user journeys such as:

- sign-in;
- create/edit/delete;
- booking;
- checkout;
- role-protected workflows;
- cross-page navigation.

## Rules

- Test through roles, labels, and visible behavior.
- Prefer realistic user events.
- Avoid testing internal state or private function calls.
- Avoid broad snapshots as the primary assertion.
- Keep mocks at the network boundary when testing integrated screens.
- Use deterministic data and clocks.
- Assert accessibility-relevant behavior for dialogs and forms.
- Do not duplicate the same behavior at every level.

## Required state review

Evaluate tests for:

- loading;
- empty;
- error;
- populated;
- submission;
- validation;
- retry;
- permission denied;
- long or unusual data;
- responsive-critical interactions.

## Completion report

List:

- risks covered;
- test levels chosen;
- commands and outcomes;
- intentionally untested areas;
- any flaky or environment-dependent behavior.
