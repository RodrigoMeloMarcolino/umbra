# ADR 0005 — Temporal API via polyfill, isolada em `@/shared/lib/temporal`

Status: Accepted
Data: 2026-07-23

## Contexto

O domínio é dominado por datas: instantes UTC no transporte (`available-slots`, appointments),
regras semanais em horário local do calendário, timezone IANA por calendário que pode diferir
da do tenant (PRD backend §5, RNF-04). `Date` + `date-fns-tz` resolve, mas com conversões
verbosas e erro humano fácil (fuso flutuante, DST). A TC39 Temporal foi desenhada exatamente
para esse domínio (`Instant`, `ZonedDateTime`, `PlainTime`, `PlainDate`).

## Decisão

1. **Temporal é a única API de datas do projeto**, consumida hoje via `@js-temporal/polyfill`.
2. **Isolamento obrigatório**: todo código importa de `@/shared/lib/temporal` (re-export do
   polyfill + constantes de domínio como `SLOT_MINUTES`). Import direto do polyfill ou uso de
   `Date` em lógica de domínio é violação de review.
3. **Convenções de tipo por contexto**:
   - transporte/persistência: `Temporal.Instant` (ISO UTC na fronteira);
   - regras semanais e grade local: `Temporal.PlainTime` / `PlainDate` + timezone do calendário;
   - exibição: `Temporal.ZonedDateTime` na timezone IANA do calendário (nunca na do browser de
     forma implícita — o admin pode estar noutro fuso olhando a agenda do colaborador).
4. **Caminho de saída do polyfill**: quando o Temporal nativo estiver estável nos targets
   (browsers + Node de build), o polyfill sai do bundle e o módulo passa a re-exportar o
   global — sem mudança de API nos consumidores.
5. **Testes de DST são obrigatórios** no core do calendário: semanas com transição de horário
   de verão geram dias de 23h/25h e o comportamento precisa ser explícito.

## Consequências

- Bundle público carrega o polyfill apenas onde usa datas (code-splitting por rota; a página
  de confirmação estática não paga o custo).
- Narrativa técnica forte (API de datas moderna) com risco controlado pelo isolamento.
- Lint rule customizada (no-restricted-imports para `@js-temporal/polyfill` e `Date` em
  `features/**`) entra como follow-up na task 00/03.

## Rastreabilidade

- Backend: RNF-04 (instantes TIMESTAMPTZ, conversões explícitas), ADR 0010 (slots de 15 min),
  ADR 0012 (snapshot de duração).
