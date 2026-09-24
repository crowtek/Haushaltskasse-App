import { MONTHS_DE, MONTHS_SHORT_DE } from "@/lib/categories";

export function monthKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export function parseMonthKey(key: string): { year: number; month: number } {
  const [y, m] = key.split("-").map(Number);
  return { year: y ?? new Date().getFullYear(), month: (m ?? 1) - 1 };
}

export function shiftMonth(key: string, delta: number): string {
  const { year, month } = parseMonthKey(key);
  return monthKey(new Date(year, month + delta, 1));
}

export function monthLabel(key: string, style: "long" | "short" = "long"): string {
  const { year, month } = parseMonthKey(key);
  const name = style === "long" ? MONTHS_DE[month] : MONTHS_SHORT_DE[month];
  return `${name} ${year}`;
}

export function monthName(key: string): string {
  const { month } = parseMonthKey(key);
  return MONTHS_DE[month] ?? "";
}

export function isInMonth(iso: string, key: string): boolean {
  const d = new Date(iso);
  return monthKey(d) === key;
}

export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function sameDay(a: string, b: Date = new Date()): boolean {
  const d = new Date(a);
  return (
    d.getFullYear() === b.getFullYear() &&
    d.getMonth() === b.getMonth() &&
    d.getDate() === b.getDate()
  );
}

export function formatDayLabel(iso: string, now: Date = new Date()): string {
  const d = new Date(iso);
  const today = startOfDay(now);
  const that = startOfDay(d);
  const diff = Math.round((today.getTime() - that.getTime()) / 86_400_000);
  const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  if (diff === 0) return `Heute, ${time}`;
  if (diff === 1) return "Gestern";
  return `${String(d.getDate()).padStart(2, "0")}. ${MONTHS_SHORT_DE[d.getMonth()]}`;
}

export function formatPrettyDate(iso: string, now: Date = new Date()): string {
  const d = new Date(iso);
  if (sameDay(iso, now)) {
    return `Heute, ${String(d.getDate()).padStart(2, "0")}. ${MONTHS_SHORT_DE[d.getMonth()]}`;
  }
  return `${String(d.getDate()).padStart(2, "0")}. ${MONTHS_SHORT_DE[d.getMonth()]} ${d.getFullYear()}`;
}

export function weekBucket(iso: string): 0 | 1 | 2 | 3 {
  const day = new Date(iso).getDate();
  if (day <= 7) return 0;
  if (day <= 14) return 1;
  if (day <= 21) return 2;
  return 3;
}

export function atLocal(year: number, monthIndex: number, day: number, hour = 12, minute = 0): string {
  return new Date(year, monthIndex, day, hour, minute, 0, 0).toISOString();
}
