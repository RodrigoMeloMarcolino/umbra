# Fase 04 — Admin: auth OIDC + agenda + appointments

Status: todo

## Objetivo

Painel admin utilizável ponta a ponta: login via Keycloak, seleção de tenant, agenda semanal
sobre o calendário próprio e gestão de appointments (lista + ações).

## Escopo

- Detalhar `docs/specs/admin-panel.md` (sair de draft).
- Auth (ADR 0002): oidc-client-ts com Auth Code + PKCE, guard no route group `(auth)`,
  callback route, silent renew, seleção de tenant (`GET /v1/tenants`).
- Agenda: Week/Day views com appointments do tenant (owner/admin) ou do próprio calendário
  (staff); filtros por data/calendário/status na URL (nuqs); paginação.
- Detalhe de appointment + ações cancel/complete/no-show com confirmação e tratamento de 409.
- Integração real com o backend local (docker-compose: Keycloak + API fases 01, 02, 07) —
  MSW deixa de ser a fonte nestas rotas, permanecendo nos testes.

## Fora de escopo

- CRUD de catálogo/colaboradores (fase 05), editor de availability (fase 06), customers list.

## Testes

- Componente (MSW): guard, matriz role → UI, lista com filtros, ações com 409.
- Integração manual documentada contra o compose local (login real, agenda real).
- E2E (Playwright) do caminho feliz, se a fase 07 de infra E2E já tiver sido antecipada.

## Critérios de aceite

- [ ] Login real funcional contra o Keycloak do compose.
- [ ] Agenda reflete cancelamento (slots liberados) após invalidação.
- [ ] Staff restringido ao próprio calendário na UI e matriz coberta por testes.
- [ ] Follow-up do ADR 0002 (storage de token / silent renew) decidido e registrado.

## Notas de implementação

(preencher ao concluir)
