# Fase 00 — Fundação técnica

Status: done

## Objetivo

Repo `umbra` criado com scaffold funcional, deps centrais instaladas, toolchain validada e
documentação SDD completa.

## Escopo executado

- Scaffold Next.js 16.2.11 (App Router, Turbopack) + React 19.2 + TS 5.9 strict via
  `create-next-app`, pnpm 11 (corepack), git init (branch `main`).
- Deps: TanStack Query v5, nuqs, react-hook-form + @hookform/resolvers, zod v4,
  @js-temporal/polyfill, oidc-client-ts; dev: Vitest, Testing Library, jsdom, MSW.
- shadcn/ui init (style base-nova, primitivos Base UI, Lucide) com aliases apontando para
  `src/shared/*`; componentes em `src/shared/ui`.
- Estrutura `app/(public)/t/[tenantSlug]`, `app/(auth)/app/[tenantSlug]`, `features/*`,
  `shared/{ui,lib,config,hooks}`.
- `@/shared/lib/temporal` (isolamento do polyfill, ADR 0005) + testes de sanity (conversão
  UTC→IANA, DST, grade de 15 min).
- Scripts: `dev`, `build`, `lint`, `typecheck`, `test`, `test:watch`.
- Docs: README, AGENTS.md, prd-frontend, ADRs 0001–0005, specs iniciais, tasks 00–04.
- Backend: ADR 0018 + emendas no PRD (§8, §13).

## Validação executada

- `pnpm lint` ✔ · `pnpm typecheck` ✔ · `pnpm test` ✔ (3 testes) · `pnpm build` ✔

## Follow-ups

- [ ] CI (GitHub Actions): typecheck, lint, unit, build — task 07 do roadmap.
- [ ] Husky + lint-staged (pre-commit).
- [ ] Lint rule: proibir import direto de `@js-temporal/polyfill` fora de `shared/lib/temporal`
      e `Date` em `features/**`.
- [ ] Prettier (config + `format` script) — alinhar estilo com o time.
- [ ] CORS no backend para `http://localhost:3000` (registrar na fase 01 do backend).

## Notas e riscos

- Next 16 (não 15): planejamento citava 15; scaffold usou a estável atual — registrado no
  ADR 0001.
- shadcn "base-nova" usa Base UI (não Radix) — decisão consciente, ADR 0001 §5.
- Vitest/jsdom lento em `/mnt/c` (drvfs WSL): ~75s por run de 3 testes. Avaliar rodar em
  filesystem nativo do WSL se virar dor real.
