# Spec — Booking público

Status: pronto para implementação integrada (gate de fundação de integração pendente)
Domínio de referência: `gnomon/docs/specs/booking.md`, PRD backend §6.3 e §11.

## Objetivo

Customer agenda um horário pelo link público do tenant (`/t/{tenantSlug}`) sem criar conta,
com o mínimo de atrito: escolhe serviço, calendário (colaborador) e horário, informa nome +
telefone (+ e-mail opcional) e recebe confirmação.

A experiência é **mobile-first**: o fluxo completo precisa funcionar confortavelmente em celular
antes de receber enriquecimentos de desktop. Desktop pode reorganizar conteúdo em colunas e
resumo lateral, mas não pode depender de uma ordem diferente nem esconder etapas essenciais.

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
- Viewports mobile estreitas → sem overflow horizontal, alvos de toque adequados, textos sem
  sobreposição e CTA principal sempre acessível no passo atual.
- Dia sem disponibilidade / calendário sem regras → empty states claros.
- Semana atravessada por DST na timezone do calendário → grade renderiza o dia de 23h/25h
  corretamente (core do calendário).
- Duplo clique no confirmar → um único POST (mesma chave + botão desabilitado no pending).

## Contratos disponíveis e gate

Consome os contratos públicos já disponíveis no Gnomon: leitura do tenant/catálogo/calendários,
`available-slots` e `POST /v1/public/tenants/{slug}/appointments`. A implementação usa API real
desde o início; MSW reproduz esses contratos apenas nos testes.

Antes do smoke real, a fase 01.5 deve congelar o casing por rota, validar CORS e preparar um
tenant determinístico. Enquanto OpenAPI não existir, schemas Zod e fixtures MSW são o contrato
temporário. Falha desses gates bloqueia a conclusão da integração, não autoriza transformar o
fluxo de produção em mock.

## Estratégia de teste

- Unit: máquina do wizard, formatação de preço, helpers de slot.
- Componente (MSW): fluxo completo feliz; 409 → refetch; 422 → erros por campo; retry com
  mesma idempotency key (assert no handler MSW).
- Responsivo: fluxo feliz validado em viewport mobile antes do desktop; desktop cobre a
  reorganização progressiva do mesmo fluxo.
- E2E (Playwright, task 08): caminho feliz contra backend local determinístico.
- a11y: wizard navegável por teclado; axe-core sem violações.

## Critérios de aceite (a refinar na task 02)

- [ ] Fluxo completo feliz contra API local, com teste de componente MSW equivalente.
- [ ] Fluxo completo usável em mobile e desktop, sem overflow horizontal ou conteúdo
      sobreposto.
- [ ] 409 e 422 cobertos com comportamento visível correto.
- [ ] Idempotency-Key estável por intent comprovada em teste.
- [ ] LCP da página do tenant medido (Lighthouse em CI, quando configurado).
