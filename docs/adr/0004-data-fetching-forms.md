# ADR 0004 — Server state (TanStack Query), URL state (nuqs), forms (RHF + Zod), MSW

Status: Accepted
Data: 2026-07-23

## Contexto

O app tem três naturezas de estado: dados de servidor (slots, appointments, catálogo), estado
de fluxo compartilhável (passos do wizard de booking, filtros do admin) e formulários (dados do
customer, offerings, availability rules). Além disso, o front precisa evoluir antes das fases
01–07 do backend estarem prontas, sem sacrificar a fidelidade do contrato.

## Decisão

1. **TanStack Query v5** para todo server state no client: cache, dedupe, invalidações
   (ex.: `409` no booking invalida `available-slots`). No servidor (RSC), fetch direto com
   cache/revalidate do Next para a página pública (perfil, catálogo) — Query não duplica o que
   o RSC já entrega.
2. **nuqs** para estado na URL (query strings tipadas): passos/seleções do wizard de booking e
   filtros do admin (data, calendário, status, página). Deep-linkável, back-button correto,
     zero estado global para isso.
3. **Sem store global** (Zustand/Redux) no MVP: URL + Query + RSC cobrem o necessário. Se surgir
   necessidade real (ex.: UI efêmera complexa), ADR novo.
4. **React Hook Form + Zod v4** nos formulários, com schemas que espelham as regras do backend
   (validação simétrica — ADR 0016 do backend): duração múltipla de 15, `price_cents >= 0`,
   telefone normalizável, horário `start < end`. Validação client é UX, nunca garantia.
5. **Api-client fino e tipado** (`src/shared/lib/api-client.ts`): fetch com envelope de erro
   traduzido para exceções tipadas por `error.code`; header `Idempotency-Key` (UUID por intent)
   no POST de booking; Bearer token injetado nas rotas admin.
6. **MSW** como backend simulado: handlers fiéis ao PRD §9 (rotas, envelope, códigos de erro,
   409 de concorrência, 422 sem idempotency key). Os mesmos handlers servem testes e dev
   (`NEXT_PUBLIC_API_MOCKING=enabled`). Quando o backend expor OpenAPI (springdoc),
   **openapi-typescript** passa a gerar os tipos e os handlers são validados contra eles.

## Consequências

- Booking é deep-linkável e sobrevive a refresh; filtros do admin são compartilháveis por URL.
- Fluxos de erro de concorrência (409) são exercitáveis em dev/testes sem backend real.
- Dupla fonte de verdade temporária (tipos à mão + MSW) até o OpenAPI existir — débito
  registrado, resolução na integração com a fase 04 do backend.

## Rastreabilidade

- Backend: ADR 0014 (rotas `/v1`, envelope, idempotência), ADR 0016 (validação simétrica),
  PRD §9 (contratos) e §11.3 (concorrência).
