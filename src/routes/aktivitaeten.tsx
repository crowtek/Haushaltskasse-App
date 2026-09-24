import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useBudgetStore } from "@/lib/store";
import { monthTx, sortedRecent } from "@/lib/selectors";
import { monthLabel } from "@/lib/dates";
import { categoriesFor, SUGGESTED_TAGS } from "@/lib/categories";
import { TransactionRow } from "@/components/transaction-row";
import { TransactionDetail } from "@/components/dialogs";
import { cn } from "@/lib/utils";
import type { CategoryId, Transaction, TxType } from "@/lib/types";

type Search = { cat?: CategoryId; tag?: string };

export const Route = createFileRoute("/aktivitaeten")({
  component: ActivityPage,
  validateSearch: (search: Record<string, unknown>): Search => ({
    cat: typeof search.cat === "string" ? (search.cat as CategoryId) : undefined,
    tag: typeof search.tag === "string" ? search.tag : undefined,
  }),
});

function ActivityPage() {
  const { cat, tag } = Route.useSearch();
  const transactions = useBudgetStore((s) => s.transactions);
  const viewMonth = useBudgetStore((s) => s.viewMonth);
  const customTags = useBudgetStore((s) => s.customTags);
  const [kind, setKind] = useState<"all" | TxType>("all");
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<CategoryId | "all">(cat ?? "all");
  const [activeTag, setActiveTag] = useState<string | "all">(tag ?? "all");
  const [selected, setSelected] = useState<Transaction | null>(null);

  const tags = [...SUGGESTED_TAGS, ...customTags.filter((t) => !SUGGESTED_TAGS.includes(t))];

  const list = useMemo(() => {
    let rows = monthTx(transactions, viewMonth);
    if (kind !== "all") rows = rows.filter((t) => t.type === kind);
    if (activeCat !== "all") rows = rows.filter((t) => t.categoryId === activeCat);
    if (activeTag !== "all") rows = rows.filter((t) => t.tags.includes(activeTag));
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      rows = rows.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.note.toLowerCase().includes(q) ||
          t.tags.some((x) => x.toLowerCase().includes(q)),
      );
    }
    return sortedRecent(rows);
  }, [transactions, viewMonth, kind, activeCat, activeTag, query]);

  return (
    <div className="enter px-5 pb-6 pt-8">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight text-fg">Aktivitäten</h1>
        <p className="mt-1 text-sm text-fg-muted">{monthLabel(viewMonth)}</p>
      </header>

      <label className="mt-4 flex items-center gap-2 rounded-2xl bg-surface px-3 py-3 shadow-card">
        <Search className="size-4 text-fg-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Suchen nach Name oder Tag"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-fg-subtle"
        />
      </label>

      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
        {(["all", "expense", "income"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold",
              kind === k ? "bg-primary text-primary-fg" : "bg-surface text-fg-muted shadow-card",
            )}
          >
            {k === "all" ? "Alle" : k === "expense" ? "Ausgaben" : "Einnahmen"}
          </button>
        ))}
      </div>

      <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto">
        <Chip on={activeCat === "all"} onClick={() => setActiveCat("all")}>
          Jede Kategorie
        </Chip>
        {categoriesFor("expense").concat(categoriesFor("income")).map((c) => (
          <Chip key={c.id} on={activeCat === c.id} onClick={() => setActiveCat(c.id)}>
            {c.short}
          </Chip>
        ))}
      </div>

      <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto">
        <Chip on={activeTag === "all"} onClick={() => setActiveTag("all")}>
          Alle Tags
        </Chip>
        {tags.map((t) => (
          <Chip key={t} on={activeTag === t} onClick={() => setActiveTag(t)}>
            {t}
          </Chip>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2.5">
        {list.length ? (
          list.map((tx) => <TransactionRow key={tx.id} tx={tx} showTags onClick={() => setSelected(tx)} />)
        ) : (
          <div className="rounded-3xl bg-surface px-4 py-8 text-center text-sm text-fg-muted shadow-card">
            Keine Einträge für diese Filter.
          </div>
        )}
      </div>

      <TransactionDetail tx={selected} open={!!selected} onOpenChange={(v) => !v && setSelected(null)} />
    </div>
  );
}

function Chip({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold",
        on ? "bg-primary text-primary-fg" : "bg-surface text-fg-muted shadow-card",
      )}
    >
      {children}
    </button>
  );
}
