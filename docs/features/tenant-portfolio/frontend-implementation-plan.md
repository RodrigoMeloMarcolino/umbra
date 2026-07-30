# Plano de implementação — Portfólio do tenant

Status: planejado. Cada entrega é isolável; integração real exige contrato Gnomon aceito.

| Ordem | Entrega | Arquivos prováveis | Dependências | Aceite/testes | Risco |
| --- | --- | --- | --- | --- | --- |
| 1 | Contrato compartilhado | Gnomon OpenAPI/contrato; `portfolio/{types,schemas,mocks}` | Gnomon 07.5 | DTOs, erros, CORS, versões aprovados | bloqueia API real |
| 2 | Protótipos Storybook | `portfolio/prototypes/**`, stories | design system | todos os estados, sem rede/storage | mocks temporários |
| 3 | Fundação | `api`, schemas, query keys, MSW | 1 para integração | schemas e erros por código | divergência de contrato |
| 4 | Fila e XHR | hook/reducer, adapter PUT | 3 | progresso, abort, 403, retry, object URLs | refresh não retoma bytes |
| 5 | Admin operacional | `components/admin/**` | 4 | quota, metadata, publicação, destaque, polling | URLs temporárias |
| 6 | Ordem e remoção | controls/mutations | 5 | foco, conflito, rollback, `DELETING` | concorrência |
| 7 | Rota admin | `app/(auth)/app/[tenantSlug]/portfolio/**` | fase 04 (auth e tenant shell), 5–6 | OIDC, 403, staff, tenant | fundação pendente |
| 8 | Galeria pública | componentes/rotas públicas | 3 | SSR, paginação, dialog, SEO | allowlist de imagem |
| 9 | Invalidação | handler + fetch RSC | 7–8 | role, slug, tenant, tag e falha | Bearer na fronteira |
| 10 | Hardening | testes/e2e/docs | 1–9 | a11y, Playwright, performance, smoke | sem sink de telemetria |

Todo merge preserva `app → features → shared`, RSC por padrão, dinheiro em centavos e erros por
código. Fechamento: stories quando aplicáveis, testes relevantes, gates verdes, riscos/status e
contrato sincronizados.
