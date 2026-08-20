# Transição do Umbra para o Gnomon Node.js

Status: planejada
Data: 2026-08-19

## 1. Objetivo

Permitir que o Umbra continue usando `gnomon-mock` durante a reimplementação e troque para o
novo `gnomon` sem alteração funcional visível, sem dual write e com rollback por configuração.

## 2. Topologia

```text
Umbra ── configuração ──┬── gnomon-mock (Java, dados descartáveis, referência `/v1`)
                        └── gnomon (Node.js, banco próprio, produção futura)

OpenAPI/contract tests ─┬── gnomon-mock
                        └── gnomon
```

O frontend nunca acessa os dois backends no mesmo fluxo e não replica dados entre eles.

## 3. Contrato que deve permanecer compatível

- métodos, paths, query params e headers;
- JWT Keycloak, issuer/audience e respostas `401/403`;
- CORS e preflights;
- JSON, nullability e casing por rota;
- status HTTP e envelope `error.code/message/details`;
- `Idempotency-Key` por intent;
- booking `201`, replay `200`, conflito de chave `409` e slot concorrente `409`;
- disponibilidade em UTC e timezone IANA;
- filtros, paginação e transições administrativas.

IDs gerados e detalhes de persistência não precisam coincidir, exceto a estabilidade exigida
pelo replay da mesma chave de idempotência no mesmo backend.

## 4. Ambientes

| Ambiente | Backend inicial | Backend alvo |
| --- | --- | --- |
| testes de componentes | MSW contratual | MSW contratual |
| desenvolvimento local | `gnomon-mock` | selecionável entre mock e sucessor |
| CI de contrato | ambos | ambos |
| staging | mock para comparação | sucessor após gates |
| produção | implementação vigente, se houver | sucessor após canário |

Antes do wiring, definir uma configuração central para a base URL de runtime. O nome e a
exposição server/client devem respeitar a arquitetura de fetching do Umbra; nenhuma feature
deve interpolar URLs diretamente.

## 5. Gates antes da troca

- [ ] snapshot OpenAPI do mock versionado;
- [ ] geração de tipos verde contra as duas APIs;
- [ ] diff sem quebra não autorizada;
- [ ] schemas Zod aceitam respostas equivalentes de ambas;
- [ ] smoke determinístico de perfil, catálogo, slots, booking e replay;
- [ ] matriz de erros validada;
- [ ] OIDC/PKCE, audience, CORS e preflights validados;
- [ ] concorrência e idempotência validadas no sucessor pelo backend;
- [ ] nenhuma condicional `if mock/node` em features;
- [ ] observabilidade distingue ambiente/serviço sem expor PII;
- [ ] rollback de configuração ensaiado.

## 6. Sequência

1. Continuar o desenvolvimento do Umbra contra o mock e MSW contratual.
2. Gerar o primeiro snapshot OpenAPI canônico do mock.
3. Executar contract tests contra o sucessor a cada slice publicado.
4. Liberar o sucessor em staging sem apontar usuários reais.
5. Fazer shadow somente de GETs sanitizados quando houver infraestrutura apropriada; nunca
   duplicar POST/PATCH/DELETE.
6. Executar smoke e E2E do Umbra no sucessor.
7. Mudar um ambiente/canário por configuração.
8. Observar erros, latência, booking e auth.
9. Ampliar o tráfego e concluir o cutover.
10. Manter o mock para desenvolvimento até uma decisão posterior de depreciação.

## 7. Rollback

Se o sucessor falhar antes do cutover completo:

1. interromper novas ampliações de tráfego;
2. restaurar a configuração anterior do Umbra;
3. não copiar automaticamente writes do sucessor para o mock;
4. preservar evidências e comparar request/response sem PII;
5. corrigir o sucessor e repetir os gates.

Se dados produtivos já tiverem sido gravados apenas no sucessor, o mock não pode assumir o papel
de backend produtivo sem um plano de dados próprio. Por isso, rollback de frontend e rollback de
dados são decisões distintas.

## 8. Done

A transição termina quando Umbra usa o sucessor em produção, a suíte comum permanece verde, o
contrato canônico passa a ser publicado pelo novo Gnomon e o mock deixa de ser dependência de
runtime sem perder seu papel de fixture/reference para desenvolvimento.
