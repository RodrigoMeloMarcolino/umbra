# Roadmap de implementação — Umbra

Ordem de execução das fases. Cada fase só inicia com a anterior concluída. Status:
`todo` | `doing` | `done`.

| Fase | Título | Status | Referência |
| ---- | ------ | ------ | ---------- |
| [00](00-fundacao.md) | Fundação técnica (scaffold, tooling, docs) | done | ADRs 0001, 0004, 0005 |
| [01](01-design-system.md) | Design system + Storybook | todo | ADR 0001 |
| [02](02-booking-publico.md) | Booking público (contra MSW) | todo | spec booking-public, ADRs 0003–0005 |
| [03](03-calendario-core.md) | Core do calendário (headless) + views | todo | ADR 0003 |
| [04](04-admin-agenda.md) | Admin: auth OIDC + agenda + appointments | todo | spec admin-panel, ADR 0002 |

## Ordem e dependências

```
00 → 01 → 02 → 03 → 04
      ↘ (03 pode iniciar em paralelo com 02 após o Month picker mínimo do 02)
```

- 03 (core do calendário) formaliza/generaliza o que o 02 prototipar para o Month picker — o
  booking é o primeiro consumidor real, a agenda admin é o segundo.
- Integração com a API real acontece incrementalmente conforme as fases 01–07 do backend
  sobem; MSW permanece como rede de segurança para testes.
- Fases posteriores (a criar): 05 admin catálogo/colaboradores, 06 editor de disponibilidade,
  07 E2E + Lighthouse + hardening.

## Regras do roadmap

1. Critérios de aceite da task são o checklist do PR.
2. Nenhuma decisão arquitetural muda sem ADR (ver AGENTS.md).
3. Ao concluir: atualizar status aqui, registrar notas/riscos na task, verificar se o
   prd-frontend continua verdadeiro.
4. O core do calendário (03) tem testes escritos junto da implementação — é o coração técnico
   do front, espelhando a regra 4 do roadmap do backend.
