# ADR 0002 — Auth admin via OIDC (Authorization Code + PKCE) com oidc-client-ts

Status: Accepted
Data: 2026-07-23

## Contexto

O ADR 0004 do backend define: Keycloak é o dono da autenticação; a API nunca toca senha; a
autorização é resolvida localmente via `tenant_memberships`. O front admin precisa de um fluxo
que honre isso e ainda proteja o token adequadamente no browser. O booking público não tem
auth nenhuma (ADR 0008 do backend).

## Decisão

1. **Authorization Code Flow + PKCE** contra o realm `gnomon` do Keycloak, usando
   **oidc-client-ts** (OIDC certificado, renovação silenciosa, events de sessão). Nada de
   `keycloak-js` (adapter acoplado ao login page do Keycloak e menos flexível) nem Auth.js
   (resolveria mais do que precisamos e esconderia o OIDC que queremos demonstrar).
2. **Guard no route group `(auth)`**: sem sessão válida → redirect para autorização do
   Keycloak; retorno em callback route dedicada.
3. **Roles nunca decididas no client**: o front lê memberships/roles das respostas da API
   (`GET /v1/tenants` e rotas tenant-scoped) apenas para *esconder/mostrar UI*. Toda decisão de
   autorização é da API (403/404 conforme matriz do backend).
4. **Access token** enviado como `Bearer` nas chamadas `/v1/tenants/...`; refresh pela
   renovação silenciosa do oidc-client-ts. Armazenamento em memória (WebStorage apenas se a
   sessão persistente for produto-aceite depois — follow-up).
5. **Superfície pública permanece 100% desacoplada**: nenhum código OIDC no bundle de
   `(public)`.

## Consequências

- O front nunca renderiza formulário de senha, registro ou recuperação — tudo acontece nas
  telas do Keycloak.
- Testes de componentes admin precisam de um mock de sessão (helper de teste dedicado) e MSW
  para as respostas de membership.
- Multi-tenant: o tenant ativo vem da URL (`/app/[tenantSlug]`), nunca de estado global
  implícito — trocar de tenant é navegar.
- Follow-up documentado: estratégia final de storage do token e silent-renew em iframe vs.
  refresh token rotation, a fechar na task 04 (admin) com um spike real contra o Keycloak do
  docker-compose.

## Rastreabilidade

- Backend: ADR 0004 (Keycloak realm único), ADR 0008 (guest booking sem conta), spec
  `keycloak-auth.md` e `multi-tenancy.md`.
