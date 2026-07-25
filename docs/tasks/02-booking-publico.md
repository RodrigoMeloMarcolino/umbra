# Fase 02 — Booking público (contra MSW)

Status: todo

## Objetivo

Fluxo completo de guest booking em `/t/{tenantSlug}` funcionando contra MSW com contratos
fiéis ao PRD §9, pronto para apontar para a API real quando as fases 02–04 do backend subirem.

## Escopo

- Detalhar `docs/specs/booking-public.md` (sair de draft).
- Página pública do tenant (SSR): perfil, colaboradores, catálogo com preços formatados.
- Wizard (nuqs): serviço → calendário → data (Month view inicial, pode ser a versão mínima
  que a fase 03 generaliza) → horário (slots de 15 min na timezone do calendário) → dados do
  customer (RHF + Zod, telefone normalizado para exibição) → confirmação.
- Api-client: rotas públicas, envelope de erro tipado, `Idempotency-Key` por intent, retry
  seguro, tratamento de `409` com invalidação de slots (TanStack Query).
- MSW handlers das 5 rotas públicas + cenários de erro (409, 422, rede).
- Metadata/OG da página pública; Lighthouse baseline.

## Fora de escopo

- "Qualquer colaborador" (decisão de produto a registrar aqui ou na spec); cancelamento via
  token; i18n.

## Testes

- Unit: wizard state machine, money format, slot helpers.
- Componente (MSW): caminho feliz, 409 → refetch + mensagem, 422 → erros por campo, retry com
  mesma chave (assert no handler), double-click no confirmar = 1 POST.
- a11y: fluxo navegável por teclado; axe-core limpo.

## Critérios de aceite

- [ ] Spec de booking fora de draft e implementação fiel a ela.
- [ ] Fluxo feliz e erros cobertos por testes de componente.
- [ ] Idempotência comprovada em teste (mesma chave por intent, nova chave por payload novo).
- [ ] Lighthouse (local) sem regressões de a11y/SEO na página pública.

## Notas de implementação

(preencher ao concluir)
