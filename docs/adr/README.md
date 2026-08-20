# Architecture Decision Records — Umbra

Índice dos ADRs do frontend. Decisões futuras de domínio/produto vivem no novo backend
(`gnomon/docs/adr`); `gnomon-mock` preserva o baseline da API `/v1` durante a transição.

| ADR | Título | Status |
| --- | ------ | ------ |
| [0001](0001-stack-frontend.md) | Stack: Next.js 16 + React 19 + TS strict + Tailwind v4 + shadcn/ui | Accepted |
| [0002](0002-auth-oidc-keycloak.md) | Auth admin via OIDC (Auth Code + PKCE) com oidc-client-ts | Accepted |
| [0003](0003-calendario-proprio.md) | Calendário 100% próprio, core headless puro | Accepted |
| [0004](0004-data-fetching-forms.md) | Server state (TanStack Query), URL state (nuqs), forms (RHF + Zod), MSW | Accepted |
| [0005](0005-datas-temporal.md) | Temporal API via polyfill, isolada em `@/shared/lib/temporal` | Accepted |
| [0006](0006-upload-xhr-fila-local.md) | Upload direto PUT pré-assinado via XHR, fila local e TanStack Query | Accepted |
| [0007](0007-entrega-publica-cache-portfolio.md) | Entrega pública mediada, `next/image` e invalidação imediata do cache | Accepted |
| [0008](0008-transicao-gnomon-mock-node.md) | Transição compatível de `gnomon-mock` para Gnomon Node.js | Accepted |

## Convenção

- Status possíveis: `Proposed`, `Accepted`, `Deprecated`, `Superseded by ADR-XXXX`.
- Nenhuma decisão arquitetural muda sem ADR novo ou atualização explícita do ADR existente.
- Conflito aparente com ADR do backend → o backend vence; ajustar o front e registrar aqui.
