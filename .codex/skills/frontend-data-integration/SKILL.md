---
name: frontend-data-integration
description: Integrate React or Next.js screens with backend APIs using repository-approved clients, typed contracts, caching, queries, mutations, error mapping, and mockable boundaries. Use when replacing Storybook mocks or adding remote data behavior. Do not use for purely visual prototype work.
---

# Frontend Data Integration

Connect the UI to the backend without leaking transport concerns across the feature.

## Workflow

1. Read `AGENTS.md`.
2. Inspect existing API clients, generated schemas, auth handling, and query conventions.
3. Identify the source of truth for API contracts.
4. Define the minimum feature boundary.
5. Implement reads and writes.
6. Map transport errors to user-facing states.
7. Add integration-level tests using the project's mocking strategy.
8. Run the quality gate.

## Contract rules

- Reuse generated clients/types when present.
- Never manually edit generated files.
- Do not duplicate backend DTO definitions without need.
- Validate untrusted external data when the project does not already provide generated runtime validation.
- Separate:
  - request DTO;
  - response DTO;
  - domain/view model;
  - form values;
  when their responsibilities differ.

## Data ownership

PROJECT_DECISION: follow the repository's established approach among:

- Server Component fetch;
- server action;
- route handler;
- TanStack Query;
- SWR;
- another existing client.

Do not introduce a second remote-state strategy for the same class of problem.

## Query behavior

For reads, define:

- stable query keys;
- enabling conditions;
- freshness expectations;
- retry behavior;
- empty versus missing semantics;
- cancellation where supported;
- pagination/filter ownership.

For writes, define:

- validation;
- duplicate submission prevention;
- optimistic update only when safe;
- invalidation or direct cache update;
- conflict handling;
- success feedback;
- failure recovery.

## Error mapping

Handle applicable statuses consistently:

- `400`: malformed request;
- `401`: unauthenticated/session expired;
- `403`: authenticated but unauthorized;
- `404`: missing resource;
- `409`: conflict or stale state;
- `422`: field/domain validation;
- `429`: throttling;
- `5xx`: service failure.

Do not expose raw backend messages that may contain sensitive implementation details.

## Security

- Do not expose secrets in client code.
- Do not treat UI hiding as authorization.
- Avoid logging tokens, personal data, or sensitive payloads.
- Preserve CSRF/session protections already used by the application.

## Completion report

List:

- endpoints/contracts used;
- query/mutation ownership;
- cache behavior;
- error mapping;
- tests and mocks;
- commands run.
