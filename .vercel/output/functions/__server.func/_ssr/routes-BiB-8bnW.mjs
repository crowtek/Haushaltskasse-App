import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { E as ArrowDownLeft, T as ArrowUpRight, b as ChevronLeft, y as ChevronRight } from "../_libs/lucide-react.mjs";
import { r as useBudgetStore, s as monthLabel, u as shiftMonth } from "./router-9JcyfAhP.mjs";
import { d as sortedRecent, f as totals, l as monthTx, s as formatEUR } from "./category-icon-CQNUiY8f.mjs";
import { t as TransactionRow } from "./transaction-row-DXFZg-0v.mjs";
import { c as TransactionDetail, o as SettingsDialog } from "./dialogs-CppZ6E1u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BiB-8bnW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OverviewPage() {
	const profile = useBudgetStore((s) => s.profile);
	const transactions = useBudgetStore((s) => s.transactions);
	const viewMonth = useBudgetStore((s) => s.viewMonth);
	const setViewMonth = useBudgetStore((s) => s.setViewMonth);
	const [settingsOpen, setSettingsOpen] = (0, import_react.useState)(false);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const month = monthTx(transactions, viewMonth);
	const { income, expense, rest, usedPct } = totals(month);
	const recent = sortedRecent(month).slice(0, 4);
	const over = rest < 0;
	const initials = profile.name.trim().slice(0, 1).toUpperCase() || "S";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "enter px-5 pb-6 pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-extrabold tracking-tight text-fg",
					children: "Haushaltskasse"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-fg-muted",
					children: [
						"Hallo, ",
						profile.name,
						"! Dein Budget im Blick."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setSettingsOpen(true),
					className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-fg shadow-card",
					"aria-label": "Profil öffnen",
					children: initials
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center justify-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-9 items-center justify-center rounded-full bg-surface shadow-card",
						onClick: () => setViewMonth(shiftMonth(viewMonth, -1)),
						"aria-label": "Vorheriger Monat",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "min-w-36 text-center text-sm font-semibold text-fg",
						children: monthLabel(viewMonth)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-9 items-center justify-center rounded-full bg-surface shadow-card",
						onClick: () => setViewMonth(shiftMonth(viewMonth, 1)),
						"aria-label": "Nächster Monat",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5 rounded-3xl bg-primary p-5 text-primary-fg shadow-card",
				style: { background: over ? "var(--color-expense)" : "var(--color-primary)" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-widest text-primary-fg/70",
						children: "Verfügbares Restbudget"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tabular mt-2 text-4xl font-extrabold tracking-tight",
						children: formatEUR(rest)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 h-1.5 overflow-hidden rounded-full bg-primary-fg/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-primary-fg/85",
							style: { width: `${Math.min(100, usedPct)}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center justify-between text-xs font-medium text-primary-fg/80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [Math.min(usedPct, 999), "% des Budgets verbraucht"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Insgesamt ", formatEUR(income)] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
					label: "Einnahmen",
					value: formatEUR(income),
					tone: "income",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownLeft, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
					label: "Ausgaben",
					value: formatEUR(expense),
					tone: "expense",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7 flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-bold text-fg",
					children: "Letzte Aktivitäten"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/aktivitaeten",
					className: "text-sm font-semibold text-primary",
					children: "Alle anzeigen"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-col gap-2.5",
				children: recent.length ? recent.map((tx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionRow, {
					tx,
					onClick: () => setSelected(tx)
				}, tx.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EmptyCard, { children: [
					"Noch keine Buchungen in diesem Monat. Tippe auf ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Neu" }),
					", um loszulegen."
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsDialog, {
				open: settingsOpen,
				onOpenChange: setSettingsOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionDetail, {
				tx: selected,
				open: !!selected,
				onOpenChange: (v) => !v && setSelected(null)
			})
		]
	});
}
function MiniStat({ label, value, tone, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl bg-surface p-4 shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-xs font-semibold text-fg-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: tone === "income" ? "flex size-7 items-center justify-center rounded-full bg-primary-soft text-income" : "flex size-7 items-center justify-center rounded-full bg-expense/10 text-expense",
				children: icon
			}), label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: tone === "income" ? "tabular mt-3 text-lg font-bold text-income" : "tabular mt-3 text-lg font-bold text-expense",
			children: value
		})]
	});
}
function EmptyCard({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-3xl bg-surface px-4 py-8 text-center text-sm text-fg-muted shadow-card",
		children
	});
}
//#endregion
export { OverviewPage as component };
