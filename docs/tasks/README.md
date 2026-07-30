# Roadmap de implementação — Umbra

Índice oficial da sequência de implementação. A ordem é guiada por contratos disponíveis e gates
explícitos, não por uma dependência linear artificial. Status: `todo` | `doing` | `done`.
Detalhes, snapshot e fallback: [sequência de implementação](frontend-implementation-sequence.md).

| Fase | Título | Status | Referência |
| ---- | ------ | ------ | ---------- |
| [00](00-fundacao.md) | Fundação técnica (scaffold, tooling, docs) | done | ADRs 0001, 0004, 0005 |
| [01](01-design-system.md) | Design system + Storybook | done | ADR 0001 |
| [01.5](01.5-contratos-integracao.md) | Contratos e fundação de integração | todo | gates CORS, casing, OpenAPI e ambiente local |
| [03A](03-calendario-core.md) | Calendar Core A — picker para booking | todo | ADR 0003 |
| [02](02-booking-publico.md) | Booking público integrado à API real | todo | spec booking-public, Gnomon 01–04 |
| [04](04-auth-tenant-shell.md) | Auth e tenant shell | todo | ADR 0002, Gnomon 01 |
| [06](06-admin-configuration.md) | Configuração administrativa | todo | Gnomon 02–03 |
| [03B](03-calendario-core.md) | Calendar Core B — week/day para agenda | todo | ADR 0003 |
| [07](07-admin-agenda.md) | Agenda administrativa | todo (gate Gnomon 07) | spec admin-panel |
| [08](08-hardening-mvp.md) | Hardening do MVP | todo | fluxos integrados |
| [05](05-storybook-mvp-prototypes.md) | Contrato visual Storybook do MVP | doing | spec visual |
| [05.5](05.5-tenant-portfolio.md) | Portfólio multi-tenant — refinamento e sequência | doing | docs portfolio, ADRs 0006–0007 |

## Ordem e dependências

```
01.5 → 03A → 02 → 04 → 06 → 03B → 07 → 08
                 ↘ 05 (Storybook, checkpoint ativo)
                 ↘ 05.5 (portfólio; produção bloqueada por Gnomon 07.5)
```

- O booking é integrado à API pública já disponível desde a fase 02; MSW permanece somente em
  testes e como fallback contratual quando um gate externo falhar.
- A fase 03 é uma única task com entregas sequenciais: **A** atende o picker de booking antes da
  conclusão da fase 02; **B** disponibiliza Week/Day e interação de agenda antes da fase 07.
- Gnomon 07 (agenda/appointments/customers), 08 (cancelamento/remarcação público) e 07.5
  (portfólio) são gates explícitos, nunca dependências ocultas.

## Regras do roadmap

1. Critérios de aceite da task são o checklist do PR.
2. Nenhuma decisão arquitetural muda sem ADR (ver AGENTS.md).
3. Ao concluir: atualizar status aqui, registrar notas/riscos na task, verificar se o
   prd-frontend continua verdadeiro.
4. O core do calendário (03A/03B) tem testes escritos junto da implementação — é o coração
   técnico do front, espelhando a regra 4 do roadmap do backend.
