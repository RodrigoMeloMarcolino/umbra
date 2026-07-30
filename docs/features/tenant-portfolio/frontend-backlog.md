# Backlog — Portfólio multi-tenant

Épico: owner/admin monta portfólio de imagens e guests o veem com rapidez, segurança e isolamento
por tenant.

| Ordem | História / task técnica | Dependências | Definition of Done |
| --- | --- | --- | --- |
| 1 | Congelar contratos de portfólio no Gnomon. | Gnomon 07.5 | OpenAPI, erros, CORS e versões aceitos |
| 2 | Revisar stories admin/público sem infraestrutura real. | fixtures locais | todos os estados revisáveis |
| 3 | Criar tipos, schemas, MSW e query keys. | 1 para integração | contratos e erros testados |
| 4 | Selecionar, acompanhar, cancelar e repetir uploads. | 3 | fila XHR, retry e previews limpos |
| 5 | Editar alt/caption, publicar e destacar. | 4 | alt obrigatório e estado autoritativo |
| 6 | Reordenar e remover com segurança. | 5 | foco, versão, rollback e `DELETING` |
| 7 | Acessar gestão protegida. | fase 04 (auth e tenant shell), 5–6 | roles, sessão e tenant cobertos |
| 8 | Ver prévia e galeria pública. | 3 | SSR, lightbox, fallbacks, imagens |
| 9 | Propagar mudança editorial rapidamente. | 7–8 | handler e fallback testados |
| 10 | Endurecer experiência. | 1–9 | a11y, E2E, desempenho, smoke real |

Cada item exige escopo/documentação, stories quando aplicáveis, testes, `lint`, `typecheck`,
`test` e builds verdes; E2E entra somente no hardening. Telemetria espera sink aprovado.
