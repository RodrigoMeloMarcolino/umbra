# Fase 06 — Configuração administrativa

Status: todo

## Objetivo

Permitir a owner/admin configurar catálogo, colaboradores, calendários, atribuições e regras de
disponibilidade após o auth/tenant shell, usando os contratos Gnomon já disponíveis.

## Dependências e gate

- Entrada: fase 04 concluída, CORS funcional e schemas OpenAPI ou Zod/fixtures temporários
  congelados para catálogo e disponibilidade.
- Saída: integração real contra o compose local; MSW permanece nos testes.
- Fallback: se o contrato ou ambiente divergir, manter testes MSW e bloquear a integração da rota
  afetada; não inventar payload nem disponibilidade no frontend.

## Escopo

- CRUD de offerings, colaboradores e calendários.
- Atribuição offering ↔ calendar.
- Editor de availability rules: timezone IANA, `weekday` 1–7, `start < end` e snapping de 15
  minutos sobre o calendário próprio.
- UI por permissão para owner/admin/staff, mantendo a API como fronteira de autorização.

## Critérios de aceite

- [ ] Mutations e erros seguem schemas/códigos de contrato.
- [ ] Editor não usa `Date` e não inventa slots fora de `available-slots`.
- [ ] Testes MSW e smoke local cobrem um caminho feliz e erro de validação.
