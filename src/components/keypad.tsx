import { Delete } from "lucide-react";
import { cn } from "@/lib/utils";

const KEYS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  [",", "0", "back"],
] as const;

export function Keypad({ onKey }: { onKey: (key: string) => void }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {KEYS.flat().map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => onKey(key)}
          className={cn(
            "flex h-16 items-center justify-center rounded-2xl bg-surface text-xl font-semibold text-fg",
            "shadow-card transition-transform duration-150 ease-out active:scale-[0.96]",
          )}
          aria-label={key === "back" ? "Löschen" : key === "," ? "Komma" : key}
        >
          {key === "back" ? <Delete className="size-6 text-fg-muted" strokeWidth={1.8} /> : key}
        </button>
      ))}
    </div>
  );
}
