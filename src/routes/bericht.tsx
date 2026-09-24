import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb, Plus } from "lucide-react";
import { useBudgetStore } from "@/lib/store";
import { monthTx, totals, weeklyExpense, weeklyAverage, monthTip } from "@/lib/selectors";
import { formatEUR } from "@/lib/money";
import { monthName, shiftMonth } from "@/lib/dates";
import { TrendChart } from "@/components/charts";
import { ContributeDialog, GoalDialog } from "@/components/dialogs";
import { GoalGlyph } from "@/components/category-icon";
import type { SavingsGoal } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/bericht")({ component: ReportPage });

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

  const [goalOpen, setGoalOpen] = useState(false);
  const [contrib, setContrib] = useState<SavingsGoal | null>(null);

  return (
    <div className="enter px-5 pb-6 pt-8">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight text-fg">Monatsbericht</h1>
        <p className="mt-1 text-sm text-fg-muted">Analysiere deine Sparquote & Trends</p>
      </header>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-3xl bg-surface p-4 shadow-card">
          <p className="text-xs font-semibold text-fg-muted">Sparquote</p>
          <p className="tabular mt-2 text-2xl font-extrabold text-primary">{savePct}%</p>
        </div>
        <div className="rounded-3xl bg-surface p-4 shadow-card">
          <p className="text-xs font-semibold text-fg-muted">Restbudget</p>
          <p className={cn("tabular mt-2 text-2xl font-extrabold", rest < 0 ? "text-expense" : "text-fg")}>
            {formatEUR(rest)}
          </p>
        </div>
      </div>

      <section className="mt-4 rounded-3xl bg-surface p-4 shadow-card">
        <p className="mb-1 text-xs text-fg-muted">
          {prevName} bis {currName}
          {income > 0 ? ` · Einnahmen ${formatEUR(income)}` : null}
        </p>
        <TrendChart weeks={weeks} average={avg} />
      </section>

      <div className="mt-7 flex items-end justify-between">
        <h2 className="text-base font-bold text-fg">Sparziele & Träume</h2>
        <button
          type="button"
          onClick={() => setGoalOpen(true)}
          className="flex items-center gap-1 text-sm font-semibold text-primary"
        >
          <Plus className="size-4" />
          Neu
        </button>
      </div>

      <div className="mt-3 flex flex-col gap-3">
        {goals.map((goal) => {
          const pct = goal.targetCents > 0 ? Math.min(100, Math.round((goal.savedCents / goal.targetCents) * 100)) : 0;
          const left = Math.max(0, goal.targetCents - goal.savedCents);
          return (
            <button
              key={goal.id}
              type="button"
              onClick={() => setContrib(goal)}
              className="rounded-3xl bg-primary-soft p-4 text-left transition-transform duration-150 active:scale-[0.98]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-fg">
                    <GoalGlyph icon={goal.icon} className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-fg">{goal.name}</p>
                    <p className="text-xs text-fg-muted">Ziel: {formatEUR(goal.targetCents)}</p>
                  </div>
                </div>
                <span className="tabular text-sm font-bold text-primary">{pct}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface/80">
                <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-xs font-medium text-fg-muted">
                <span>Bereits {formatEUR(goal.savedCents)} gespart</span>
                <span>Noch {formatEUR(left)}</span>
              </div>
            </button>
          );
        })}
      </div>

      <section className="mt-5 rounded-3xl border border-primary/20 bg-tip p-4">
        <div className="flex items-center gap-2 text-sm font-bold text-primary">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary/10">
            <Lightbulb className="size-4" />
          </span>
          Spar-Tipp des Monats
        </div>
        <p className="mt-2 text-sm leading-relaxed text-fg">{tip}</p>
      </section>

      <GoalDialog open={goalOpen} onOpenChange={setGoalOpen} />
      <ContributeDialog goal={contrib} open={!!contrib} onOpenChange={(v) => !v && setContrib(null)} />
    </div>
  );
}
