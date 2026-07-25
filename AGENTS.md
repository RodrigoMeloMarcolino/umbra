# AGENTS.md — Umbra (frontend do Gnomon)

Version: `1.0.0`

## Identidade

Este repo segue o mesmo workflow **Round-Trip SDD** do backend Gnomon: a especificação é um
artefato vivo, sincronizado com o código nas duas direções (spec → código, código → spec).
Consulte o `AGENTS.md` do repo `gnomon` para a descrição completa do workflow, modos de operação
(manual/assistido) e comandos (`/spec`, `/plan`, `/tasks`, `/review`, `/sync-spec`, `/auto-pilot`).

Resumo obrigatório:

1. Antes de desenvolver: consulte [prd-frontend](docs/prd-frontend.md), [ADRs](docs/adr/README.md)
   e [tasks](docs/tasks/README.md); continue a partir do último checkpoint válido.
2. Depois de desenvolver: atualize o status da task, registre notas/riscos e crie ou atualize
   ADR se uma decisão mudou. **Nenhuma decisão arquitetural muda sem ADR.**
3. O backend (repo `gnomon`) é a fonte da verdade do domínio: PRD, ADRs 0001–0017, specs de
   booking/multi-tenancy. Divergências de contrato se resolvem lá, não aqui.

---

## Regras específicas do Umbra (não negociáveis)

1. **Calendário próprio, sempre.** É proibido adicionar qualquer lib de calendário/agenda
   (react-big-calendar, FullCalendar, react-day-picker etc.). O core do calendário é headless e
   puro (`src/features/calendar/core`), testado sem DOM (ADR 0003).
2. **Datas só via Temporal.** Todo código importa `Temporal` de `@/shared/lib/temporal`, nunca
   do polyfill diretamente e nunca `Date` para lógica de domínio. Instantes reais em UTC
   (`Temporal.Instant`); horários locais com timezone IANA explícita do calendário
   (`Temporal.ZonedDateTime`) — espelha o RNF-04 do backend (ADR 0005).
3. **Slots de 15 minutos** governam toda a grade (`SLOT_MINUTES`). Disponibilidade vem da API;
   o front nunca inventa slots fora do contrato `available-slots` (slots disponíveis não são
   persistidos — ADR 0010 do backend).
4. **Contrato de API** (ADR 0014 do backend): tudo sob `/v1`; público sob `/v1/public`; envelope
   de erro `{"error": {"code", "message", "details"}}` — o api-client traduz para exceções
   tipadas por `code`, nunca por mensagem.
5. **Idempotência no booking**: um UUID (`Idempotency-Key`) por *intent* de booking, gerado ao
   montar o payload e preservado entre retries do mesmo intent; novo intent (mudou qualquer
   campo) = nova chave. `409` de slot indisponível → invalidar `available-slots` e pedir nova
   escolha (fluxo de concorrência do PRD §11.3).
6. **Dinheiro**: `price_cents` inteiro + `currency_code` do tenant. Formatação só na borda
   (componente), nunca float, nunca dividir por 100 em lógica (ADR 0013 do backend).
7. **Auth**: Keycloak é o dono da autenticação (ADR 0004 do backend). O front nunca renderiza
   formulário de senha nem toca credenciais — redirect OIDC (Auth Code + PKCE) via
   `oidc-client-ts`. Autorização (roles owner/admin/staff) vem da API; o front esconde UI sem
   permissão, mas nunca trata isso como segurança (ADR 0002).
8. **Customer ≠ User**: a superfície pública é 100% não autenticada. Nunca exigir login para
   agendar (ADR 0008/0009 do backend).
9. **Server by default**: componentes são Server Components até precisarem de interatividade;
   `"use client"` no nível mais baixo possível da árvore. O booking público carrega o mínimo de
   JS possível (LCP/SEO são requisitos de produto).
10. **Validação simétrica**: schemas Zod no front espelham as regras do backend (ADR 0016 do
    backend — mesmas mensagens/códigos por campo), como UX antecipada, nunca como garantia.

## Estrutura

```
src/
  app/
    (public)/t/[tenantSlug]/     # booking público — SSR, SEO, bundle mínimo
    (auth)/app/[tenantSlug]/     # painel admin — guard OIDC
  features/<feature>/            # vertical slices: booking, calendar (core|views),
                                 # availability, appointments, catalog, members, auth
  shared/
    ui/                          # design system (shadcn/ui, Base UI)
    lib/                         # temporal, api-client, money — puros e testáveis
    config/  hooks/
```

Regras de dependência: `app` → `features` → `shared`. Features não importam features
(composição via `app`). `shared` não importa nada acima. `features/calendar/core` não importa
React nem DOM.

## Comandos canônicos de validação

| Etapa | Comando |
| ----- | ------- |
| Lint | `pnpm lint` |
| Typecheck | `pnpm typecheck` |
| Testes unitários | `pnpm test` |
| Build | `pnpm build` |

Mínimo antes de declarar uma task done: `pnpm lint`, `pnpm typecheck` e `pnpm test`. Build
obrigatório quando tocar rotas, config do Next ou deps.

## Padrões de teste

- Unit: Vitest + Testing Library; jsdom só para componentes — libs e o core do calendário são
  testados como funções puras.
- O core do calendário tem cobertura densa: slot math, layout de overlap, transições de DST.
- MSW intercepta a API nos testes de integração de componentes; contratos seguem o PRD §9 do
  backend.
- E2E (Playwright) e a11y (axe-core) chegam nas tasks 04+; nenhuma task de fluxo fecha sem pelo
  menos um caminho feliz coberto.

## Done criteria

Uma task só está done quando: comportamento especificado, implementação alinhada à spec, testes
relevantes adicionados/atualizados, validação executada, riscos/follow-ups registrados na task,
e status atualizado em `docs/tasks/README.md`.
