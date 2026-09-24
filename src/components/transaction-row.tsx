import { formatEUR } from "@/lib/money";
import { formatDayLabel } from "@/lib/dates";
import { getCategory } from "@/lib/categories";
import { CategoryBadge } from "@/components/category-icon";
import type { Transaction } from "@/lib/types";
import { cn } from "@/lib/utils";

export function TransactionRow({
  tx,
  onClick,
  showTags = false,
}: {
  tx: Transaction;
  onClick?: () => void;
  showTags?: boolean;
}) {
  const cat = getCategory(tx.categoryId);
  const positive = tx.type === "income";
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl bg-surface px-3.5 py-3 text-left shadow-card transition-transform duration-150 ease-out active:scale-[0.98]"
    >
      <CategoryBadge id={tx.categoryId} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-fg">{tx.title}</span>
        <span className="mt-0.5 flex items-center gap-1.5 text-xs text-fg-muted">
          <span className="truncate">{cat.name}</span>
          <span className="text-fg-subtle">·</span>
          <span className="shrink-0">{formatDayLabel(tx.date)}</span>
        </span>
        {showTags && tx.tags.length > 0 ? (
          <span className="mt-1 flex flex-wrap gap-1">
            {tx.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-muted px-1.5 py-px text-xs font-medium text-fg-muted"
              >
                {tag}
              </span>
            ))}
          </span>
        ) : null}
      </span>
      <span
        className={cn(
          "tabular shrink-0 text-sm font-semibold",
          positive ? "text-income" : "text-expense",
        )}
      >
        {formatEUR(positive ? tx.amountCents : -tx.amountCents, { sign: "always" })}
      </span>
    </button>
  );
}
