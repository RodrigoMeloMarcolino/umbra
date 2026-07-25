# Spec — Booking público (rascunho inicial)

Status: draft (detalhar na task 02)
Domínio de referência: `gnomon/docs/specs/booking.md`, PRD backend §6.3 e §11.

## Objetivo

Customer agenda um horário pelo link público do tenant (`/t/{tenantSlug}`) sem criar conta,
com o mínimo de atrito: escolhe serviço, calendário (colaborador) e horário, informa nome +
telefone (+ e-mail opcional) e recebe confirmação.

## Escopo / não-escopo

- Dentro: página do tenant (perfil, colaboradores, catálogo), wizard de booking, seleção de
  horário na grade de 15 min, formulário do customer, confirmação.
- Fora: cancelamento/remarcação pública via token (fase 08 do backend), login de customer
  (não existe — ADR 0009), pagamentos.

## Atores

- Customer (não autenticado).

## Entradas e saídas

- Entrada: seleções do wizard (offering_id, calendar_id, slot_start_at UTC) + nome, telefone,
  e-mail opcional.
- Saída: appointment criado (`201`) com dados de confirmação; erros no envelope padrão.

## Regras de domínio (herdadas, o front materializa)

1. Duração do serviço em múltiplos de 15; horários oferecidos vêm de `available-slots`
   (cálculo dinâmico, advisory — leitura não garante o horário).
2. Exibição sempre na timezone do calendário; transporte sempre em UTC.
3. `Idempotency-Key` obrigatório: UUID por intent de booking; mesmo intent + retry = mesma
   chave; qualquer mudança de payload = nova chave.
4. `409` (horário indisponível) → invalidar slots, re-buscar, orientar nova escolha — nunca
   retentar cegamente o mesmo slot.
5. Preço exibido formatado de `price_cents` + `currency_code` do tenant; nunca float.

## Caminho feliz

1. Customer abre `/t/{slug}` → perfil + catálogo (SSR).
2. Escolhe serviço → escolhe colaborador (ou "qualquer um", se produto decidir na task 02).
3. Escolhe data (Month view) → horários do dia (slots UTC → local).
4. Informa nome + telefone (+ e-mail) → revisão → confirma.
5. `201` → tela de confirmação com resumo (serviço, colaborador, data/hora local, preço).

## Caminhos de erro

- `validation_error` (422) → destacar campos por `details` (mesmos códigos do backend).
- `409` slot indisponível → refetch de slots + mensagem contextual ("alguém reservou esse
  horário").
- Falha de rede/timeout → retry automático com a mesma `Idempotency-Key` (seguro por
  construção).
- `404` tenant inexistente → página de "link inválido".

## Edge cases

- Refresh em qualquer passo → estado restaurado pela URL (nuqs), exceto dados do formulário.
- Dia sem disponibilidade / calendário sem regras → empty states claros.
- Semana atravessada por DST na timezone do calendário → grade renderiza o dia de 23h/25h
  corretamente (core do calendário).
- Duplo clique no confirmar → um único POST (mesma chave + botão desabilitado no pending).

## Impacto de contrato

Consome apenas rotas públicas do PRD §9. Nenhum contrato novo.

## Estratégia de teste

- Unit: máquina do wizard, formatação de preço, helpers de slot.
- Componente (MSW): fluxo completo feliz; 409 → refetch; 422 → erros por campo; retry com
  mesma idempotency key (assert no handler MSW).
- E2E (Playwright, task posterior): caminho feliz contra MSW ou backend local.
- a11y: wizard navegável por teclado; axe-core sem violações.

## Critérios de aceite (a refinar na task 02)

- [ ] Fluxo completo feliz contra MSW, testado.
- [ ] 409 e 422 cobertos com comportamento visível correto.
- [ ] Idempotency-Key estável por intent comprovada em teste.
- [ ] LCP da página do tenant medido (Lighthouse em CI, quando configurado).
