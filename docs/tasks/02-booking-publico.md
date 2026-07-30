# Fase 02 — Booking público integrado à API real

Status: todo

## Objetivo

Fluxo completo de guest booking em `/t/{tenantSlug}` integrado desde o início aos endpoints
públicos já disponíveis do Gnomon. MSW espelha esses contratos somente em testes.
O fluxo deve ser implementado **mobile-first**: celular é o layout base e desktop é expansão
progressiva do mesmo caminho.

## Escopo

- Detalhar `docs/specs/booking-public.md` (sair de draft).
- Página pública do tenant (SSR): perfil, colaboradores, catálogo com preços formatados.
- Wizard (nuqs): serviço → calendário → data (Month view inicial, pode ser a versão mínima
  que a fase 03 generaliza) → horário (slots de 15 min na timezone do calendário) → dados do
  customer (RHF + Zod, telefone normalizado para exibição) → confirmação.
- Layout responsivo mobile-first: fluxo linear no mobile, alvos de toque adequados, progressão
  compacta e sem overflow horizontal; desktop pode usar colunas/resumo lateral sem mudar a
  ordem lógica do wizard.
- Api-client: rotas públicas, envelope de erro tipado, `Idempotency-Key` por intent, retry
  seguro, tratamento de `409` com invalidação de slots (TanStack Query).
- Integração real com tenant determinístico do compose local; handlers MSW equivalentes para
  testes de componente e cenários de erro (409, 422, rede).
- Metadata/OG da página pública; Lighthouse baseline.

## Fora de escopo

- "Qualquer colaborador" (decisão de produto a registrar aqui ou na spec); cancelamento via
  token; i18n.

## Testes

- Unit: wizard state machine, money format, slot helpers.
- Componente (MSW): caminho feliz, 409 → refetch + mensagem, 422 → erros por campo, retry com
  mesma chave (assert no handler), double-click no confirmar = 1 POST.
- Responsivo: caminho feliz em viewport mobile como baseline e verificação desktop para a
  reorganização do layout.
- a11y: fluxo navegável por teclado; axe-core limpo.

## Critérios de aceite

- [ ] Spec de booking fora de draft e implementação fiel a ela.
- [ ] Fluxo mobile-first validado em celular e desktop, sem overflow horizontal, texto
      sobreposto ou etapa indisponível por viewport.
- [ ] Fluxo feliz integrado à API local e erros cobertos por testes de componente com MSW.
- [ ] Idempotência comprovada em teste (mesma chave por intent, nova chave por payload novo).
- [ ] Lighthouse (local) sem regressões de a11y/SEO na página pública.

## Notas de implementação

Entrada: fase 01.5 concluída e Calendar Core A disponível. Saída: smoke real de leitura, slots e
booking idempotente; CORS, casing e tenant de desenvolvimento registrados. Se o ambiente ou
contrato falhar, MSW continua como fallback de teste, mas a integração real não é declarada
concluída.
