import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { m as Lightbulb, u as Plus } from "../_libs/lucide-react.mjs";
import { c as monthName, r as useBudgetStore, u as shiftMonth, v as cn } from "./router-9JcyfAhP.mjs";
import { c as monthTip, f as totals, l as monthTx, m as weeklyExpense, p as weeklyAverage, r as GoalGlyph, s as formatEUR } from "./category-icon-CQNUiY8f.mjs";
import { i as GoalDialog, n as ContributeDialog } from "./dialogs-CppZ6E1u.mjs";
import { n as TrendChart } from "./charts-CUsLoBho.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bericht-CFmlgR7d.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReportPage() {
	const transactions = useBudgetStore((s) => s.transactions);
	const viewMonth = useBudgetStore((s) => s.viewMonth);
	const goals = useBudgetStore((s) => s.goals);
	const month = monthTx(transactions, viewMonth);
	const { rest, savePct, income } = totals(month);
	const weeks = weeklyExpense(month);
	const avg = weeklyAverage(month);
	const tip = monthTip(transactions, viewMonth);
	const prevName = monthName(shiftMonth(viewMonth, -1));
	const currName = monthName(viewMonth);
	const [goalOpen, setGoalOpen] = (0, import_react.useState)(false);
	const [contrib, setContrib] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "enter px-5 pb-6 pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-extrabold tracking-tight text-fg",
				children: "Monatsbericht"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-fg-muted",
				children: "Analysiere deine Sparquote & Trends"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-surface p-4 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold text-fg-muted",
						children: "Sparquote"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "tabular mt-2 text-2xl font-extrabold text-primary",
						children: [savePct, "%"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-surface p-4 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold text-fg-muted",
						children: "Restbudget"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("tabular mt-2 text-2xl font-extrabold", rest < 0 ? "text-expense" : "text-fg"),
						children: formatEUR(rest)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 rounded-3xl bg-surface p-4 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-1 text-xs text-fg-muted",
					children: [
						prevName,
						" bis ",
						currName,
						income > 0 ? ` · Einnahmen ${formatEUR(income)}` : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
					weeks,
					average: avg
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7 flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-bold text-fg",
					children: "Sparziele & Träume"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setGoalOpen(true),
					className: "flex items-center gap-1 text-sm font-semibold text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Neu"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-col gap-3",
				children: goals.map((goal) => {
					const pct = goal.targetCents > 0 ? Math.min(100, Math.round(goal.savedCents / goal.targetCents * 100)) : 0;
					const left = Math.max(0, goal.targetCents - goal.savedCents);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setContrib(goal),
						className: "rounded-3xl bg-primary-soft p-4 text-left transition-transform duration-150 active:scale-[0.98]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-9 items-center justify-center rounded-xl bg-primary text-primary-fg",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalGlyph, {
											icon: goal.icon,
											className: "size-4"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-bold text-fg",
										children: goal.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-fg-muted",
										children: ["Ziel: ", formatEUR(goal.targetCents)]
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular text-sm font-bold text-primary",
									children: [pct, "%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 h-2 overflow-hidden rounded-full bg-surface/80",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-primary",
									style: { width: `${pct}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex justify-between text-xs font-medium text-fg-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Bereits ",
									formatEUR(goal.savedCents),
									" gespart"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Noch ", formatEUR(left)] })]
							})
						]
					}, goal.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5 rounded-3xl border border-primary/20 bg-tip p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm font-bold text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-8 items-center justify-center rounded-full bg-primary/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "size-4" })
					}), "Spar-Tipp des Monats"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-fg",
					children: tip
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalDialog, {
				open: goalOpen,
				onOpenChange: setGoalOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContributeDialog, {
				goal: contrib,
				open: !!contrib,
				onOpenChange: (v) => !v && setContrib(null)
			})
		]
	});
}
//#endregion
export { ReportPage as component };
