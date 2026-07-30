# Sequência oficial de implementação do Umbra

Data do snapshot: 2026-07-30.

## Evidências do snapshot

| Repositório | Estado relevante | Evidência usada nesta sequência |
| --- | --- | --- |
| Umbra | Fundação e design system concluídos; Storybook 05 e portfólio 05.5 em andamento | `docs/tasks/README.md` e tasks locais |
| Gnomon | Fases 01–04 concluídas; fase 05 (cache) em conclusão; fase 07 (painel admin) e 07.5 (portfólio) pendentes | `gnomon/docs/tasks/README.md` e `implementation-checkpoint.md` |

O Gnomon continua sendo a fonte da verdade de domínio e contrato. Este documento registra o
estado observado, não altera o backend nem redefine suas fases.

## Matriz de disponibilidade

| Feature Umbra | Backend | Uso agora | Gate para produção/integrar |
| --- | --- | --- | --- |
| Fundação, design system e Storybook | independente | implementar normalmente | nenhum |
| Booking público: tenant, catálogo, calendários, slots e criação | identidade, catálogo, disponibilidade e booking disponíveis | API real desde o início; MSW somente em testes | contratos e ambiente local utilizáveis |
| Auth e tenant shell | identidade/OIDC e tenants disponíveis | integrar após gate de contrato/CORS | CORS e tenant determinístico |
| Configuração: offerings, colaboradores, calendários e availability | catálogo e disponibilidade disponíveis | integrar após auth shell | auth/CORS e schemas congelados/OpenAPI |
| Agenda, appointments e customers | Gnomon 07 pendente | Storybook/MSW contratual, sem integração de produção | Gnomon 07 aceito |
| Cancelamento/remarcação públicos | Gnomon 08 pendente | backlog estacionado | Gnomon 08 aceito |
| Portfólio | Gnomon 07.5 pendente | Storybook e refinamento locais | Gnomon 07.5, OpenAPI, CORS e storage aceitos |

## Bloqueios contratuais transversais

1. **CORS:** a configuração atual não contempla `PUT`; é gate especialmente para uploads
   presignados do portfólio e deve ser validada também no fluxo local do Umbra.
2. **Casing JSON misto:** endpoints/documentação usam camelCase e snake_case. Antes de cada
   integração, congelar o schema por rota e o mapeamento de fronteira; não normalizar por
   suposição dentro das features.
3. **OpenAPI ausente:** até a publicação, schemas Zod e fixtures/handlers MSW versionados no
   Umbra são o contrato temporário de teste; OpenAPI substitui essa duplicação, não a semântica.
4. **Ambiente local:** o smoke exige origem Umbra permitida, Keycloak acessível e um tenant com
   catálogo, calendário, regra e slot determinísticos. Sem isso, não declarar integração real
   concluída.

## Trilha crítica recomendada

```
01.5 contratos → 03A Calendar Core (booking) → 02 booking real → 04 auth/tenant shell
      → 06 configuração admin → 03B Calendar Core (agenda) → 07 agenda → 08 hardening
```

Storybook 05 continua como checkpoint ativo e pode avançar em paralelo quando não depender de
contrato real. O workstream 05.5 permanece estacionado para produção, mas seus protótipos locais
podem evoluir em Storybook.

## Gates, critérios e fallback

| Gate | Entrada | Saída | Fallback permitido |
| --- | --- | --- | --- |
| 01.5 Contratos | endpoints públicos existentes; acesso ao Gnomon | schemas por rota, casing decidido, CORS verificado, tenant de smoke documentado | MSW contratual apenas para testes enquanto o ambiente falha |
| Booking real | 01.5 concluída e 03A disponível | smoke no endpoint público e testes MSW equivalentes | bloquear deploy/integrar; manter testes MSW, sem trocar a implementação por mock |
| Auth shell | configuração OIDC, `/v1/tenants`, CORS e tenant de desenvolvimento | redirect/login/sessão contra compose local | mock de sessão/MSW exclusivamente em testes de componente |
| Configuração admin | auth shell e contratos de catálogo/disponibilidade congelados | CRUDs e regras contra API local | MSW contratual em testes; aguardar correção de contrato para integração |
| Agenda/admin | contrato Gnomon 07 publicado | listagem, detalhe, customers e ações reais | Stories/MSW de contrato futuro; nenhuma rota de produção integrada |
| Público cancelamento/remarcação | contrato Gnomon 08 publicado | token, concorrência e smoke reais | backlog estacionado, sem UI operacional |
| Portfólio | Gnomon 07.5 + OpenAPI/CORS/storage aceitos | integração admin/pública e smoke com Garage | Storybook, fixtures e MSW/XHR fake sem produção |

## Backlog estacionado

- Cancelamento e remarcação pública permanecem fora da sequência até o gate Gnomon 08.
- Portfólio permanece no workstream 05.5: protótipos e documentação são independentes; produção
  fica bloqueada pelo gate Gnomon 07.5.
- Cache e observabilidade do Gnomon não são gates do frontend nesta sequência.
