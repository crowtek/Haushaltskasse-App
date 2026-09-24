import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatEUR, parseKeypad, appendKey } from "@/lib/money";
import { formatPrettyDate } from "@/lib/dates";
import { SUGGESTED_TAGS, getCategory, categoriesFor } from "@/lib/categories";
import { CategoryBadge, CategoryGlyph } from "@/components/category-icon";
import { Keypad } from "@/components/keypad";
import { useBudgetStore } from "@/lib/store";
import type { CategoryId, SavingsGoal, Transaction } from "@/lib/types";

export function Overlay({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-fg/30 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-bg p-5 shadow-float"
          aria-describedby={undefined}
        >
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-lg font-bold text-fg">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-full bg-surface-muted text-fg-muted"
                aria-label="Schließen"
              >
                <X className="size-4" />
              </button>
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function TransactionDetail({
  tx,
  open,
  onOpenChange,
}: {
  tx: Transaction | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const updateTransaction = useBudgetStore((s) => s.updateTransaction);
  const deleteTransaction = useBudgetStore((s) => s.deleteTransaction);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (!tx) return;
    setTitle(tx.title);
    setNote(tx.note);
    setTags(tx.tags);
  }, [tx]);

  if (!tx) return null;
  const cat = getCategory(tx.categoryId);

  return (
    <Overlay open={open} onOpenChange={onOpenChange} title={tx.title}>
      <div className="flex items-center gap-3">
        <CategoryBadge id={tx.categoryId} size="lg" />
        <div>
          <p className="text-sm text-fg-muted">{cat.name}</p>
          <p
            className={cn(
              "tabular text-2xl font-bold",
              tx.type === "income" ? "text-income" : "text-expense",
            )}
          >
            {formatEUR(tx.type === "income" ? tx.amountCents : -tx.amountCents, { sign: "always" })}
          </p>
        </div>
      </div>
      <p className="mt-2 text-sm text-fg-muted">{formatPrettyDate(tx.date)}</p>

      <label className="mt-5 block text-xs font-semibold uppercase tracking-wide text-fg-subtle">
        Bezeichnung
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1.5 w-full rounded-2xl bg-surface px-3 py-3 text-sm font-medium text-fg shadow-card outline-none ring-primary focus:ring-2"
        />
      </label>
      <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-fg-subtle">
        Notiz
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional"
          className="mt-1.5 w-full rounded-2xl bg-surface px-3 py-3 text-sm text-fg shadow-card outline-none ring-primary focus:ring-2"
        />
      </label>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-fg-subtle">Tags</p>
      <TagEditor value={tags} onChange={setTags} />

      <div className="mt-6 flex gap-2">
        <button
          type="button"
          className="flex-1 rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-fg transition-transform duration-150 active:scale-[0.98]"
          onClick={() => {
            updateTransaction(tx.id, { title: title.trim() || tx.title, note, tags });
            toast("Gespeichert");
            onOpenChange(false);
          }}
        >
          Änderungen speichern
        </button>
        <button
          type="button"
          className="flex size-12 items-center justify-center rounded-2xl bg-expense/10 text-expense"
          aria-label="Löschen"
          onClick={() => {
            deleteTransaction(tx.id);
            toast("Eintrag gelöscht");
            onOpenChange(false);
          }}
        >
          <Trash2 className="size-5" />
        </button>
      </div>
    </Overlay>
  );
}

export function TagEditor({
  value,
  onChange,
  compact = false,
}: {
  value: string[];
  onChange: (tags: string[]) => void;
  compact?: boolean;
}) {
  const customTags = useBudgetStore((s) => s.customTags);
  const [draft, setDraft] = useState("");
  const pool = [...SUGGESTED_TAGS, ...customTags.filter((t) => !SUGGESTED_TAGS.includes(t))];

  function toggle(tag: string) {
    onChange(value.includes(tag) ? value.filter((t) => t !== tag) : [...value, tag]);
  }

  function addDraft() {
    const next = draft.trim().replace(/^#/, "");
    if (!next) return;
    if (!value.includes(next)) onChange([...value, next]);
    setDraft("");
  }

  const chips = (
    <>
      {pool.map((tag) => {
        const on = value.includes(tag);
        return (
          <button
            key={tag}
            type="button"
            onClick={() => toggle(tag)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-150",
              on ? "bg-primary text-primary-fg" : "bg-surface text-fg-muted shadow-card",
            )}
          >
            {tag}
          </button>
        );
      })}
      {value
        .filter((t) => !pool.includes(t))
        .map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggle(tag)}
            className="shrink-0 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-fg"
          >
            {tag}
          </button>
        ))}
    </>
  );

  if (compact) {
    return (
      <div className="no-scrollbar mt-2 flex gap-1.5 overflow-x-auto">
        {chips}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addDraft();
            }
          }}
          placeholder="+ Tag"
          className="w-20 shrink-0 rounded-full bg-surface px-3 py-1.5 text-xs text-fg shadow-card outline-none ring-primary placeholder:text-fg-subtle focus:ring-2"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mt-2 flex flex-wrap gap-1.5">{chips}</div>
      <div className="mt-2 flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addDraft();
            }
          }}
          placeholder="Eigenes Tag, Enter zum Hinzufügen"
          className="min-w-0 flex-1 rounded-2xl bg-surface px-3 py-2.5 text-sm text-fg shadow-card outline-none ring-primary focus:ring-2"
        />
        <button
          type="button"
          onClick={addDraft}
          className="rounded-2xl bg-primary-soft px-3 text-sm font-semibold text-primary"
        >
          Hinzu
        </button>
      </div>
    </div>
  );
}

