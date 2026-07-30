# PRD — Umbra (frontend do Gnomon)

Versão: `0.1.1` (nomenclatura Sun Catcher/Moonlight)
Data: 2026-07-23
Status: aprovado para início da implementação

---

## 1. Visão geral

O **Umbra** é o frontend do **Sun Catcher** (SaaS de agendamento multi-tenant; serviço de API:
`gnomon`). O nome vem de *umbra*, a sombra que o gnômon projeta sobre o mostrador — a camada
onde o tempo se torna visível. Registro central de ativos e convenção de nomes: repo
`ephemeris`.

Dois objetivos:

1. **Produto**: entregar as duas superfícies do Gnomon — booking público de baixa fricção e
   painel administrativo — com qualidade de referência (performance, acessibilidade, tipagem
   estrita).
2. **Portfólio**: demonstrar engenharia frontend moderna — App Router/RSC, design system
   próprio sobre Base UI, Temporal API, e um **calendário construído do zero** com core
   headless testável, documentado em ADRs e exibido em Storybook.

## 2. Superfícies e atores

| Superfície | Rota | Atores | Autenticação |
| ---------- | ---- | ------ | ------------ |
| Booking público | `/t/{tenantSlug}` | Customer (guest) | nenhuma |
| Portfólio público | `/t/{tenantSlug}` e `/t/{tenantSlug}/portfolio` | Customer (guest) | nenhuma |
| Painel admin | `/app/{tenantSlug}` | Owner, Admin, Staff | Keycloak (OIDC) |
| Gestão de portfólio | `/app/{tenantSlug}/portfolio` | Owner, Admin | Keycloak (OIDC) |

Atores e permissões detalhados no PRD do backend (§4 e §6). O front consome; não redefine.

## 3. Requisitos funcionais (visão do front)

### 3.1 Booking público (MVP)

- **RFF-01** Página pública do tenant: perfil do negócio, lista de calendários (colaboradores)
  e catálogo de serviços ativos (`GET /v1/public/tenants/{slug}[...]`).
- **RFF-02** Wizard de booking em passos com estado na URL (nuqs): serviço → calendário →
  data/horário → dados do cliente → confirmação. Deep-linkável e resiliente a refresh.
- **RFF-03** Seleção de horário consome `available-slots` (instantes UTC) e renderiza na
  timezone do calendário; grade governada por slots de 15 min.
- **RFF-04** Submit único e síncrono com `Idempotency-Key` (UUID por intent); retry seguro;
  `409` → invalida slots e orienta nova escolha.
- **RFF-05** Confirmação com dados do appointment (serviço, colaborador, horário local, preço
  formatado a partir de `price_cents`).

### 3.2 Painel admin (MVP)

- **RFF-06** Login via redirect OIDC (Keycloak); seleção de tenant quando o usuário tem vários
  (`GET /v1/tenants`).
- **RFF-07** Agenda: visão semanal/diária por calendário construída sobre o calendário próprio;
  listagem de appointments com filtros (data, calendário, status) e paginação.
- **RFF-08** Ações sobre appointments: cancel / complete / no-show, com confirmação e feedback
  de erro claro para transições inválidas (`409`).
- **RFF-09** Gestão de catálogo (offerings), colaboradores/calendários, atribuição
  serviço ↔ calendário e regras semanais de disponibilidade (editor visual com drag).
- **RFF-10** Staff vê apenas o próprio calendário: UI esconde rotas/ações fora do escopo
  (a autorização real é sempre da API).
- **RFF-11** Owner/admin gerenciam imagens do portfólio: upload direto controlado, metadata,
  publicação, destaque, ordem explícita e remoção; aguarda Gnomon 07.5.
- **RFF-12** Guests veem prévia e galeria paginada; mudança editorial invalida cache com fallback
  temporal; aguarda fundações públicas.

## 4. Requisitos não funcionais

- **RNFF-01** Booking público: LCP < 2,5s em 4G; página servida com SSR/ISR e bundle mínimo;
  Lighthouse (performance + a11y + SEO) monitorado em CI.
