import type { Category, CategoryId, TxType } from "@/lib/types";

export const CATEGORIES: Category[] = [
  { id: "food", short: "Essen", name: "Lebensmittel", icon: "cart", color: "food", kind: "expense" },
  { id: "transport", short: "Verkehr", name: "Auto & Mobilität", icon: "car", color: "transport", kind: "expense" },
  { id: "home", short: "Wohnen", name: "Wohnen & Strom", icon: "home", color: "home", kind: "expense" },
  { id: "leisure", short: "Freizeit", name: "Freizeit & Kultur", icon: "ticket", color: "leisure", kind: "expense" },
  { id: "health", short: "Gesundheit", name: "Gesundheit", icon: "heart", color: "health", kind: "expense" },
  { id: "other", short: "Sonstiges", name: "Sonstiges", icon: "box", color: "other", kind: "expense" },
  { id: "salary", short: "Gehalt", name: "Gehalt", icon: "wallet", color: "income", kind: "income" },
  { id: "refund", short: "Erstattung", name: "Rückerstattung", icon: "gift", color: "income", kind: "income" },
  { id: "gift", short: "Geschenk", name: "Geschenk", icon: "spark", color: "income", kind: "income" },
];

export const SUGGESTED_TAGS = ["Abo", "Einkauf", "Bar", "Karte", "Online", "Fixkosten"];

export const COLOR_VAR: Record<Category["color"], string> = {
  food: "var(--color-cat-food)",
  transport: "var(--color-cat-transport)",
  home: "var(--color-cat-home)",
  leisure: "var(--color-cat-leisure)",
  health: "var(--color-cat-health)",
  other: "var(--color-cat-other)",
  income: "var(--color-cat-income)",
};

export function getCategory(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[5]!;
}

export function categoriesFor(kind: TxType): Category[] {
  return CATEGORIES.filter((c) => c.kind === kind);
}

export const MONTHS_DE = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
] as const;

export const MONTHS_SHORT_DE = [
  "Jan",
  "Feb",
  "Mär",
  "Apr",
  "Mai",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dez",
] as const;