export function DatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (iso: string) => void;
}) {
  const current = new Date(value);
  const [cursor, setCursor] = useState(() => new Date(current.getFullYear(), current.getMonth(), 1));

  useEffect(() => {
    const d = new Date(value);
    setCursor(new Date(d.getFullYear(), d.getMonth(), 1));
  }, [value]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<number | null> = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="rounded-3xl bg-surface p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-full bg-surface-muted"
          onClick={() => setCursor(new Date(year, month - 1, 1))}
          aria-label="Vorheriger Monat"
        >
          <ChevronLeft className="size-4" />
        </button>
        <p className="text-sm font-semibold">
          {cursor.toLocaleDateString("de-DE", { month: "long", year: "numeric" })}
        </p>
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-full bg-surface-muted"
          onClick={() => setCursor(new Date(year, month + 1, 1))}
          aria-label="Nächster Monat"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold uppercase text-fg-subtle">
        {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d) => (
          <span key={d} className="py-1">
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <span key={`e-${i}`} />;
          const selected =
            day === current.getDate() &&
            month === current.getMonth() &&
            year === current.getFullYear();
          return (
            <button
              key={day}
              type="button"
              onClick={() => {
                const next = new Date(value);
                next.setFullYear(year, month, day);
                onChange(next.toISOString());
              }}
              className={cn(
                "flex size-9 items-center justify-center justify-self-center rounded-full text-sm font-medium",
                selected ? "bg-primary text-primary-fg" : "text-fg hover:bg-primary-soft",
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SettingsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const name = useBudgetStore((s) => s.profile.name);
  const setName = useBudgetStore((s) => s.setName);
  const resetDemo = useBudgetStore((s) => s.resetDemo);
  const [draft, setDraft] = useState(name);

  useEffect(() => {
    if (open) setDraft(name);
  }, [open, name]);

  return (
    <Overlay open={open} onOpenChange={onOpenChange} title="Profil">
      <label className="block text-xs font-semibold uppercase tracking-wide text-fg-subtle">
        Dein Name
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="mt-1.5 w-full rounded-2xl bg-surface px-3 py-3 text-sm font-medium text-fg shadow-card outline-none ring-primary focus:ring-2"
        />
      </label>
      <button
        type="button"
        className="mt-5 w-full rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-fg"
        onClick={() => {
          setName(draft.trim() || "Sarah");
          toast("Profil gespeichert");
          onOpenChange(false);
        }}
      >
        Speichern
      </button>
      <button
        type="button"
        className="mt-3 w-full rounded-2xl bg-surface py-3.5 text-sm font-semibold text-fg-muted shadow-card"
        onClick={() => {
          resetDemo();
          toast("Demo-Daten wiederhergestellt");
          onOpenChange(false);
        }}
      >
        Demo-Daten zurücksetzen
      </button>
    </Overlay>
  );
}

export function ContributeDialog({
  goal,
  open,
  onOpenChange,
}: {
  goal: SavingsGoal | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const contributeToGoal = useBudgetStore((s) => s.contributeToGoal);
  const [raw, setRaw] = useState("50");

  useEffect(() => {
    if (open) setRaw("50");
  }, [open]);

  if (!goal) return null;
  const cents = parseKeypad(raw);

  return (
    <Overlay open={open} onOpenChange={onOpenChange} title="Einzahlen">
      <p className="text-sm text-fg-muted">{goal.name}</p>
      <p className="tabular mt-2 text-3xl font-bold text-primary">{formatEUR(cents)}</p>
      <div className="mt-4">
        <Keypad onKey={(k) => setRaw((r) => appendKey(r, k))} />
      </div>
      <button
        type="button"
        disabled={cents <= 0}
        className="mt-5 w-full rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-fg disabled:opacity-40"
        onClick={() => {
          contributeToGoal(goal.id, cents);
          toast(`${formatEUR(cents)} zu ${goal.name} hinzugefügt`);
          onOpenChange(false);
        }}
      >
        Betrag einzahlen
      </button>
    </Overlay>
  );
}

export function GoalDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const addGoal = useBudgetStore((s) => s.addGoal);
  const [name, setName] = useState("");
  const [raw, setRaw] = useState("1000");

  useEffect(() => {
    if (open) {
      setName("");
      setRaw("1000");
    }
  }, [open]);

  return (
    <Overlay open={open} onOpenChange={onOpenChange} title="Neues Sparziel">
      <label className="block text-xs font-semibold uppercase tracking-wide text-fg-subtle">
        Name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="z.B. Notgroschen"
          className="mt-1.5 w-full rounded-2xl bg-surface px-3 py-3 text-sm font-medium text-fg shadow-card outline-none ring-primary focus:ring-2"
        />
      </label>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-fg-subtle">Zielbetrag</p>
      <p className="tabular mt-1 text-3xl font-bold text-fg">{formatEUR(parseKeypad(raw))}</p>
      <div className="mt-3">
        <Keypad onKey={(k) => setRaw((r) => appendKey(r, k))} />
      </div>
      <button
        type="button"
        disabled={!name.trim() || parseKeypad(raw) <= 0}
        className="mt-5 w-full rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-fg disabled:opacity-40"
        onClick={() => {
          addGoal({
            name: name.trim(),
            targetCents: parseKeypad(raw),
            savedCents: 0,
            icon: "spark",
          });
          toast("Sparziel angelegt");
          onOpenChange(false);
        }}
      >
        Sparziel speichern
      </button>
    </Overlay>
  );
}

export function CategoryPicker({
  kind,
  value,
  onChange,
}: {
  kind: "expense" | "income";
  value: CategoryId;
  onChange: (id: CategoryId) => void;
}) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
      {categoriesFor(kind).map((c) => {
        const on = c.id === value;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onChange(c.id)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-150",
              on ? "bg-primary text-primary-fg" : "bg-surface text-fg shadow-card",
            )}
          >
            <CategoryGlyph id={c.id} className="size-4" />
            {c.short}
          </button>
        );
      })}
    </div>
  );
}
