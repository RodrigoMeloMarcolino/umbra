# ADR 0007 — Entrega pública mediada, `next/image` e invalidação imediata do cache

Status: Accepted
Data: 2026-07-29

## Contexto

Imagens públicas devem ser rápidas e seguras, sem master, object key ou URL permanente, enquanto
mudanças editoriais precisam aparecer rapidamente.

## Decisão

O Gnomon serve derivadas públicas mediadas. RSC usa `tenant-portfolio:{slug}` com fallback de 60 s.
`next/image` só aceita origem/path público permitido; previews blob/admin usam imagem nativa. Após
mutation, handler autenticado verifica owner/admin no Gnomon e chama
`revalidateTag(tag, { expire: 0 })`.

## Consequências

Falha de invalidação informa atraso sem reverter mutation. Handler não registra Bearer/URLs/dados
de arquivo e requer testes de role, slug e isolamento de tenant.

## Rastreabilidade

- `docs/features/tenant-portfolio/frontend-refinement.md`
- [Next.js Image](https://nextjs.org/docs/app/api-reference/components/image)
- [Next.js revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)
