// ADR 0005 — Temporal é a ÚNICA API de datas do projeto.
// Todo o código importa `Temporal` daqui, nunca de `@js-temporal/polyfill`
// diretamente. Quando o Temporal estiver nativo estável nos browsers/Node
// alvo, este arquivo passa a re-exportar o global e o polyfill sai do bundle.
export { Temporal } from "@js-temporal/polyfill";

/** Granularidade de slot do domínio Gnomon (ADR 0010 do backend). */
export const SLOT_MINUTES = 15;
