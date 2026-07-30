# Fase 07 — Agenda administrativa

Status: todo (bloqueada pelo gate Gnomon 07)

## Objetivo

Integrar agenda, appointments, customers e transições administrativas somente quando o contrato
Gnomon 07 estiver disponível e aceito.

## Gate e fallback

- Entrada: Gnomon 07 publica e valida lista/detalhe de appointments, customers, filtros,
  paginação, roles e ações `cancel`, `complete` e `no-show`; fase 04 e Calendar Core B concluídos.
- Saída: integração real no compose local, incluindo 409 e atualização da agenda após mutation.
- Fallback antes do gate: stories e MSW apenas como contrato futuro; nenhuma rota de produção
  consome fixtures de appointments/customers.

## Escopo

- Week/Day views, filtros na URL, paginação e detalhe de appointment.
- Matriz owner/admin/staff; staff só vê o próprio calendário na UI.
- Cancel/complete/no-show com confirmação, erro por código e invalidação de dados.

## Critérios de aceite

- [ ] Contrato Gnomon 07 verificado e schemas atualizados.
- [ ] Agenda real e ações tratam 409 e re-sincronizam dados.
- [ ] Testes de componente e um caminho E2E/smoke com sessão adequada cobrem o fluxo.
