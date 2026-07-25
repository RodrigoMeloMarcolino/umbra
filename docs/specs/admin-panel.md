# Spec — Painel administrativo (rascunho inicial)

Status: draft (detalhar nas tasks 04+)
Domínio de referência: `gnomon/docs/specs/multi-tenancy.md`, PRD backend §6.4, task 07.

## Objetivo

Owner/admin gerenciam o negócio (agenda, appointments, catálogo, colaboradores,
disponibilidade, membros); staff acompanha e gerencia a própria agenda.

## Escopo / não-escopo

- Dentro: login OIDC, seleção de tenant, agenda semanal/diária, appointments (lista, filtros,
  ações cancel/complete/no-show), CRUD de offerings, colaboradores, atribuição
  serviço ↔ calendário, editor de availability rules.
- Fora: dashboards/métricas, edição de appointment, remarcação admin, exportações, convites
  por e-mail (MVP: adição direta), billing.

## Atores

- Owner, Admin (tudo, exceto ownership para admin), Staff (apenas próprio calendário).

## Regras de domínio (o front materializa)

1. Tenant sempre no path (`/app/{tenantSlug}`); trocar de tenant = navegar.
2. UI esconde o que a role não permite, mas a autorização real é da API (403/404).
3. Cancelamento admin libera os slots — a agenda reflete isso após invalidação.
4. Availability rules: `weekday` 1–7, `start < end`, em horário local do calendário; editor
   visual com drag + snapping de 15 min sobre o calendário próprio.
5. Transição inválida de status → `409` com feedback claro.

## Caminho feliz (agenda)

1. Login via Keycloak → lista de tenants → entra em `/app/{slug}`.
2. Agenda semanal carrega appointments do(s) calendário(s) visíveis.
3. Clique num appointment → detalhe (customer, serviço, status) → ações contextuais.
4. Cancelar → confirmação → appointment vira `cancelled` e o horário volta a aparecer livre.

## Caminhos de erro

- `403` cross-tenant/role → tela de acesso negado (nunca vazar dado).
- `409` transição inválida → toast + estado re-sincronizado da lista.
- Sessão expirada → silent renew; falhando, redirect OIDC com retorno à URL original.

## Edge cases

- Staff sem colaborador vinculado → agenda vazia com orientação.
- Calendário em timezone diferente do browser do admin → grade na timezone do calendário,
  com indicação visual do fuso.
- Paginação obrigatória nas listagens (dívida histórica do Moira — task 07 backend).

## Impacto de contrato

Consome rotas admin do PRD §9. Nenhum contrato novo.

## Estratégia de teste

- Unit: mapeamento role → UI visível; editor de availability (regras de sobreposição/ordem).
- Componente (MSW): listagem com filtros; ações com 409; guard de sessão.
- E2E: login mockado → agenda → cancelar appointment.

## Critérios de aceite (a refinar na task 04)

- [ ] Guard OIDC funcional contra Keycloak do docker-compose.
- [ ] Agenda semanal renderiza appointments e reflete cancelamento.
- [ ] Matriz role → UI coberta por testes.
