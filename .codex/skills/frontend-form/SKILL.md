---
name: frontend-form
description: Implement accessible React forms with repository-approved form state, schema validation, DTO mapping, async submission, field errors, and Storybook/test coverage. Use for create, edit, filter, authentication, or multi-step forms. Do not use for a single trivial uncontrolled input unless the project pattern still requires it.
---

# Frontend Form

Implement forms as explicit mappings between UI values and backend contracts.

## Workflow

1. Read `AGENTS.md`.
2. Inspect existing form, schema, and field components.
3. Define:
   - form values;
   - validation schema;
   - initial/default values;
   - API-to-form mapping;
   - form-to-request mapping;
   - submission states;
   - backend error mapping.
4. Implement the form.
5. Add Storybook states and tests.
6. Run lint, typecheck, and relevant tests.

## Default stack

PROJECT_DECISION: prefer the repository's established libraries. When none exist, the package default is React Hook Form plus Zod.

## Modeling rules

Do not assume these shapes are identical:

```text
API response DTO
→ form default values
→ validated form values
→ request DTO
```

Create named mapping functions when transformation is nontrivial.

Examples requiring transformation:

- date/time strings;
- nullable API fields;
- money values;
- select option objects;
- arrays of nested fields;
- IDs versus display objects;
- empty string versus undefined;
- localized numbers.

## Behavior requirements

Handle applicable states:

- pristine;
- dirty;
- invalid;
- submitting;
- submission success;
- field validation failure;
- domain/API validation failure;
- general service failure;
- disabled/read-only;
- unsaved changes.

Prevent accidental duplicate submission.

## Accessibility

- Associate every control with a visible label unless a justified accessible name exists.
- Connect helper and error text with the control.
- Move or announce focus appropriately after failed submission.
- Do not communicate errors only through color.
- Preserve keyboard interaction for custom controls.

## Tests

Test user-observable behavior:

- required and invalid values;
- valid submission payload;
- API field errors;
- general error;
- duplicate submission prevention;
- conditional fields;
- reset/edit defaults when applicable.

## Completion report

Explain:

- form schema;
- mappings;
- submission behavior;
- error behavior;
- stories/tests added;
- commands run.
