# Umbra

Frontend do **Sun Catcher** — o SaaS de agendamento multi-tenant composto por `gnomon`
([API](../gnomon)) + `umbra` (este web). **Umbra** é a sombra projetada pelo gnômon: a parte
visível do relógio de sol. Registro central de ativos: [ephemeris](../ephemeris).

Duas superfícies:

- **Booking público** (`/t/{tenantSlug}`) — link compartilhável do negócio; guest booking sem
  conta, SSR/SEO, bundle mínimo.
- **Painel administrativo** (`/app/{tenantSlug}`) — autenticado via Keycloak (OIDC); agenda,
  appointments, catálogo, colaboradores, disponibilidade.

## Stack

| Camada | Escolha |
| ------ | ------- |
| Meta-framework | Next.js 16 (App Router, Turbopack) + React 19 + TypeScript strict |
| Package manager | pnpm 11 |
| Estilo | Tailwind CSS v4 (CSS-first, tokens) |
| Componentes | shadcn/ui (Base UI primitives) — código copiado para `src/shared/ui` |
| Server state | TanStack Query v5 |
| URL state | nuqs |
| Forms | React Hook Form + Zod v4 |
| Datas | Temporal via `@js-temporal/polyfill` (isolada em `src/shared/lib/temporal.ts`) |
| Auth | oidc-client-ts (Authorization Code + PKCE) contra Keycloak realm `gnomon` |
| API client | fetch tipado + MSW para mocks; openapi-typescript quando o backend expuser o contrato |
| Calendário | **100% próprio** (ADR 0003) — core headless puro + views em CSS Grid |
| Testes | Vitest + Testing Library · Playwright (E2E) · Storybook (showcase) · axe-core |
| CI | GitHub Actions: typecheck, lint, unit, build, e2e, Lighthouse CI |

## Comandos

| Ação | Comando |
| ---- | ------- |
| Dev server | `pnpm dev` |
| Lint | `pnpm lint` |
| Typecheck | `pnpm typecheck` |
| Testes unitários | `pnpm test` |
| Build | `pnpm build` |

## Documentação

- [PRD do frontend](docs/prd-frontend.md)
- [ADRs](docs/adr/README.md)
- [Specs](docs/specs/) — [booking público](docs/specs/booking-public.md) · [painel admin](docs/specs/admin-panel.md)
- [Roadmap de tasks](docs/tasks/README.md)

O backend e as decisões de produto vivem no repo `gnomon` (PRD, ADRs 0001–0017). O ADR 0018 do
backend registra o nascimento deste repo.
