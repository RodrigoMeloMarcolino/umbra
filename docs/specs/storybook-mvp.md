# Spec visual — MVP Sun Catcher no Storybook

Status: active

As stories representam a experiência visual e comportamental do MVP sem rede, OIDC real,
rotas Next.js ou cálculo de domínio. Cada tela recebe `data`, `state`, `role` e callbacks
observáveis quando aplicável. Fixtures são determinísticas, usam `price_cents`/`currency_code`
e instantes/labels já calculados; calendários recebem apenas view models apresentacionais.

| Superfície | Ator | Contrato | Estados representados |
| --- | --- | --- | --- |
| Booking wizard | customer | público atual | ready, loading, empty, 422, 409, success, tenant inválido, erro |
| Acesso/tenant | owner/admin/staff | auth/tenants planejado | redirect, seleção múltipla |
| Calendário | customer/admin/staff | view model interno | month, week, day, availability, DST, empty, loading, readonly |
| Admin operacional | owner/admin/staff | futuro admin | filtros, paginação, mobile, 409, erro, role |

## Decisões

- Booking não oferece “qualquer profissional”, preferências de contato, avaliação ou localização.
- Staff vê agenda diária e somente as superfícies permitidas; a UI não substitui a autorização da API.
- Mobile abre navegação administrativa em Dialog e tabelas viram cards.
- Seleção/drag de disponibilidade e posições de agenda são demonstrações de UI, não regras.

## Riscos e follow-ups

Os contratos administrativos seguem marcados como futuros até a publicação do OpenAPI do
Gnomon. Ações de dialog e testes de interação/a11y completos serão endurecidos antes da
implementação real.
