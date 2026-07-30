# Spec — Painel administrativo

Status: fatiada por contratos; auth/configuração implementáveis após gate de integração, agenda
bloqueada pelo Gnomon 07
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

## Disponibilidade de contrato e sequência

- **Fase 04 — auth e tenant shell:** OIDC e `/v1/tenants` vêm do Gnomon 01; exige CORS,
  configuração OIDC e tenant local determinístico.
- **Fase 06 — configuração administrativa:** catálogo, colaboradores, calendários, atribuições e
  availability rules vêm dos Gnomon 02–03; integrar após auth shell e schema congelado.
- **Fase 07 — agenda:** appointments, customers, filtros, paginação e transições dependem do
  gate Gnomon 07. Até ele, stories/MSW são somente contrato futuro, sem rota de produção.

OpenAPI, quando publicado, substitui tipos duplicados. Até lá, schemas Zod e fixtures MSW
versionados registram o casing e o envelope por rota; o frontend não presume conversão global.

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

Não cria contrato. A configuração consome rotas disponíveis do PRD §9; agenda e customers só
podem integrar após o gate Gnomon 07. CORS sem `PUT` é bloqueio explícito do portfólio, não da
agenda, e segue registrado no gate 01.5.

## Estratégia de teste

- Unit: mapeamento role → UI visível; editor de availability (regras de sobreposição/ordem).
- Componente (MSW): listagem com filtros; ações com 409; guard de sessão.
- E2E: login mockado → agenda → cancelar appointment.

## Critérios de aceite (por task)

- [ ] Fase 04: guard OIDC e seleção de tenant funcionam contra Keycloak do docker-compose.
- [ ] Fase 06: configuração respeita schemas, roles e regras de disponibilidade.
- [ ] Fase 07: agenda real renderiza appointments e reflete cancelamento após o gate Gnomon 07.
