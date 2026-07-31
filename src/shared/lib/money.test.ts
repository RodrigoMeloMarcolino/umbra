import { describe, expect, it } from "vitest";

import { formatMoney } from "./money";

describe("formatMoney", () => {
  it("formata centavos inteiros somente na borda", () => {
    expect(formatMoney(8000, "BRL")).toBe("R$ 80,00");
  });

  it("representa preço nulo como consulta", () => {
    expect(formatMoney(null, "BRL")).toBe("Preço sob consulta");
  });
});
