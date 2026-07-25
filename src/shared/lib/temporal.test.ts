import { describe, expect, it } from "vitest";

import { SLOT_MINUTES, Temporal } from "./temporal";

describe("temporal (ADR 0005)", () => {
  it("converte instante UTC para a timezone IANA do calendário", () => {
    const instant = Temporal.Instant.from("2026-07-24T13:00:00Z");
    const zoned = instant.toZonedDateTimeISO("America/Sao_Paulo");

    expect(zoned.hour).toBe(10); // UTC-3 em julho
    expect(zoned.timeZoneId).toBe("America/Sao_Paulo");
  });

  it("lida com transição de horário de verão em timezone que a possui", () => {
    // 2026-03-08: DST começa em NY — relógio pula de 02:00 para 03:00 (07:00Z).
    const before = Temporal.Instant.from("2026-03-08T06:30:00Z").toZonedDateTimeISO(
      "America/New_York",
    );
    const after = Temporal.Instant.from("2026-03-08T07:30:00Z").toZonedDateTimeISO(
      "America/New_York",
    );

    expect(before.hour).toBe(1); // 01:30 EST (UTC-5), antes da transição
    expect(after.hour).toBe(3); // 03:30 EDT (UTC-4), depois da transição
  });

  it("garante a granularidade de 15 minutos do domínio", () => {
    expect(SLOT_MINUTES).toBe(15);
    const start = Temporal.PlainTime.from("09:00");
    const slots = Array.from({ length: 4 }, (_, i) =>
      start.add({ minutes: i * SLOT_MINUTES }).toString({ smallestUnit: "minute" }),
    );

    expect(slots).toEqual(["09:00", "09:15", "09:30", "09:45"]);
  });
});
