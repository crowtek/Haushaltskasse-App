import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { p as COLOR_VAR } from "./router-9JcyfAhP.mjs";
import { s as formatEUR } from "./category-icon-CQNUiY8f.mjs";
import { a as Line, c as ResponsiveContainer, i as XAxis, l as Tooltip, n as LineChart, o as Pie, r as YAxis, s as Cell, t as PieChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/charts-CUsLoBho.js
var import_jsx_runtime = require_jsx_runtime();
function DonutChart({ slices, total }) {
	const data = slices.length ? slices : [{
		id: "other",
		name: "Keine Daten",
		short: "–",
		color: "other",
		amount: 1,
		pct: 100,
		count: 0
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto h-52 w-52",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
				data,
				dataKey: "amount",
				nameKey: "name",
				innerRadius: 68,
				outerRadius: 92,
				startAngle: 90,
				endAngle: -270,
				stroke: "var(--color-surface)",
				strokeWidth: 4,
				paddingAngle: 1.5,
				children: data.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: COLOR_VAR[s.color] }, s.id))
			}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-semibold uppercase tracking-wider text-fg-subtle",
				children: "Gesamt"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular text-lg font-bold text-fg",
				children: formatEUR(total, { position: "suffix" })
			})]
		})]
	});
}
function TrendChart({ weeks, average }) {
	const data = weeks.map((value, i) => ({
		label: `W${i + 1}`,
		value: value / 100
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-2 flex items-end justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold text-fg",
			children: "Ausgaben-Trend"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-fg-muted",
			children: "Vier Wochen im Blick"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "tabular text-xs font-semibold text-expense",
			children: [
				"Ø ",
				formatEUR(average, { position: "suffix" }),
				" / Wo."
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
				data,
				margin: {
					top: 8,
					right: 8,
					left: -18,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						tick: {
							fill: "var(--color-fg-muted)",
							fontSize: 12
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { hide: true }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						formatter: (value) => formatEUR(Math.round(Number(value) * 100)),
						contentStyle: {
							borderRadius: 12,
							border: "1px solid var(--color-border)",
							fontSize: 12
						},
						labelFormatter: (label) => `Woche ${String(label).slice(1)}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "value",
						stroke: "var(--color-primary)",
						strokeWidth: 2.6,
						dot: {
							r: 5,
							fill: "var(--color-primary)",
							stroke: "var(--color-surface)",
							strokeWidth: 2
						},
						activeDot: { r: 6 }
					})
				]
			})
		})
	})] });
}
//#endregion
export { TrendChart as n, DonutChart as t };
