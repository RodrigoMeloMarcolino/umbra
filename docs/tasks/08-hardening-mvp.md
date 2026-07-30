# Fase 08 — Hardening do MVP

Status: todo

## Objetivo

Consolidar os fluxos entregues com qualidade de release, sem desbloquear features que dependem de
Gnomon 07, 07.5 ou 08.

## Escopo

- E2E dos caminhos públicos e administrativos já integrados; smoke contra ambiente local
  determinístico.
- Acessibilidade, responsividade, Lighthouse e observabilidade aprovada para o frontend.
- Revisão de erros, auth, cache de cliente, performance e documentação de operação.

## Critérios de aceite

- [ ] `pnpm lint`, `pnpm typecheck` e `pnpm test` verdes; build quando rotas/config/deps forem tocadas.
- [ ] Caminhos felizes e concorrência de booking cobertos; acessibilidade e responsividade revisadas.
- [ ] Riscos de gates ainda pendentes mantidos visíveis no roadmap.
