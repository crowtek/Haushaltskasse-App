import {
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { COLOR_VAR } from "@/lib/categories";
import { formatEUR } from "@/lib/money";
import type { CategorySlice } from "@/lib/selectors";

export function DonutChart({
  slices,
  total,
}: {
  slices: CategorySlice[];
  total: number;
}) {
  const data = slices.length
    ? slices
    : [{ id: "other", name: "Keine Daten", short: "–", color: "other" as const, amount: 1, pct: 100, count: 0 }];

  return (
    <div className="relative mx-auto h-52 w-52">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            innerRadius={68}
            outerRadius={92}
            startAngle={90}
            endAngle={-270}
            stroke="var(--color-surface)"
            strokeWidth={4}
            paddingAngle={1.5}
          >
            {data.map((s) => (
              <Cell key={s.id} fill={COLOR_VAR[s.color]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">Gesamt</span>
        <span className="tabular text-lg font-bold text-fg">{formatEUR(total, { position: "suffix" })}</span>
      </div>
    </div>
  );
}

export function TrendChart({ weeks, average }: { weeks: number[]; average: number }) {
  const data = weeks.map((value, i) => ({
    label: `W${i + 1}`,
    value: value / 100,
  }));

  return (
    <div>
      <div className="mb-2 flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-fg">Ausgaben-Trend</p>
          <p className="text-xs text-fg-muted">Vier Wochen im Blick</p>
        </div>
        <p className="tabular text-xs font-semibold text-expense">
          Ø {formatEUR(average, { position: "suffix" })} / Wo.
        </p>
      </div>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
            <XAxis
              dataKey="label"
              tick={{ fill: "var(--color-fg-muted)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip
              formatter={(value) => formatEUR(Math.round(Number(value) * 100))}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid var(--color-border)",
                fontSize: 12,
              }}
              labelFormatter={(label) => `Woche ${String(label).slice(1)}`}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--color-primary)"
              strokeWidth={2.6}
              dot={{ r: 5, fill: "var(--color-primary)", stroke: "var(--color-surface)", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
