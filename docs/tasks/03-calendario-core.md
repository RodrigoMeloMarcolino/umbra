# Fase 03 — Core do calendário (headless) + views

Status: todo

## Objetivo

Formalizar o calendário próprio conforme ADR 0003: core puro testado densamente + views
Month/Week/Day, generalizando o que a fase 02 prototipou para o Month picker.

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
- [ ] Booking (fase 02) migrado para o Month view do core sem regressão.

## Notas de implementação

(preencher ao concluir)
