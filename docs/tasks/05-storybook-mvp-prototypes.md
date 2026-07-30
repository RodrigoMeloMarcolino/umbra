# Task intermediária — Protótipos Storybook do MVP

Status: doing

## Objetivo

Construir o contrato visual do MVP operacional com fixtures locais e stories interativas.

## Checklist

- [x] Spec visual e matriz ator/contrato/estado.
- [x] Padrões reutilizáveis: PageHeader, EmptyState, FeedbackPanel, Pagination e shell admin.
- [x] Wizard público por etapas e cenários de erro/confirmação.
- [x] Superfícies Month, Week, Day e Availability Week.
- [x] Composições de operação/admin para agenda, appointments, customers, catálogo, equipe, disponibilidade, membros e configurações.
- [ ] Gates de lint, typecheck, testes e build do Storybook.

## Riscos

Os contratos admin de appointments/customers ainda são fixtures de contrato futuro; nenhum deles
é usado em produção.

## Validação

- TypeScript e ESLint executados com os binários locais antes da restauração de dependências.
- `pnpm test` e `pnpm build-storybook` permanecem pendentes: o ambiente perdeu o binding Linux
  de Rolldown e a reinstalação do `node_modules` não conclui dentro do limite do executor.
