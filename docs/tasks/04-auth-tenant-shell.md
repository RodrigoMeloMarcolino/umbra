# Fase 04 — Auth e tenant shell

Status: todo

## Objetivo

Entregar a entrada autenticada do painel: redirect OIDC, retorno seguro, sessão e seleção/navegação
de tenant. Agenda, appointments e customers são responsabilidade da fase 07.

## Dependências e gate

- Entrada: fase 01.5 com CORS, configuração OIDC e tenant de desenvolvimento documentados.
- Saída: login real contra o Keycloak/API do compose local, `GET /v1/tenants` e shell em
  `/app/{tenantSlug}`.
- Fallback: mock de sessão e MSW são restritos a testes de componente; sem ambiente real, a task
  não é concluída como integrada.

## Escopo

- `oidc-client-ts`, Auth Code + PKCE, callback, silent renew e retorno à rota originalmente
  pedida.
- Guard no route group `(auth)`, seleção de tenant e estados não autenticado/proibido.
- Matriz role → visibilidade de navegação; autorização permanece no Gnomon.

## Fora de escopo

- Agenda, appointments, customers e ações administrativas (fase 07).
- Catálogo, equipe e disponibilidade (fase 06).

## Testes e critérios de aceite

- [ ] Guard e matriz de visibilidade cobertos com mock de sessão/MSW.
- [ ] Login e seleção de tenant validados no compose local.
- [ ] Follow-up do ADR 0002 (storage de token/silent renew) decidido pelo spike real e registrado.

## Notas de implementação

(preencher ao concluir)
