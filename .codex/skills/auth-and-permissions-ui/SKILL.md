---
name: auth-and-permissions-ui
description: Implement or review frontend authentication and authorization UX for Next.js applications, including Keycloak-compatible sessions, protected routes, roles, permissions, token boundaries, unauthenticated versus forbidden states, and action visibility. Use when a screen or route depends on identity or permissions. Do not treat frontend checks as the authoritative security boundary.
---

# Authentication and Permissions UI

Create a predictable user experience while preserving server-side authorization as authoritative.

## Workflow

1. Read `AGENTS.md`.
2. Inspect the existing auth/session integration and Keycloak libraries.
3. Identify:
   - authentication source;
   - session lifecycle;
   - roles/permissions source;
   - server-side enforcement;
   - route and action requirements.
4. Implement the smallest UI and route changes.
5. Test unauthenticated, authorized, forbidden, and expired-session states.
6. Run security-sensitive checks without logging tokens.

## Core distinctions

Treat these separately:

- unauthenticated: no valid session;
- unauthorized/forbidden: valid identity, insufficient permission;
- unavailable: authorization source or backend failed;
- hidden action: improves UX but is not enforcement;
- disabled action: explains constraints but is not enforcement.

## Next.js boundaries

- Prefer server-side session/permission evaluation for protected initial rendering when supported by the existing architecture.
- Keep tokens and privileged session details out of client props.
- Expose only the minimum derived identity/permission information to Client Components.
- Avoid middleware as the sole authorization layer.
- Avoid redirect loops.
- Preserve the intended return URL safely.
- Validate redirect destinations to prevent open redirects.

## Keycloak-oriented guidance

When Keycloak is used:

- follow the repository's adapter/library conventions;
- do not decode a token and assume that is equivalent to validating it;
- do not store access tokens in unsafe browser storage unless the established architecture explicitly requires and mitigates it;
- model realm/client roles and application permissions deliberately;
- handle token expiry and refresh failure consistently;
- never log tokens.

## UI rules

- Show a dedicated forbidden state when the user is authenticated but lacks access.
- Do not render sensitive data and then hide it with CSS.
- For conditionally available actions, provide an explanation when useful.
- Avoid role-name checks scattered across presentational components; prefer feature-level permission helpers.

## Tests

Cover applicable cases:

- anonymous visit;
- successful sign-in return;
- authorized access;
- forbidden access;
- expired session;
- failed refresh;
- role/permission changes;
- protected mutation rejected by backend.

## Completion report

Explain:

- authoritative enforcement point;
- frontend behavior;
- data exposed to the client;
- session expiry handling;
- test cases;
- commands run.
