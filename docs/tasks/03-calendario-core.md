# Fase 03 — Calendar Core (entregas A e B)

Status: todo

## Objetivo

Formalizar o calendário próprio conforme ADR 0003 em duas entregas, sem DOM no core: A atende o
booking antes da conclusão da fase 02; B atende a agenda antes da fase 07.

## Entrega A — picker para booking

- Slot math de 15 min, conversões UTC ↔ timezone, range de mês e Month picker acessível.
- Seleção de data/horário apenas sobre slots retornados pela API; DST e timezone ≠ browser
  cobertos no core puro.
- Entrada: fase 01.5; saída: fase 02 consome o picker sem protótipo paralelo.

## Entrega B — agenda administrativa

- Layout engine de overlap, Week/Day, semanas com DST, interação Pointer Events e snapping.
- ARIA grid, teclado, live region, stories de overlap/DST/vazio/loading/readonly.
- Entrada: fase 06 e contratos de agenda ainda podem estar em MSW; saída: fase 07 consome
  Week/Day quando o gate Gnomon 07 abrir.

## Escopo

- `features/calendar/core`: slot math (grade 15 min), layout engine de overlap (colunas por
  conflito), conversões UTC ↔ timezone do calendário, semanas com DST, helpers de range
  visível (week starting Monday, alinhado ao `weekday` 1–7 do domínio).
- `features/calendar/views`: Month (picker), Week e Day (agenda); CSS Grid + posicionamento
  percentual; Pointer Events (seleção, drag, resize) com snapping de 15 min.
- A11y: navegação por teclado, ARIA grid, live region para seleção.
- Stories Storybook de cada view/estado (overlap, DST, vazio, loading, readonly vs.
  interativo).

## Fora de escopo

- Drag-and-drop de appointments entre horários (remarcação) — evolução futura.
- Virtualização (só se perf medir necessidade).

## Testes

- Core: cobertura densa (slot math, overlap em cascata, DST 23h/25h, virada de mês/ano,
  timezone ≠ browser).
- Views: interação por teclado e pointer; seleção respeita snapping.

## Critérios de aceite

- [ ] Core sem imports de React/DOM (gate de lint ou teste de arquitetura simples).
- [ ] Casos de DST documentados e verdes.
- [ ] Stories publicadas para todos os estados relevantes.
- [ ] Entrega A consumida pelo booking (fase 02) sem regressão.
- [ ] Entrega B disponível para a agenda (fase 07) sem inventar dados de appointments.

## Notas de implementação

(preencher ao concluir)
