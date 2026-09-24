import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as PencilLine, w as Calendar } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as formatPrettyDate, g as categoriesFor, r as useBudgetStore, v as cn } from "./router-9JcyfAhP.mjs";
import { i as appendKey, o as extractHashtags, u as parseKeypad } from "./category-icon-CQNUiY8f.mjs";
import { a as Keypad, r as DatePicker, s as TagEditor, t as CategoryPicker } from "./dialogs-CppZ6E1u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/neu-C4rlWW0Y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewEntryPage() {
	const navigate = useNavigate();
	const addTransaction = useBudgetStore((s) => s.addTransaction);
	const [type, setType] = (0, import_react.useState)("expense");
	const [raw, setRaw] = (0, import_react.useState)("0");
	const [categoryId, setCategoryId] = (0, import_react.useState)("food");
	const [date, setDate] = (0, import_react.useState)(() => (/* @__PURE__ */ new Date()).toISOString());
	const [title, setTitle] = (0, import_react.useState)("");
	const [tags, setTags] = (0, import_react.useState)([]);
	const [calOpen, setCalOpen] = (0, import_react.useState)(false);
	const cents = parseKeypad(raw);
	const label = type === "expense" ? "Ausgabenbetrag" : "Einnahmenbetrag";
	function switchType(next) {
		setType(next);
		const first = categoriesFor(next)[0];
		if (first) setCategoryId(first.id);
	}
	const canSave = cents > 0;
	const display = (0, import_react.useMemo)(() => {
		if (!raw || raw === "0") return "0,00";
		if (raw.endsWith(",")) return `${raw}00`.replace(/,00$/, ",");
		return raw;
	}, [raw]);
	function save() {
		if (!canSave) return;
		const fromHash = extractHashtags(title);
		const merged = [.../* @__PURE__ */ new Set([...tags, ...fromHash])];
		const cleanTitle = title.replace(/#[\p{L}\p{N}_-]+/gu, "").trim();
		const cat = categoriesFor(type).find((c) => c.id === categoryId);
		addTransaction({
			type,
			amountCents: cents,
			categoryId,
			title: cleanTitle || cat?.name || "Buchung",
			note: "",
			tags: merged,
			date
		});
		toast(type === "expense" ? "Ausgabe gespeichert" : "Einnahme gespeichert");
		navigate({ to: "/" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "enter flex min-h-full flex-col px-5 pb-4 pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-extrabold tracking-tight text-fg",
				children: type === "expense" ? "Neue Ausgabe" : "Neue Einnahme"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-fg-muted",
				children: [
					"Trage deine ",
					type === "expense" ? "Ausgaben" : "Einnahmen",
					" schnell ein"
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-2 gap-2 rounded-full bg-surface-muted p-1",
				children: ["expense", "income"].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => switchType(t),
					className: cn("rounded-full py-2 text-sm font-semibold transition-colors duration-150", type === t ? "bg-surface text-fg shadow-card" : "text-fg-muted"),
					children: t === "expense" ? "Ausgabe" : "Einnahme"
				}, t))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative mt-4 rounded-3xl bg-surface px-5 py-6 text-center shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-widest text-fg-subtle",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: cn("tabular mt-2 text-5xl font-extrabold tracking-tight", type === "income" ? "text-income" : "text-fg"),
					children: [
						"€ ",
						display,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ml-0.5 inline-block h-8 w-0.5 translate-y-1 animate-pulse bg-primary align-middle" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-sm font-semibold text-fg",
				children: "Kategorie wählen"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryPicker, {
					kind: type,
					value: categoryId,
					onChange: setCategoryId
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-[auto_1fr] gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setCalOpen((v) => !v),
					className: "flex items-center gap-2 rounded-2xl bg-surface px-3 py-3 text-sm font-medium text-fg shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-4 text-fg-muted" }), formatPrettyDate(date)]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex min-w-0 items-center gap-2 rounded-2xl bg-surface px-3 py-3 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PencilLine, { className: "size-4 shrink-0 text-fg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: title,
						onChange: (e) => setTitle(e.target.value),
						placeholder: "Notiz hinzufügen…  #tag",
						className: "min-w-0 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-fg-subtle"
					})]
				})]
			}),
			calOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
					value: date,
					onChange: (iso) => {
						setDate(iso);
						setCalOpen(false);
					}
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagEditor, {
					value: tags,
					onChange: setTags,
					compact: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keypad, { onKey: (k) => setRaw((r) => appendKey(r, k)) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: !canSave,
				onClick: save,
				className: "mt-4 w-full rounded-2xl bg-primary py-4 text-base font-semibold text-primary-fg transition-transform duration-150 active:scale-[0.98] disabled:opacity-40",
				children: type === "expense" ? "Ausgabe Speichern" : "Einnahme Speichern"
			})
		]
	});
}
//#endregion
export { NewEntryPage as component };
