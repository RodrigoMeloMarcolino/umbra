export function formatMoney(cents: number | null, currencyCode: string): string {
  if (cents === null) return "Preço sob consulta";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currencyCode,
  }).format(cents / 100).replace(/\u00a0/g, " ");
}