- **RNFF-01a** Plataforma web **mobile-first**: o booking público e o painel admin devem ser
  desenhados primeiro para celular e expandir progressivamente para desktop, sem overflow
  horizontal, sobreposição de texto ou perda de funcionalidades entre viewports.
- **RNFF-02** Acessibilidade WCAG 2.2 AA: primitivos Base UI, navegação por teclado no
  calendário, contraste validado, axe-core nos testes.
- **RNFF-03** Instantes em UTC no transporte; conversão explícita via timezone IANA do
  calendário (Temporal). Nenhuma lógica de domínio com `Date`.
- **RNFF-04** Estados de erro fiéis ao envelope da API: UI deriva de `error.code`, nunca de
  mensagens.
- **RNFF-05** TypeScript strict, `tsc --noEmit` limpo em CI; tipos da API gerados do OpenAPI
  quando disponível (até lá, tipos mantidos à mão junto dos handlers MSW).
- **RNFF-06** Core do calendário puro e cobertura densa de testes (slot math, overlap, DST).

## 5. Escopo do MVP

### Dentro

- Fundação: scaffold, tooling (ESLint/TS/Vitest), design tokens, CI básica.
- Design system inicial sobre Base UI (shadcn/ui) + Storybook.
- Booking público completo (RFF-01…RFF-05) integrado à API pública já disponível; MSW fica
  restrito a testes e fallback contratual.
- Core do calendário (headless) + views Month/Week/Day.
- Admin: auth OIDC, agenda (week view), appointments (lista + ações), catálogo, colaboradores,
  disponibilidade (RFF-06…RFF-10).

### Fora (evoluções futuras)

- Cancelamento/remarcação pública via token (depende das fases 08 do backend).
- Notificações, pagamentos, métricas/dashboards, edição de appointment pelo admin.
- **Integrações de marketing** (pixels, Meta CAPI, Google Ads) no booking público — chegam com
  o produto futuro **Moonlight** e exigem desenho de consentimento/LGPD (customers têm PII
  global por telefone — ADR 0009 do backend). Ficha: `ephemeris/docs/products/moonlight.md`.
- i18n formal (MVP em pt-BR, strings centralizadas para facilitar extração).
- App mobile nativo / PWA instalável. A experiência web responsiva para mobile e desktop faz
  parte do MVP.
- Implementação operacional do portfólio até que o contrato Gnomon 07.5 esteja aceito; o
  refinamento documental e protótipos locais permanecem no escopo de planejamento.

## 6. Dependências com o backend

| Gate do backend | Contratos que o front consome | Estado para Umbra |
| --------------- | ----------------------------- | ----------------- |
| 01 Identidade | OIDC realm `gnomon`, `GET/POST /v1/tenants` | disponível; requer CORS e tenant local para auth shell |
| 02 Catálogo | offerings, collaborators, calendars, calendar_offerings | disponível; configuração após auth shell |
| 03 Disponibilidade | availability-rules, `available-slots` | disponível; alimenta booking e configuração |
| 04 Guest booking | `POST /v1/public/.../appointments` (idempotente) | disponível; booking integra desde o início |
| 07 Painel admin | appointments (lista/ações), customers | gate pendente; stories/MSW somente até contrato aceito |
| 08 Cancelamento/remarcação público | token, cancelamento e remarcação | gate pendente; backlog estacionado |
| 07.5 Portfólio | mídia, upload, galeria e invalidação | gate pendente; Storybook permitido, produção bloqueada |

Gates transversais: CORS (inclusive `PUT` para portfólio), casing JSON uniforme ou mapeado por
rota, OpenAPI ou schemas Zod/fixtures temporários congelados, e tenant local determinístico para
smoke. A sequência oficial e os fallbacks estão em `docs/tasks/frontend-implementation-sequence.md`.

## 7. Rastreabilidade

- PRD do backend (`gnomon/docs/prd.md`) — produto e domínio.
- ADR 0018 do backend — decisão do repo/stack deste frontend.
- ADRs 0001–0005 deste repo — stack, auth, calendário, data-fetching, datas.
