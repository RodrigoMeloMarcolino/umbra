# ADR 0003 — Calendário 100% próprio, core headless puro

Status: Accepted
Data: 2026-07-23

## Contexto

Agenda é o coração do produto (seleção de horário no booking; week/day view no admin; editor de
disponibilidade semanal). Decisão de produto e de portfólio: **não usar nenhuma biblioteca de
calendário pronta** — nem de grade (FullCalendar, react-big-calendar) nem de picker
(react-day-picker). Isso exige uma arquitetura que mantenha o componente testável e evolutivo.

## Decisão

1. **Proibição permanente** de libs de calendário/agenda (regra 1 do AGENTS.md).
2. **Core headless e puro** em `src/features/calendar/core`: sem React, sem DOM, sem libs de
   UI. Funções puras sobre Temporal:
   - *slot math*: grade de 15 min (`SLOT_MINUTES`), geração de slots entre `start`/`end`,
     alinhamento/snapping de instantes à grade;
   - *layout engine*: detecção de sobreposição e distribuição em colunas (modelo clássico de
     interval partitioning, como Google Calendar) produzindo `{ left, width }` relativos;
   - *conversões*: instantes UTC ↔ horário local na timezone IANA do calendário, incluindo
     semanas atravessadas por DST (regras semanais vivem em horário local — RNF-04 backend).
3. **Views** em `src/features/calendar/views` (Month para picker do booking; Week e Day para a
   agenda admin): CSS Grid + posicionamento absoluto percentual; interações com **Pointer
   Events** (seleção, arrastar para criar disponibilidade, resize) com snapping ao slot de 15
   min calculado pelo core.
4. **A11y de série**: navegação por teclado (setas/página), roles/labels ARIA de grid,
   anúncios de seleção via live region; contraste validado por axe-core.
5. **Storybook como vitrine**: cada view e estado relevante (overlap, DST, calendário vazio,
   loading) tem story dedicada — é o artefato público de portfólio.
6. **Testes**: cobertura densa no core (Vitest puro, inclusive casos de transição de DST e
   semanas quebradas); views com Testing Library focando interação e a11y.

## Consequências

- O core pode evoluir (buffer entre atendimentos, múltiplos calendários sobrepostos, drag de
  appointment) sem tocar nas views — e vice-versa.
- Custo inicial maior que adotar uma lib; aceito conscientemente: é o diferencial técnico do
  projeto e elimina dependências pesadas do bundle público.
- Qualquer contribuição que introduza lib de calendário deve ser rejeitada em review (gate via
  AGENTS.md + checagem de deps em CI futura).

## Rastreabilidade

- Domínio: ADRs 0010/0011/0012 do backend (slots 15 min, lock por calendário, snapshots) e
  RNF-04 (timezones explícitas).
