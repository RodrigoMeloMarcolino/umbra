# Fase 01 — Design system + Storybook

Status: todo

## Objetivo

Base visual do Umbra: tokens (cores, tipografia, espaçamento) em Tailwind v4 CSS-first,
componentes essenciais sobre Base UI e Storybook como vitrine/documentação viva.

## Escopo

- Tokens de design em `globals.css` (theme do Tailwind v4): paleta do Umbra, escala
  tipográfica, radius, sombras; dark mode por token.
- Componentes essenciais via shadcn (add): input, label, textarea, select, dialog, popover,
  toast/sonner, card, badge, skeleton, table, form wrappers (integração RHF).
- Storybook 9 configurado (Next.js framework preset) com stories dos componentes base.
- Página interna de "kitchen sink" opcional (ou só stories).

## Fora de escopo

- Componentes de calendário (fase 03); componentes de booking (fase 02 consome o design
  system, ordem do roadmap já garante a base).

## Testes

- Stories renderizam sem erro (smoke via Storybook test-runner ou play functions simples).
- axe-core nos stories dos componentes interativos.

## Critérios de aceite

- [ ] `pnpm storybook` sobe e documenta todos os componentes base.
- [ ] Tokens aplicados: nenhuma cor hard-coded fora do tema (gate em review).
- [ ] Form components integrados a RHF + Zod com exemplo documentado em story.

## Notas de implementação

(preencher ao concluir)
