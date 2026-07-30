# Refinamento frontend — Portfólio do tenant

Status: aprovado para planejamento; integração real bloqueada pelo Gnomon 07.5.

## Escopo

| Superfície | Rota | Acesso | Renderização |
| --- | --- | --- | --- |
| Prévia pública | `/t/{tenantSlug}` | guest | RSC; destaque + até cinco imagens |
| Galeria pública | `/t/{tenantSlug}/portfolio` | guest | RSC; 24 itens por página |
| Gestão | `/app/{tenantSlug}/portfolio` | owner/admin | RSC + ilhas cliente mínimas |

Uma vertical slice em `src/features/portfolio` reúne `prototypes`, componentes públicos/admin,
`api`, `hooks`, `schemas`, `types`, `mocks` e testes. Não haverá abstração genérica de mídia ou
upload. `tenantSlug` vem somente da rota, entra em query keys e isola cache e uploads; staff não
acessa a gestão, mas a API permanece a fronteira de autorização.

TanStack Query administra estado remoto administrativo. Fila, previews, progresso e XHRs ficam em
reducer/hook local, sem Redux/Zustand. Galeria é RSC; somente lightbox é cliente. Polling de 3 s
ocorre apenas com `PENDING_UPLOAD`, `PROCESSING` ou `DELETING`, sem background e com refetch no
foco. Ordem é a única mutation otimista; metadata, publicação e destaque aguardam resposta.

## Upload e edição

Lifecycle: `selecionado → validando → reservando → PENDING_UPLOAD + uploading → confirmando →
PROCESSING → AVAILABLE → publicado`; falhas: `inválido`, `upload_failed`,
`confirmation_failed`, `FAILED` e `DELETING`.

- Cliente pré-valida JPEG/PNG/WebP estáticos, extensão/MIME e limite do backend; magic bytes e
  segurança são do Gnomon.
- Três PUTs ativos no máximo; excedentes ficam em fila local e não reservam quota.
- UUID por intenção é preservado em retry/renovação. XHR fornece progresso/cancelamento; 403
  renova uma URL uma vez. XML, URLs e object keys não aparecem na UI.
- Cancelar aborta e pede `DELETE`. `complete` é seguro para repetir; após refresh,
  `PENDING_UPLOAD` permite verificar ou remover/reselecionar. Bytes parciais não são retomáveis.
- Object URLs são só preview e são revogadas ao remover/substituir, receber thumbnail ou desmontar.
- `alt_text` é obrigatório para publicar; caption é opcional. Há um destaque único. Ordem usa
  “mover anterior/próxima”, envia IDs + `portfolio_version` e preserva foco.

## Público, cache e segurança

Grid usa thumbnail; lightbox usa derivada display, Base UI Dialog, Escape, retorno de foco e
anterior/próxima. Há loading, vazio, falha global e falha individual. A UI inclui landmarks,
headings, lista ordenada, labels, `<progress>`, live regions moderadas e alvos móveis; cor não é o
único sinal. `next/image` recebe dimensões e `sizes`, limitado à origem/path público da API e um
redirect. Blobs e URLs temporárias admin usam imagem nativa com dimensões explícitas.

Desempenho: prévia e galeria permanecem RSC, exibem thumbnails antes da derivada display e mantêm
o JavaScript restrito ao diálogo e à gestão. Paginação limita a galeria a 24 itens e a prévia a
cinco. Observabilidade: eventos futuros poderão cobrir reserva, conclusão, falha e invalidação,
mas não serão instrumentados até existir sink; não incluem filename, conteúdo, URL assinada,
token, idempotency key ou tenant ID como label.

Leitura pública usa tag `tenant-portfolio:{slug}` com fallback de 60 s. Após mutation editorial,
o cliente chama `POST /api/revalidate/tenant-portfolio` com Bearer e slug. Handler verifica
owner/admin por leitura mínima no Gnomon, expira tag e ambas as rotas públicas; falha informa
atraso e não reverte a mutation. Nunca registrar token, URL assinada, object key, filename,
conteúdo ou idempotency key; telemetria aguarda sink aprovado.

## Contrato, riscos e aceite

O contrato em `gnomon/docs/features/tenant-portfolio/api-contract.md` prevalece. Antes da
integração, o Gnomon deve aceitar lista admin (`items`, paginação, `portfolio_version`, `usage`,
`limits`, page size 100); imagem/lifecycle/URLs temporárias; reserva PUT opaca; saída pública
mediada; versões; CORS exato; códigos estáveis e envelope sem detalhes de storage/worker.

Gnomon 07.5 bloqueia integração, não Storybook/MSW. URLs admin temporárias são necessárias após
refresh; o handler é fronteira de segurança; SSE/WebSocket/multipart estão fora do MVP. Aceite:
stories locais, unitários de schemas/fila/ordem/previews, componentes, MSW/XHR fake, handler,
a11y, Playwright no hardening e smoke Gnomon + Garage. Gates: lint, typecheck, test,
build-storybook, build e E2E quando introduzido.
