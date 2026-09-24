import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Calendar, PencilLine } from "lucide-react";
import { toast } from "sonner";
import { Keypad } from "@/components/keypad";
import { CategoryPicker, DatePicker, TagEditor } from "@/components/dialogs";
import { appendKey, formatEUR, parseKeypad } from "@/lib/money";
import { extractHashtags } from "@/lib/selectors";
import { formatPrettyDate } from "@/lib/dates";
import { categoriesFor } from "@/lib/categories";
import { useBudgetStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { CategoryId, TxType } from "@/lib/types";

export const Route = createFileRoute("/neu")({ component: NewEntryPage });

function NewEntryPage() {
  const navigate = useNavigate();
  const addTransaction = useBudgetStore((s) => s.addTransaction);
  const [type, setType] = useState<TxType>("expense");
  const [raw, setRaw] = useState("0");
  const [categoryId, setCategoryId] = useState<CategoryId>("food");
  const [date, setDate] = useState(() => new Date().toISOString());
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [calOpen, setCalOpen] = useState(false);

  const cents = parseKeypad(raw);
  const label = type === "expense" ? "Ausgabenbetrag" : "Einnahmenbetrag";

  function switchType(next: TxType) {
    setType(next);
    const first = categoriesFor(next)[0];
    if (first) setCategoryId(first.id);
  }

  const canSave = cents > 0;

  const display = useMemo(() => {
    if (!raw || raw === "0") return "0,00";
    if (raw.endsWith(",")) return `${raw}00`.replace(/,00$/, ",");
    return raw;
  }, [raw]);

  function save() {
    if (!canSave) return;
    const fromHash = extractHashtags(title);
    const merged = [...new Set([...tags, ...fromHash])];
    const cleanTitle = title.replace(/#[\p{L}\p{N}_-]+/gu, "").trim();
    const cat = categoriesFor(type).find((c) => c.id === categoryId);
    addTransaction({
      type,
      amountCents: cents,
      categoryId,
      title: cleanTitle || cat?.name || "Buchung",
      note: "",
      tags: merged,
      date,
    });
    toast(type === "expense" ? "Ausgabe gespeichert" : "Einnahme gespeichert");
    navigate({ to: "/" });
  }

  return (
    <div className="enter flex min-h-full flex-col px-5 pb-4 pt-8">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight text-fg">
          {type === "expense" ? "Neue Ausgabe" : "Neue Einnahme"}
        </h1>
        <p className="mt-1 text-sm text-fg-muted">Trage deine {type === "expense" ? "Ausgaben" : "Einnahmen"} schnell ein</p>
      </header>

      <div className="mt-4 grid grid-cols-2 gap-2 rounded-full bg-surface-muted p-1">
        {(["expense", "income"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => switchType(t)}
            className={cn(
              "rounded-full py-2 text-sm font-semibold transition-colors duration-150",
              type === t ? "bg-surface text-fg shadow-card" : "text-fg-muted",
            )}
          >
            {t === "expense" ? "Ausgabe" : "Einnahme"}
          </button>
        ))}
      </div>

      <section className="relative mt-4 rounded-3xl bg-surface px-5 py-6 text-center shadow-card">
        <p className="text-xs font-semibold uppercase tracking-widest text-fg-subtle">{label}</p>
        <p
          className={cn(
            "tabular mt-2 text-5xl font-extrabold tracking-tight",
            type === "income" ? "text-income" : "text-fg",
          )}
        >
          € {display}
          <span className="ml-0.5 inline-block h-8 w-0.5 translate-y-1 animate-pulse bg-primary align-middle" />
        </p>
      </section>

      <p className="mt-5 text-sm font-semibold text-fg">Kategorie wählen</p>
      <div className="mt-2">
        <CategoryPicker kind={type} value={categoryId} onChange={setCategoryId} />
      </div>

      <div className="mt-4 grid grid-cols-[auto_1fr] gap-2">
        <button
          type="button"
          onClick={() => setCalOpen((v) => !v)}
          className="flex items-center gap-2 rounded-2xl bg-surface px-3 py-3 text-sm font-medium text-fg shadow-card"
        >
          <Calendar className="size-4 text-fg-muted" />
          {formatPrettyDate(date)}
        </button>
        <label className="flex min-w-0 items-center gap-2 rounded-2xl bg-surface px-3 py-3 shadow-card">
          <PencilLine className="size-4 shrink-0 text-fg-muted" />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Notiz hinzufügen…  #tag"
            className="min-w-0 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-fg-subtle"
          />
        </label>
      </div>

      {calOpen ? (
        <div className="mt-3">
          <DatePicker
            value={date}
            onChange={(iso) => {
              setDate(iso);
              setCalOpen(false);
            }}
          />
        </div>
      ) : null}

      <div className="mt-3">
        <TagEditor value={tags} onChange={setTags} compact />
      </div>

      <div className="mt-4 flex-1">
        <Keypad onKey={(k) => setRaw((r) => appendKey(r, k))} />
      </div>

      <button
        type="button"
        disabled={!canSave}
        onClick={save}
        className="mt-4 w-full rounded-2xl bg-primary py-4 text-base font-semibold text-primary-fg transition-transform duration-150 active:scale-[0.98] disabled:opacity-40"
      >
        {type === "expense" ? "Ausgabe Speichern" : "Einnahme Speichern"}
      </button>
    </div>
  );
}
