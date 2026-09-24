import { CATEGORIES, getCategory, MONTHS_DE } from "@/lib/categories";
import { isInMonth, parseMonthKey, shiftMonth, weekBucket } from "@/lib/dates";
import { formatEUR } from "@/lib/money";
import type { Category, CategoryId, Transaction } from "@/lib/types";

export function monthTx(transactions: Transaction[], month: string): Transaction[] {
  return transactions.filter((t) => isInMonth(t.date, month));
}

export function totals(transactions: Transaction[]) {
  let income = 0;
  let expense = 0;
  for (const t of transactions) {
    if (t.type === "income") income += t.amountCents;
    else expense += t.amountCents;
  }
  const rest = income - expense;
  const usedPct = income > 0 ? Math.round((expense / income) * 100) : 0;
  const savePct = income > 0 ? Math.round((rest / income) * 100) : 0;
  return { income, expense, rest, usedPct, savePct };
}

export interface CategorySlice {
  id: CategoryId;
  name: string;
  short: string;
  color: Category["color"];
  amount: number;
  pct: number;
  count: number;
}

export function expenseSlices(transactions: Transaction[]): CategorySlice[] {
  const expenses = transactions.filter((t) => t.type === "expense");
  const total = expenses.reduce((s, t) => s + t.amountCents, 0);
  const map = new Map<CategoryId, { amount: number; count: number }>();
  for (const t of expenses) {
    const cur = map.get(t.categoryId) ?? { amount: 0, count: 0 };
    cur.amount += t.amountCents;
    cur.count += 1;
    map.set(t.categoryId, cur);
  }
  return CATEGORIES.filter((c) => c.kind === "expense")
    .map((c) => {
      const row = map.get(c.id) ?? { amount: 0, count: 0 };
      return {
        id: c.id,
        name: c.name,
        short: c.short,
        color: c.color,
        amount: row.amount,
        count: row.count,
        pct: total > 0 ? Math.round((row.amount / total) * 100) : 0,
      };
    })
    .filter((s) => s.amount > 0)
    .sort((a, b) => b.amount - a.amount);
}

export function weeklyExpense(transactions: Transaction[]): number[] {
  const buckets = [0, 0, 0, 0];
  for (const t of transactions) {
    if (t.type !== "expense") continue;
    buckets[weekBucket(t.date)] += t.amountCents;
  }
  return buckets;
}

export function weeklyAverage(transactions: Transaction[]): number {
  const weeks = weeklyExpense(transactions);
  const used = weeks.filter((v) => v > 0);
  if (!used.length) return 0;
  return Math.round(used.reduce((s, v) => s + v, 0) / used.length);
}

export function sortedRecent(transactions: Transaction[]): Transaction[] {
  return [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function monthTip(transactions: Transaction[], month: string): string {
  const current = monthTx(transactions, month).filter((t) => t.type === "expense");
  const prev = monthTx(transactions, shiftMonth(month, -1)).filter((t) => t.type === "expense");
  if (!current.length) {
    return "Trage deine erste Ausgabe ein — danach siehst du hier, wo sich Sparen am meisten lohnt.";
  }

  const byCat = (list: Transaction[]) => {
    const m = new Map<CategoryId, number>();
    for (const t of list) m.set(t.categoryId, (m.get(t.categoryId) ?? 0) + t.amountCents);
    return m;
  };
  const nowMap = byCat(current);
  const prevMap = byCat(prev);

  let best: { id: CategoryId; drop: number } | null = null;
  for (const [id, amount] of nowMap) {
    const before = prevMap.get(id) ?? 0;
    if (before < 1000) continue;
    const drop = (before - amount) / before;
    if (drop >= 0.05 && (!best || drop > best.drop)) best = { id, drop };
  }
  if (best) {
    const pct = Math.round(best.drop * 100);
    const name = getCategory(best.id).name;
    const { month: m } = parseMonthKey(shiftMonth(month, -1));
    const prevName = MONTHS_DE[m];
    return `Du hast diesen Monat ${pct}% weniger für ${name} ausgegeben als im ${prevName}. Weiter so!`;
  }

  const t = totals(monthTx(transactions, month));
  if (t.savePct >= 30) {
    return `Starke Sparquote von ${t.savePct}%. Überweise einen Teil von ${formatEUR(t.rest)} in dein Sparziel.`;
  }
  const top = expenseSlices(monthTx(transactions, month))[0];
  if (top) {
    return `${top.name} ist mit ${top.pct}% dein größter Posten. Schon 10% weniger wären ${formatEUR(Math.round(top.amount * 0.1))}.`;
  }
  return "Lege 10% deines Restbudgets fest in ein Sparziel — so wird Sparen zur Gewohnheit.";
}

export function extractHashtags(text: string): string[] {
  const found = text.match(/#[\p{L}\p{N}_-]+/gu) ?? [];
  return found.map((t) => t.slice(1)).filter(Boolean);
}
