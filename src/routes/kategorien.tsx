import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useBudgetStore } from "@/lib/store";
import { monthTx, totals, expenseSlices } from "@/lib/selectors";
import { formatEUR } from "@/lib/money";
import { monthName } from "@/lib/dates";
import { COLOR_VAR } from "@/lib/categories";
import { CategoryBadge } from "@/components/category-icon";
import { DonutChart } from "@/components/charts";

export const Route = createFileRoute("/kategorien")({ component: CategoriesPage });

function CategoriesPage() {
  const navigate = useNavigate();
  const transactions = useBudgetStore((s) => s.transactions);
  const viewMonth = useBudgetStore((s) => s.viewMonth);
  const month = monthTx(transactions, viewMonth);
  const { expense } = totals(month);
  const slices = expenseSlices(month);

  return (
    <div className="enter px-5 pb-6 pt-8">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight text-fg">Kategorien</h1>
        <p className="mt-1 text-sm text-fg-muted">Wohin fließt dein Geld diesen Monat?</p>
      </header>

      <section className="mt-5 rounded-3xl bg-surface px-4 py-5 shadow-card">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-fg-subtle">
          Ausgaben-Verteilung
        </p>
        <div className="mt-2">
          <DonutChart slices={slices} total={expense} />
        </div>
      </section>

      <h2 className="mt-7 text-base font-bold text-fg">Kategorien-Details</h2>
      <div className="mt-3 flex flex-col gap-2.5">
        {slices.length ? (
          slices.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                navigate({ to: "/aktivitaeten", search: { cat: s.id } });
              }}
              className="rounded-2xl bg-surface px-3.5 py-3.5 text-left shadow-card transition-transform duration-150 active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <CategoryBadge id={s.id} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-fg">{s.name}</p>
                    <p className="tabular shrink-0 text-sm font-bold text-fg">{formatEUR(s.amount)}</p>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-muted">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${s.pct}%`, background: COLOR_VAR[s.color] }}
                      />
                    </div>
                    <span className="tabular w-8 text-right text-xs font-semibold text-fg-muted">{s.pct}%</span>
                  </div>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="rounded-3xl bg-surface px-4 py-8 text-center text-sm text-fg-muted shadow-card">
            Im {monthName(viewMonth)} noch keine Ausgaben. Über Neu kannst du die erste erfassen.
          </div>
        )}
      </div>
    </div>
  );
}
