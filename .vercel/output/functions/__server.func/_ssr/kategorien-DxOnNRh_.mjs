import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as monthName, p as COLOR_VAR, r as useBudgetStore } from "./router-9JcyfAhP.mjs";
import { a as expenseSlices, f as totals, l as monthTx, s as formatEUR, t as CategoryBadge } from "./category-icon-CQNUiY8f.mjs";
import { t as DonutChart } from "./charts-CUsLoBho.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kategorien-DxOnNRh_.js
var import_jsx_runtime = require_jsx_runtime();
function CategoriesPage() {
	const navigate = useNavigate();
	const transactions = useBudgetStore((s) => s.transactions);
	const viewMonth = useBudgetStore((s) => s.viewMonth);
	const month = monthTx(transactions, viewMonth);
	const { expense } = totals(month);
	const slices = expenseSlices(month);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "enter px-5 pb-6 pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-extrabold tracking-tight text-fg",
				children: "Kategorien"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-fg-muted",
				children: "Wohin fließt dein Geld diesen Monat?"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5 rounded-3xl bg-surface px-4 py-5 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-xs font-semibold uppercase tracking-widest text-fg-subtle",
					children: "Ausgaben-Verteilung"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonutChart, {
						slices,
						total: expense
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-7 text-base font-bold text-fg",
				children: "Kategorien-Details"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-col gap-2.5",
				children: slices.length ? slices.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						navigate({
							to: "/aktivitaeten",
							search: { cat: s.id }
						});
					},
					className: "rounded-2xl bg-surface px-3.5 py-3.5 text-left shadow-card transition-transform duration-150 active:scale-[0.98]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryBadge, { id: s.id }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-semibold text-fg",
									children: s.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "tabular shrink-0 text-sm font-bold text-fg",
									children: formatEUR(s.amount)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-1.5 flex-1 overflow-hidden rounded-full bg-surface-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full",
										style: {
											width: `${s.pct}%`,
											background: COLOR_VAR[s.color]
										}
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular w-8 text-right text-xs font-semibold text-fg-muted",
									children: [s.pct, "%"]
								})]
							})]
						})]
					})
				}, s.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-surface px-4 py-8 text-center text-sm text-fg-muted shadow-card",
					children: [
						"Im ",
						monthName(viewMonth),
						" noch keine Ausgaben. Über Neu kannst du die erste erfassen."
					]
				})
			})
		]
	});
}
//#endregion
export { CategoriesPage as component };
