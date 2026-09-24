import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as Car, _ as Gift, a as Ticket, c as Shield, d as Plane, g as Heart, h as House, n as Wallet, o as Sparkles, p as Package, s as ShoppingCart } from "../_libs/lucide-react.mjs";
import { _ as getCategory, d as weekBucket, f as CATEGORIES, l as parseMonthKey, m as MONTHS_DE, o as isInMonth, p as COLOR_VAR, u as shiftMonth, v as cn } from "./router-9JcyfAhP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/category-icon-CQNUiY8f.js
var import_jsx_runtime = require_jsx_runtime();
/** Format cents as German euro, e.g. "€ 1.240,50" */
function formatEUR(cents, opts = {}) {
	const { sign = "none", position = "prefix" } = opts;
	const negative = cents < 0;
	const abs = Math.abs(cents);
	const euros = Math.floor(abs / 100);
	const rest = abs % 100;
	const body = `${euros.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${rest.toString().padStart(2, "0")}`;
	const amount = position === "suffix" ? `${body} €` : `€ ${body}`;
	if (sign === "none") return `${negative ? "-" : ""}${amount}`;
	if (negative) return `-${amount}`;
	if (sign === "always" || cents > 0) return `+${amount}`;
	return amount;
}
function parseKeypad(raw) {
	const normalized = raw.replace(/\./g, "").replace(",", ".").trim();
	if (!normalized || normalized === ".") return 0;
	const value = Number.parseFloat(normalized);
	if (!Number.isFinite(value)) return 0;
	return Math.round(value * 100);
}
function appendKey(raw, key) {
	if (key === "back") return raw.slice(0, -1);
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
function monthTx(transactions, month) {
	return transactions.filter((t) => isInMonth(t.date, month));
}
function totals(transactions) {
	let income = 0;
	let expense = 0;
	for (const t of transactions) if (t.type === "income") income += t.amountCents;
	else expense += t.amountCents;
	const rest = income - expense;
	const usedPct = income > 0 ? Math.round(expense / income * 100) : 0;
	const savePct = income > 0 ? Math.round(rest / income * 100) : 0;
	return {
		income,
		expense,
		rest,
		usedPct,
		savePct
	};
}
function expenseSlices(transactions) {
	const expenses = transactions.filter((t) => t.type === "expense");
	const total = expenses.reduce((s, t) => s + t.amountCents, 0);
	const map = /* @__PURE__ */ new Map();
	for (const t of expenses) {
		const cur = map.get(t.categoryId) ?? {
			amount: 0,
			count: 0
		};
		cur.amount += t.amountCents;
		cur.count += 1;
		map.set(t.categoryId, cur);
	}
	return CATEGORIES.filter((c) => c.kind === "expense").map((c) => {
		const row = map.get(c.id) ?? {
			amount: 0,
			count: 0
		};
		return {
			id: c.id,
			name: c.name,
			short: c.short,
			color: c.color,
			amount: row.amount,
			count: row.count,
			pct: total > 0 ? Math.round(row.amount / total * 100) : 0
		};
	}).filter((s) => s.amount > 0).sort((a, b) => b.amount - a.amount);
}
function weeklyExpense(transactions) {
	const buckets = [
		0,
		0,
		0,
		0
	];
	for (const t of transactions) {
		if (t.type !== "expense") continue;
		buckets[weekBucket(t.date)] += t.amountCents;
	}
	return buckets;
}
function weeklyAverage(transactions) {
	const used = weeklyExpense(transactions).filter((v) => v > 0);
	if (!used.length) return 0;
	return Math.round(used.reduce((s, v) => s + v, 0) / used.length);
}
function sortedRecent(transactions) {
	return [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
function monthTip(transactions, month) {
	const current = monthTx(transactions, month).filter((t) => t.type === "expense");
	const prev = monthTx(transactions, shiftMonth(month, -1)).filter((t) => t.type === "expense");
	if (!current.length) return "Trage deine erste Ausgabe ein — danach siehst du hier, wo sich Sparen am meisten lohnt.";
	const byCat = (list) => {
		const m = /* @__PURE__ */ new Map();
		for (const t of list) m.set(t.categoryId, (m.get(t.categoryId) ?? 0) + t.amountCents);
		return m;
	};
	const nowMap = byCat(current);
	const prevMap = byCat(prev);
	let best = null;
	for (const [id, amount] of nowMap) {
		const before = prevMap.get(id) ?? 0;
		if (before < 1e3) continue;
		const drop = (before - amount) / before;
		if (drop >= .05 && (!best || drop > best.drop)) best = {
			id,
			drop
		};
	}
	if (best) {
		const pct = Math.round(best.drop * 100);
		const name = getCategory(best.id).name;
		const { month: m } = parseMonthKey(shiftMonth(month, -1));
		return `Du hast diesen Monat ${pct}% weniger für ${name} ausgegeben als im ${MONTHS_DE[m]}. Weiter so!`;
	}
	const t = totals(monthTx(transactions, month));
	if (t.savePct >= 30) return `Starke Sparquote von ${t.savePct}%. Überweise einen Teil von ${formatEUR(t.rest)} in dein Sparziel.`;
	const top = expenseSlices(monthTx(transactions, month))[0];
	if (top) return `${top.name} ist mit ${top.pct}% dein größter Posten. Schon 10% weniger wären ${formatEUR(Math.round(top.amount * .1))}.`;
	return "Lege 10% deines Restbudgets fest in ein Sparziel — so wird Sparen zur Gewohnheit.";
}
function extractHashtags(text) {
	return (text.match(/#[\p{L}\p{N}_-]+/gu) ?? []).map((t) => t.slice(1)).filter(Boolean);
}
var ICONS = {
	cart: ShoppingCart,
	car: Car,
	home: House,
	ticket: Ticket,
	heart: Heart,
	box: Package,
	wallet: Wallet,
	gift: Gift,
	spark: Sparkles,
	plane: Plane,
	shield: Shield
};
function CategoryGlyph({ id, className }) {
	const Icon = ICONS[getCategory(id).icon] ?? Package;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		className,
		strokeWidth: 1.9
	});
}
function CategoryBadge({ id, size = "md" }) {
	const cat = getCategory(id);
	const dim = size === "sm" ? "size-9" : size === "lg" ? "size-12" : "size-11";
	const icon = size === "sm" ? "size-4" : "size-5";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex shrink-0 items-center justify-center rounded-xl text-white", dim),
		style: { background: COLOR_VAR[cat.color] },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryGlyph, {
			id,
			className: icon
		})
	});
}
function GoalGlyph({ icon, className }) {
	const Icon = ICONS[icon] ?? Plane;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		className,
		strokeWidth: 1.9
	});
}
//#endregion
export { expenseSlices as a, monthTip as c, sortedRecent as d, totals as f, appendKey as i, monthTx as l, weeklyExpense as m, CategoryGlyph as n, extractHashtags as o, weeklyAverage as p, GoalGlyph as r, formatEUR as s, CategoryBadge as t, parseKeypad as u };
