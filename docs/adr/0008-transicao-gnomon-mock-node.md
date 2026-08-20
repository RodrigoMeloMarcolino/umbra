# ADR 0008 — Transição compatível de `gnomon-mock` para Gnomon Node.js

Status: Accepted
Data: 2026-08-19

## Contexto

O backend Java foi renomeado para `gnomon-mock` e permanecerá disponível como referência
executável para o Umbra. Um novo repositório `gnomon`, em Node.js, substituirá a implementação
de produção preservando a API `/v1` e adotando internamente booking por exclusion constraint
GiST.

O frontend não deve conhecer linguagem, ORM, schema ou mecanismo de concorrência. Seu risco é
drift do comportamento HTTP entre mock e sucessor.

## Decisão

1. O Umbra mantém uma única fronteira de API; URLs não são espalhadas por features.
2. Durante a transição, o backend é selecionado por configuração de ambiente.
3. `GNOMON_OPENAPI_URL` continua governando geração de tipos e pode apontar para mock ou
   sucessor; o artefato gerado deve permanecer sem breaking diff não autorizado.
4. A base URL de runtime será centralizada em `shared/config` antes da integração real; nenhuma
   feature lê variável de ambiente diretamente.
5. Schemas Zod e MSW representam o contrato canônico, não detalhes exclusivos do mock.
6. A mesma suíte black-box cobre mock e sucessor. Umbra só muda de backend depois de OpenAPI,
   auth/CORS, booking e erros equivalentes.
7. Mudanças internas de booking são invisíveis ao front: criação, replay e conflitos preservam
   payloads, status e códigos.
8. Rollback do Umbra é troca de configuração; não existe dual write nem reconciliação feita pelo
   frontend.

## Consequências

- Desenvolvimento pode continuar contra `gnomon-mock`.
- O sucessor pode usar banco próprio e GiST sem mudança no wizard de booking.
- O mock não é fallback de produção automático e não deve ser exposto como serviço produtivo.
- Qualquer divergência precisa ser resolvida no contrato ou versionada, nunca ocultada com
  condicionais por backend dentro das features.

## Rastreabilidade

- `../migrations/gnomon-node-transition.md` contém gates, rollout e rollback.
- Gnomon Node.js ADR 0004 define compatibilidade `/v1`.
- Gnomon Mock ADR 0025 define o novo papel da implementação Java.
