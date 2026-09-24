import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as getCategory, i as formatDayLabel, v as cn } from "./router-9JcyfAhP.mjs";
import { s as formatEUR, t as CategoryBadge } from "./category-icon-CQNUiY8f.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/transaction-row-DXFZg-0v.js
var import_jsx_runtime = require_jsx_runtime();
function TransactionRow({ tx, onClick, showTags = false }) {
	const cat = getCategory(tx.categoryId);
	const positive = tx.type === "income";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex w-full items-center gap-3 rounded-2xl bg-surface px-3.5 py-3 text-left shadow-card transition-transform duration-150 ease-out active:scale-[0.98]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryBadge, { id: tx.categoryId }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate text-sm font-semibold text-fg",
						children: tx.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-0.5 flex items-center gap-1.5 text-xs text-fg-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: cat.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg-subtle",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0",
								children: formatDayLabel(tx.date)
							})
						]
					}),
					showTags && tx.tags.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 flex flex-wrap gap-1",
						children: tx.tags.slice(0, 3).map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-surface-muted px-1.5 py-px text-xs font-medium text-fg-muted",
							children: tag
						}, tag))
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("tabular shrink-0 text-sm font-semibold", positive ? "text-income" : "text-expense"),
				children: formatEUR(positive ? tx.amountCents : -tx.amountCents, { sign: "always" })
			})
		]
	});
}
//#endregion
export { TransactionRow as t };
