# ADR 0006 — Upload direto PUT pré-assinado via XHR, fila local e TanStack Query

Status: Accepted
Data: 2026-07-29

## Contexto

Portfólio exige progresso, cancelamento, quota e lifecycle remoto, sem misturar transporte
efêmero com estado de servidor.

## Decisão

PUT direto à URL pré-assinada usa XHR. Fila, progresso, previews e abort controllers vivem em
reducer/hook local; TanStack Query administra registros e mutations. Há três uploads ativos, UUID
por intenção, uma renovação após 403, `complete` repetível e limpeza ao cancelar.

## Consequências

XHR oferece progresso/cancelamento, mas exige preflight CORS. Fetch, SSE, WebSocket, store global
e multipart ficam fora do MVP. Object URLs devem ser revogadas; refresh não retoma bytes parciais.

## Rastreabilidade

- `docs/features/tenant-portfolio/frontend-refinement.md`
- [MDN: XMLHttpRequest upload](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload)
