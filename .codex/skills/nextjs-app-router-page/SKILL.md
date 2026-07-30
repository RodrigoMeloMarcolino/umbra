---
name: nextjs-app-router-page
description: Implement or review Next.js App Router routes, layouts, route groups, Server Components, Client Component boundaries, metadata, loading, error, and not-found behavior. Use for route-level work in a Next.js App Router project. Do not use for generic React components that do not involve routing or rendering boundaries.
---

# Next.js App Router Page

Use the App Router deliberately and keep framework boundaries explicit.

## Workflow

1. Read `AGENTS.md`.
2. Inspect the current Next.js version and repository conventions.
3. Inspect adjacent routes and layouts.
4. Decide:
   - route structure;
   - server/client ownership;
   - data loading;
   - caching/revalidation;
   - error and not-found boundaries;
   - metadata;
   - authorization boundary.
5. Implement the minimum route surface.
6. Run typecheck, lint, tests, and build.

## Server and client boundaries

- Start with a Server Component.
- Add `"use client"` only where browser state, effects, event handlers, or client-only libraries require it.
- Pass serializable props across the boundary.
- Avoid moving a whole page client-side for one interactive widget.
- Keep secrets, privileged fetches, and server-only modules out of client imports.
- PROJECT_DECISION: follow the repository's chosen approach for server actions, route handlers, and client mutations.

## Route files

Use applicable special files intentionally:

- `page.tsx`: route entry and composition;
- `layout.tsx`: shared route UI and providers that truly belong at that boundary;
- `loading.tsx`: meaningful navigation/loading fallback;
- `error.tsx`: recoverable route error UI;
- `not-found.tsx`: missing-resource experience;
- `template.tsx`: only when remount semantics are required;
- `route.ts`: HTTP endpoint, not a substitute for ordinary server-side data access.

## Params and navigation

- Validate route params and search params at the boundary.
- Canonicalize invalid or unsupported query-state combinations.
- Preserve shareable state in the URL when appropriate.
- Avoid storing the same state in URL, local state, and remote cache without a clear source of truth.
- Use framework navigation APIs rather than direct browser manipulation.

## Caching

Because Next.js caching behavior can vary by version:

1. inspect the installed version;
2. inspect current repository usage;
3. choose caching/revalidation explicitly;
4. do not assume defaults;
5. document any behavior that affects freshness.

## Completion report

Explain:

- route structure;
- Server/Client boundaries;
- loading/error/not-found behavior;
- caching decision;
- validation and authorization;
- commands run.
