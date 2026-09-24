/** Format cents as German euro, e.g. "€ 1.240,50" */
export function formatEUR(
  cents: number,
  opts: { sign?: "auto" | "always" | "none"; position?: "prefix" | "suffix" } = {},
): string {
  const { sign = "none", position = "prefix" } = opts;
  const negative = cents < 0;
  const abs = Math.abs(cents);
  const euros = Math.floor(abs / 100);
  const rest = abs % 100;
  const grouped = euros.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const body = `${grouped},${rest.toString().padStart(2, "0")}`;
  const amount = position === "suffix" ? `${body} €` : `€ ${body}`;
  if (sign === "none") return `${negative ? "-" : ""}${amount}`;
  if (negative) return `-${amount}`;
  if (sign === "always" || cents > 0) return `+${amount}`;
  return amount;
}

export function parseKeypad(raw: string): number {
  const normalized = raw.replace(/\./g, "").replace(",", ".").trim();
  if (!normalized || normalized === ".") return 0;
  const value = Number.parseFloat(normalized);
  if (!Number.isFinite(value)) return 0;
  return Math.round(value * 100);
}

export function keypadDisplay(raw: string): string {
  if (!raw) return "0";
  return raw;
}

export function appendKey(raw: string, key: string): string {
  if (key === "back") {
    return raw.slice(0, -1);
  }
  if (key === ",") {
    if (raw.includes(",")) return raw;
    return raw ? `${raw},` : "0,";
  }
  if (!/^\d$/.test(key)) return raw;
  const comma = raw.indexOf(",");
  if (comma !== -1 && raw.length - comma > 2) return raw;
  if (raw === "0") return key;
  if (raw.replace(",", "").length >= 8) return raw;
  return `${raw}${key}`;
}

export function centsToKeypad(cents: number): string {
  const abs = Math.abs(cents);
  const euros = Math.floor(abs / 100);
  const rest = abs % 100;
  if (rest === 0) return String(euros);
  return `${euros},${rest.toString().padStart(2, "0")}`;
}
