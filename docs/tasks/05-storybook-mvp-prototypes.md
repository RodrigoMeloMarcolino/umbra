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
- [x] Gates de lint, typecheck, testes e build do Storybook.

## Checkpoint da primeira onda (2026-07-30)

- Booking foi separado em tipos de view model/callbacks, contratos Zod temporários e stories de
  preço sob consulta, retry recuperável e callbacks observáveis.
- O Month picker agora recebe mês, seleção e estado dos dias por props serializáveis; dias sem
  informação de disponibilidade não são apresentados como disponíveis.
- O protótipo continua fixture-only: não há rota produtiva, API real, cálculo de slots ou regra
  de domínio dentro das stories.
- Próximos gates: congelar a matriz de contratos com o Gnomon, implementar o core Temporal puro
  da task 03A e substituir a grade demonstrativa do booking pela view aprovada.

## Validação 2026-07-30

- `pnpm lint` ✔
- `pnpm typecheck` ✔
- `pnpm test` ✔ (2 arquivos, 5 testes)
- `pnpm build-storybook` ✔ (warnings de tamanho de bundle do Storybook)
- `pnpm build` ✔ após remover a dependência de rede de `next/font/google`; o layout usa stack local
  do sistema até um arquivo de fonte versionado ser escolhido.

## Riscos

Os contratos admin de appointments/customers ainda são fixtures de contrato futuro; nenhum deles
é usado em produção.

## Validação

- TypeScript e ESLint executados com os binários locais antes da restauração de dependências.
- `pnpm test` e `pnpm build-storybook` permanecem pendentes: o ambiente perdeu o binding Linux
  de Rolldown e a reinstalação do `node_modules` não conclui dentro do limite do executor.
