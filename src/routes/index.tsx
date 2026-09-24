import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownLeft, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useBudgetStore } from "@/lib/store";
import { monthTx, totals, sortedRecent } from "@/lib/selectors";
import { formatEUR } from "@/lib/money";
import { monthLabel, shiftMonth } from "@/lib/dates";
import { TransactionRow } from "@/components/transaction-row";
import { SettingsDialog, TransactionDetail } from "@/components/dialogs";
import type { Transaction } from "@/lib/types";

export const Route = createFileRoute("/")({ component: OverviewPage });

function OverviewPage() {
  const profile = useBudgetStore((s) => s.profile);
  const transactions = useBudgetStore((s) => s.transactions);
  const viewMonth = useBudgetStore((s) => s.viewMonth);
  const setViewMonth = useBudgetStore((s) => s.setViewMonth);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selected, setSelected] = useState<Transaction | null>(null);

  const month = monthTx(transactions, viewMonth);
  const { income, expense, rest, usedPct } = totals(month);
  const recent = sortedRecent(month).slice(0, 4);
  const over = rest < 0;
  const initials = profile.name.trim().slice(0, 1).toUpperCase() || "S";

  return (
    <div className="enter px-5 pb-6 pt-8">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-fg">Haushaltskasse</h1>
          <p className="mt-1 text-sm text-fg-muted">Hallo, {profile.name}! Dein Budget im Blick.</p>
        </div>
        <button
          type="button"
          onClick={() => setSettingsOpen(true)}
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-fg shadow-card"
          aria-label="Profil öffnen"
        >
          {initials}
        </button>
      </header>

      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-full bg-surface shadow-card"
          onClick={() => setViewMonth(shiftMonth(viewMonth, -1))}
          aria-label="Vorheriger Monat"
        >
          <ChevronLeft className="size-4" />
        </button>
        <p className="min-w-36 text-center text-sm font-semibold text-fg">{monthLabel(viewMonth)}</p>
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-full bg-surface shadow-card"
          onClick={() => setViewMonth(shiftMonth(viewMonth, 1))}
          aria-label="Nächster Monat"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <section
        className="mt-5 rounded-3xl bg-primary p-5 text-primary-fg shadow-card"
        style={{ background: over ? "var(--color-expense)" : "var(--color-primary)" }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-fg/70">
          Verfügbares Restbudget
        </p>
        <p className="tabular mt-2 text-4xl font-extrabold tracking-tight">{formatEUR(rest)}</p>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-primary-fg/20">
          <div
            className="h-full rounded-full bg-primary-fg/85"
            style={{ width: `${Math.min(100, usedPct)}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs font-medium text-primary-fg/80">
          <span>{Math.min(usedPct, 999)}% des Budgets verbraucht</span>
          <span>Insgesamt {formatEUR(income)}</span>
        </div>
      </section>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <MiniStat
          label="Einnahmen"
          value={formatEUR(income)}
          tone="income"
          icon={<ArrowDownLeft className="size-4" />}
        />
        <MiniStat
          label="Ausgaben"
          value={formatEUR(expense)}
          tone="expense"
          icon={<ArrowUpRight className="size-4" />}
        />
      </div>

      <div className="mt-7 flex items-end justify-between">
        <h2 className="text-base font-bold text-fg">Letzte Aktivitäten</h2>
        <Link to="/aktivitaeten" className="text-sm font-semibold text-primary">
          Alle anzeigen
        </Link>
      </div>

      <div className="mt-3 flex flex-col gap-2.5">
        {recent.length ? (
          recent.map((tx) => (
            <TransactionRow key={tx.id} tx={tx} onClick={() => setSelected(tx)} />
          ))
        ) : (
          <EmptyCard>
            Noch keine Buchungen in diesem Monat. Tippe auf <strong>Neu</strong>, um loszulegen.
          </EmptyCard>
        )}
      </div>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      <TransactionDetail tx={selected} open={!!selected} onOpenChange={(v) => !v && setSelected(null)} />
    </div>
  );
}

function MiniStat({
  label,
  value,
  tone,
  icon,
}: {
  label: string;
  value: string;
  tone: "income" | "expense";
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-surface p-4 shadow-card">
      <div className="flex items-center gap-2 text-xs font-semibold text-fg-muted">
        <span
          className={
            tone === "income"
              ? "flex size-7 items-center justify-center rounded-full bg-primary-soft text-income"
              : "flex size-7 items-center justify-center rounded-full bg-expense/10 text-expense"
          }
        >
          {icon}
        </span>
        {label}
      </div>
      <p
        className={
          tone === "income"
            ? "tabular mt-3 text-lg font-bold text-income"
            : "tabular mt-3 text-lg font-bold text-expense"
        }
      >
        {value}
      </p>
    </div>
  );
}

function EmptyCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-surface px-4 py-8 text-center text-sm text-fg-muted shadow-card">
      {children}
    </div>
  );
}
