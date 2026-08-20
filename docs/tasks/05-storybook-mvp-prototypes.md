# Task intermediária — Protótipos Storybook do MVP

Status: done

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

## Validação final — 2026-08-20

- A matriz visual permanece ativa e foi conferida contra 7 arquivos e 41 stories: design system,
  booking, acesso/tenant, calendário e admin cobrem os estados de loading, vazio, erro, 409,
  422, sucesso, readonly, role e mobile.
- Smoke em `pnpm storybook`: componentes base e formulário RHF/Zod; booking mobile e seus estados;
  Month Picker, Week/Day, disponibilidade, timezone e DST; e superfícies admin owner/staff,
  acesso negado, conflito e erro recuperável. Teclado, foco de Dialog/Popover, nomes acessíveis,
  reflow e ausência de overflow não apresentaram bloqueadores observáveis; o painel a11y foi usado
  como inspeção, sem declaração formal de conformidade WCAG.
- Os protótipos continuam fixture-only e não representam rota, integração produtiva, API real,
  cálculo de slots ou regra de domínio.
- `pnpm lint` ✔
- `pnpm typecheck` ✔
- `pnpm test` ✔ (3 arquivos, 8 testes)
- `pnpm build-storybook --output-dir /tmp/umbra-storybook-static` ✔ (somente warnings conhecidos
  de tamanho de bundle do Storybook)

## Follow-ups

- Contratos administrativos futuros de appointments/customers, que seguem como fixtures e não são
  usados em produção.
- Testes aprofundados de interação e a11y no hardening documentado.
