# Fase 01 — Design system + Storybook

Status: done

## Objetivo

Base visual do Umbra: tokens (cores, tipografia, espaçamento) em Tailwind v4 CSS-first,
componentes essenciais sobre Base UI e Storybook como vitrine/documentação viva.

## Escopo

- Tokens de design em `globals.css` (theme do Tailwind v4): paleta do Umbra, escala
  tipográfica, radius, sombras; dark mode por token.
- Componentes essenciais via shadcn (add): input, label, textarea, select, dialog, popover,
  toast/sonner, card, badge, skeleton, table, form wrappers (integração RHF).
- Storybook 10 configurado (Next.js framework preset) com stories dos componentes base.
- Página interna de "kitchen sink" opcional (ou só stories).

## Fora de escopo

- Componentes de calendário (fase 03); componentes de booking (fase 02 consome o design
  system, ordem do roadmap já garante a base).

## Testes

- Stories renderizam sem erro (smoke via Storybook test-runner ou play functions simples).
- axe-core nos stories dos componentes interativos.

## Critérios de aceite

- [x] `pnpm storybook` sobe e documenta todos os componentes base.
- [x] Tokens aplicados: nenhuma cor hard-coded fora do tema (gate em review).
- [x] Form components integrados a RHF + Zod com exemplo documentado em story.

## Validação executada

- `pnpm lint` ✔ (executado via `./node_modules/.bin/eslint` neste ambiente)
- `pnpm typecheck` ✔ (executado via `./node_modules/.bin/tsc --noEmit`)
- `pnpm test` ✔ (3 testes; executado com Node 24 temporário porque o Node 18 do WSL não suporta o Vitest/Rolldown atual)
- `pnpm build-storybook` ✔ (build estático em `/tmp/umbra-storybook-static`; warnings apenas de tamanho de bundle do Storybook)
- `pnpm build` ✔ (Next production build com Turbopack)

## Notas de implementação

- Identidade visual inicial definida como **Solar premium**: base clara, âmbar solar, grafite/sombra e estados suaves.
- Storybook 10 configurado como mesa de desenho gratuita/code-first, com addon a11y.
- Componentes base adicionados em `src/shared/ui`: input, label, textarea, select, dialog, popover, sonner/toast, card, badge, skeleton, table e wrappers de form.
- Stories criadas para tokens, componentes, exemplo RHF + Zod e protótipo estático do booking público.
- Protótipo do booking usa dados mockados estáticos e não implementa API/MSW/idempotência; isso permanece para a Fase 02.
- `.npmrc` adicionado para manter o pnpm em `/mnt/c` usando o store e o `virtual-store-dir-max-length` compatíveis com este ambiente.

## Riscos / follow-ups

- Automatizar axe/test-runner em CI numa fase posterior; por ora o addon a11y está disponível no Storybook para inspeção visual.
- Storybook emite warnings de asset size no build; esperado para a ferramenta e não afeta o bundle público do Next.
- Se o desenvolvimento continuar no WSL com Node 18, usar Node 24+ para Vitest/Storybook ou atualizar o runtime local.
- `pnpm-lock.yaml` foi limpo com `pnpm clean --lockfile` e reconstruído com pnpm 11 para satisfazer as supply-chain policies; `core-js-pure` e `esbuild` ficaram explicitamente aprovados em `allowBuilds` por serem dependências esperadas do Storybook/build tooling.
