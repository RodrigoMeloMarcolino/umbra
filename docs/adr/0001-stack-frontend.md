# ADR 0001 — Stack: Next.js 16 + React 19 + TypeScript strict + Tailwind v4 + shadcn/ui

Status: Accepted
Data: 2026-07-23

## Contexto

O PRD do backend deixou o frontend como decisão em aberto (§13, item 1). O frontend precisa
atender duas superfícies com necessidades opostas — booking público (SEO, LCP, pouco JS) e
painel admin (interatividade densa, auth) — e servir também como vitrine de engenharia frontend
moderna. O scaffold foi executado com a versão estável mais recente do ecossistema na data
(Next 16.2.11, React 19.2), superando a menção "Next 15" do planejamento inicial.

## Decisão

1. **Next.js 16 (App Router) + React 19 + TypeScript 5 strict** como base única para as duas
   superfícies:
   - `(public)/t/[tenantSlug]` — booking público com SSR/ISR, metadata de SEO e bundle mínimo;
   - `(auth)/app/[tenantSlug]` — painel admin atrás de guard OIDC (ADR 0002).
   - Server Components por padrão; `"use client"` o mais baixo possível na árvore.
2. **Turbopack** como bundler de dev/build (default do scaffold Next 16).
3. **pnpm 11** como package manager (via corepack); builds de deps nativas controlados por
   `allowBuilds` em `pnpm-workspace.yaml`.
4. **Tailwind CSS v4** (config CSS-first em `globals.css`, tokens via CSS variables).
5. **shadcn/ui** como semente do design system: componentes copiados para `src/shared/ui`
   (código nosso, versionado), primitivos **Base UI** (`@base-ui/react` — sucessor dos autores
   do Radix, default do shadcn na data) e ícones Lucide. Aliases em `components.json` apontam
   para `src/shared/*`.
6. **Estrutura feature-based**: `src/features/<feature>` (vertical slices) + `src/shared/*`
   transversal; regras de dependência `app → features → shared` (ver AGENTS.md §Estrutura).
7. **Toolchain**: ESLint 9 (flat config, `eslint-config-next`), `tsc --noEmit`, Vitest +
   Testing Library + jsdom.

## Consequências

- Um único app serve as duas superfícies; route groups isolam layouts, guards e estratégias de
  render (SSR público vs. dinâmico autenticado).
- Componentes shadcn são editáveis livremente — upgrades da lib são manuais e conscientes.
- Base UI (em vez de Radix) é uma aposta de modernidade coerente com o objetivo de portfólio;
  se a lib regredir em maturidade, a troca fica contida em `src/shared/ui`.
- Nada de framework CSS adicional nem lib de componentes pronta por cima do design system.

## Rastreabilidade

- Origem: PRD backend §13 item 1 (decisão em aberto) → fechada por ADR 0018 do backend.
- Planejamento inicial citava "Next.js 15"; a decisão concreta é "última estável" (16 na data).
