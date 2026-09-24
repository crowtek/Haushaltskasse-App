import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as Search } from "../_libs/lucide-react.mjs";
import { g as categoriesFor, h as SUGGESTED_TAGS, n as Route$3, r as useBudgetStore, s as monthLabel, v as cn } from "./router-9JcyfAhP.mjs";
import { d as sortedRecent, l as monthTx } from "./category-icon-CQNUiY8f.mjs";
import { t as TransactionRow } from "./transaction-row-DXFZg-0v.mjs";
import { c as TransactionDetail } from "./dialogs-CppZ6E1u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/aktivitaeten-BM1L6bzj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ActivityPage() {
	const { cat, tag } = Route$3.useSearch();
	const transactions = useBudgetStore((s) => s.transactions);
	const viewMonth = useBudgetStore((s) => s.viewMonth);
	const customTags = useBudgetStore((s) => s.customTags);
	const [kind, setKind] = (0, import_react.useState)("all");
	const [query, setQuery] = (0, import_react.useState)("");
	const [activeCat, setActiveCat] = (0, import_react.useState)(cat ?? "all");
	const [activeTag, setActiveTag] = (0, import_react.useState)(tag ?? "all");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const tags = [...SUGGESTED_TAGS, ...customTags.filter((t) => !SUGGESTED_TAGS.includes(t))];
	const list = (0, import_react.useMemo)(() => {
		let rows = monthTx(transactions, viewMonth);
		if (kind !== "all") rows = rows.filter((t) => t.type === kind);
		if (activeCat !== "all") rows = rows.filter((t) => t.categoryId === activeCat);
		if (activeTag !== "all") rows = rows.filter((t) => t.tags.includes(activeTag));
		if (query.trim()) {
			const q = query.trim().toLowerCase();
			rows = rows.filter((t) => t.title.toLowerCase().includes(q) || t.note.toLowerCase().includes(q) || t.tags.some((x) => x.toLowerCase().includes(q)));
		}
		return sortedRecent(rows);
	}, [
		transactions,
		viewMonth,
		kind,
		activeCat,
		activeTag,
		query
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "enter px-5 pb-6 pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-extrabold tracking-tight text-fg",
				children: "Aktivitäten"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-fg-muted",
				children: monthLabel(viewMonth)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-4 flex items-center gap-2 rounded-2xl bg-surface px-3 py-3 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-fg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Suchen nach Name oder Tag",
					className: "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-fg-subtle"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-scrollbar mt-3 flex gap-2 overflow-x-auto",
				children: [
					"all",
					"expense",
					"income"
				].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setKind(k),
					className: cn("shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold", kind === k ? "bg-primary text-primary-fg" : "bg-surface text-fg-muted shadow-card"),
					children: k === "all" ? "Alle" : k === "expense" ? "Ausgaben" : "Einnahmen"
				}, k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-scrollbar mt-2 flex gap-2 overflow-x-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					on: activeCat === "all",
					onClick: () => setActiveCat("all"),
					children: "Jede Kategorie"
				}), categoriesFor("expense").concat(categoriesFor("income")).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					on: activeCat === c.id,
					onClick: () => setActiveCat(c.id),
					children: c.short
				}, c.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-scrollbar mt-2 flex gap-2 overflow-x-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					on: activeTag === "all",
					onClick: () => setActiveTag("all"),
					children: "Alle Tags"
				}), tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					on: activeTag === t,
					onClick: () => setActiveTag(t),
					children: t
				}, t))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-col gap-2.5",
				children: list.length ? list.map((tx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionRow, {
					tx,
					showTags: true,
					onClick: () => setSelected(tx)
				}, tx.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-3xl bg-surface px-4 py-8 text-center text-sm text-fg-muted shadow-card",
					children: "Keine Einträge für diese Filter."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionDetail, {
				tx: selected,
				open: !!selected,
				onOpenChange: (v) => !v && setSelected(null)
			})
		]
	});
}
function Chip({ on, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold", on ? "bg-primary text-primary-fg" : "bg-surface text-fg-muted shadow-card"),
		children
	});
}
//#endregion
export { ActivityPage as component };
