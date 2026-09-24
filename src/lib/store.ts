import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { BudgetState, CategoryId, SavingsGoal, Transaction, TxType } from "@/lib/types";
import { monthKey, atLocal } from "@/lib/dates";
import { SUGGESTED_TAGS } from "@/lib/categories";

function uid(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function createSeed(): BudgetState {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const today = now.getDate();
  const clamp = (day: number) => Math.min(day, today);

  const tx = (partial: Omit<Transaction, "id"> & { id?: string }): Transaction => ({
    id: partial.id ?? uid("tx"),
    ...partial,
  });

  const transactions: Transaction[] = [
    tx({
      id: "tx-salary",
      type: "income",
      amountCents: 308_000,
      categoryId: "salary",
      title: "Gehalt",
      note: "Monatliche Überweisung",
      tags: ["Fixkosten"],
      date: atLocal(y, m, 1, 9, 12),
    }),
    tx({
      id: "tx-otto",
      type: "income",
      amountCents: 12_000,
      categoryId: "refund",
      title: "Rückerstattung Otto",
      note: "Retourenzahlung",
      tags: ["Online"],
      date: atLocal(y, m, Math.min(2, today), 11, 4),
    }),
    tx({
      id: "tx-rent",
      type: "expense",
      amountCents: 52_000,
      categoryId: "home",
      title: "Miete Wohnung",
      note: "Kaltmiete",
      tags: ["Fixkosten"],
      date: atLocal(y, m, 1, 8, 0),
    }),
    tx({
      id: "tx-power",
      type: "expense",
      amountCents: 4_890,
      categoryId: "home",
      title: "Stadtwerke Strom",
      note: "",
      tags: ["Fixkosten"],
      date: atLocal(y, m, clamp(5), 10, 20),
    }),
    tx({
      id: "tx-inet",
      type: "expense",
      amountCents: 1_895,
      categoryId: "home",
      title: "Internet Vodafone",
      note: "",
      tags: ["Abo", "Fixkosten"],
      date: atLocal(y, m, clamp(7), 9, 0),
    }),
    tx({
      id: "tx-edeka",
      type: "expense",
      amountCents: 4_580,
      categoryId: "food",
      title: "Edeka Supermarkt",
      note: "",
      tags: ["Einkauf"],
      date: atLocal(y, m, today, 14, 32),
    }),
    tx({
      id: "tx-rewe-2",
      type: "expense",
      amountCents: 12_450,
      categoryId: "food",
      title: "Rewe City",
      note: "",
      tags: ["Einkauf"],
      date: atLocal(y, m, clamp(20), 18, 10),
    }),
    tx({
      id: "tx-lidl",
      type: "expense",
      amountCents: 8_630,
      categoryId: "food",
      title: "Lidl",
      note: "",
      tags: ["Einkauf"],
      date: atLocal(y, m, clamp(15), 17, 40),
    }),
    tx({
      id: "tx-markt",
      type: "expense",
      amountCents: 4_220,
      categoryId: "food",
      title: "Wochenmarkt",
      note: "Obst & Gemüse",
      tags: ["Einkauf", "Bar"],
      date: atLocal(y, m, clamp(13), 11, 15),
    }),
    tx({
      id: "tx-edeka-2",
      type: "expense",
      amountCents: 9_875,
      categoryId: "food",
      title: "Edeka",
      note: "",
      tags: ["Einkauf"],
      date: atLocal(y, m, clamp(8), 16, 5),
    }),
    tx({
      id: "tx-bio",
      type: "expense",
      amountCents: 6_440,
      categoryId: "food",
      title: "Bio Company",
      note: "",
      tags: ["Einkauf"],
      date: atLocal(y, m, clamp(5), 12, 22),
    }),
    tx({
      id: "tx-rewe-1",
      type: "expense",
      amountCents: 41_985,
      categoryId: "food",
      title: "Rewe Wocheneinkauf",
      note: "",
      tags: ["Einkauf"],
      date: atLocal(y, m, 1, 16, 45),
    }),
    tx({
      id: "tx-shell",
      type: "expense",
      amountCents: 7_200,
      categoryId: "transport",
      title: "Shell Tankstelle",
      note: "",
      tags: ["Karte"],
      date: atLocal(y, m, Math.max(1, today - 1), 19, 8),
    }),
    tx({
      id: "tx-db",
      type: "expense",
      amountCents: 4_990,
      categoryId: "transport",
      title: "DB Ticket",
      note: "Hin & zurück",
      tags: ["Online"],
      date: atLocal(y, m, clamp(11), 7, 40),
    }),
    tx({
      id: "tx-park",
      type: "expense",
      amountCents: 850,
      categoryId: "transport",
      title: "Parkhaus City",
      note: "",
      tags: ["Bar"],
      date: atLocal(y, m, clamp(14), 15, 2),
    }),
    tx({
      id: "tx-shell-2",
      type: "expense",
      amountCents: 6_555,
      categoryId: "transport",
      title: "Shell Tankstelle",
      note: "",
      tags: ["Karte"],
      date: atLocal(y, m, clamp(6), 18, 30),
    }),
    tx({
      id: "tx-netflix",
      type: "expense",
      amountCents: 1_799,
      categoryId: "leisure",
      title: "Netflix Abo",
      note: "",
      tags: ["Abo", "Online"],
      date: atLocal(y, m, 1, 6, 12),
    }),
    tx({
      id: "tx-cinema",
      type: "expense",
      amountCents: 2_400,
      categoryId: "leisure",
      title: "Kino Cinestar",
      note: "",
      tags: ["Karte"],
      date: atLocal(y, m, clamp(10), 20, 15),
    }),
    tx({
      id: "tx-spotify",
      type: "expense",
      amountCents: 1_199,
      categoryId: "leisure",
      title: "Spotify",
      note: "",
      tags: ["Abo", "Online"],
      date: atLocal(y, m, clamp(4), 8, 0),
    }),
    tx({
      id: "tx-resto",
      type: "expense",
      amountCents: 6_850,
      categoryId: "leisure",
      title: "Restaurant Sapori",
      note: "Abendessen",
      tags: ["Karte"],
      date: atLocal(y, m, clamp(14), 21, 10),
    }),
    tx({
      id: "tx-concert",
      type: "expense",
      amountCents: 8_900,
      categoryId: "leisure",
      title: "Konzert Tickets",
      note: "",
      tags: ["Online"],
      date: atLocal(y, m, clamp(8), 13, 0),
    }),
    tx({
      id: "tx-cafe",
      type: "expense",
      amountCents: 1_280,
      categoryId: "leisure",
      title: "Café Central",
      note: "",
      tags: ["Bar"],
      date: atLocal(y, m, clamp(19), 10, 45),
    }),
    tx({
      id: "tx-books",
      type: "expense",
      amountCents: 2_290,
      categoryId: "leisure",
      title: "Thalia Bücher",
      note: "",
      tags: ["Karte"],
      date: atLocal(y, m, clamp(17), 15, 30),
    }),
    tx({
      id: "tx-gym",
      type: "expense",
      amountCents: 4_672,
      categoryId: "leisure",
      title: "Fitness First",
      note: "",
      tags: ["Abo", "Fixkosten"],
      date: atLocal(y, m, clamp(3), 7, 15),
    }),
    // Previous month — slightly higher groceries so the tip can fire
    tx({
      id: "tx-prev-salary",
      type: "income",
      amountCents: 308_000,
      categoryId: "salary",
      title: "Gehalt",
      note: "Monatliche Überweisung",
      tags: ["Fixkosten"],
      date: atLocal(y, m - 1, 1, 9, 12),
    }),
    tx({
      id: "tx-prev-rent",
      type: "expense",
      amountCents: 52_000,
      categoryId: "home",
      title: "Miete Wohnung",
      note: "Kaltmiete",
      tags: ["Fixkosten"],
      date: atLocal(y, m - 1, 1, 8, 0),
    }),
    tx({
      id: "tx-prev-power",
      type: "expense",
      amountCents: 5_210,
      categoryId: "home",
      title: "Stadtwerke Strom",
      note: "",
      tags: ["Fixkosten"],
      date: atLocal(y, m - 1, 6, 10, 0),
    }),
    tx({
      id: "tx-prev-food-1",
      type: "expense",
      amountCents: 48_320,
      categoryId: "food",
      title: "Rewe Wocheneinkauf",
      note: "",
      tags: ["Einkauf"],
      date: atLocal(y, m - 1, 4, 16, 0),
    }),
    tx({
      id: "tx-prev-food-2",
      type: "expense",
      amountCents: 22_150,
      categoryId: "food",
      title: "Edeka",
      note: "",
      tags: ["Einkauf"],
      date: atLocal(y, m - 1, 12, 17, 20),
    }),
    tx({
      id: "tx-prev-food-3",
      type: "expense",
      amountCents: 18_440,
      categoryId: "food",
      title: "Lidl",
      note: "",
      tags: ["Einkauf"],
      date: atLocal(y, m - 1, 19, 18, 0),
    }),
    tx({
      id: "tx-prev-food-4",
      type: "expense",
      amountCents: 11_295,
      categoryId: "food",
      title: "Bio Company",
      note: "",
      tags: ["Einkauf"],
      date: atLocal(y, m - 1, 26, 12, 10),
    }),
    tx({
      id: "tx-prev-car",
      type: "expense",
      amountCents: 21_000,
      categoryId: "transport",
      title: "Shell Tankstelle",
      note: "",
      tags: ["Karte"],
      date: atLocal(y, m - 1, 9, 18, 0),
    }),
    tx({
      id: "tx-prev-fun",
      type: "expense",
      amountCents: 32_400,
      categoryId: "leisure",
      title: "Freizeit & Ausgehen",
      note: "",
      tags: ["Karte"],
      date: atLocal(y, m - 1, 15, 20, 0),
    }),
    tx({
      id: "tx-prev-netflix",
      type: "expense",
      amountCents: 1_799,
      categoryId: "leisure",
      title: "Netflix Abo",
      note: "",
      tags: ["Abo", "Online"],
      date: atLocal(y, m - 1, 1, 6, 12),
    }),
  ];

  return {
    profile: { name: "Sarah" },
    transactions,
    goals: [
      {
        id: "goal-summer",
        name: "Sommerurlaub 2026",
        targetCents: 400_000,
        savedCents: 240_000,
        icon: "plane",
      },
    ],
    viewMonth: monthKey(now),
    customTags: [],
  };
}

const seed = createSeed();

interface Actions {
  setName: (name: string) => void;
  setViewMonth: (key: string) => void;
  addTransaction: (input: {
    type: TxType;
    amountCents: number;
    categoryId: CategoryId;
    title: string;
    note: string;
    tags: string[];
    date: string;
  }) => void;
  updateTransaction: (id: string, patch: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  addGoal: (goal: Omit<SavingsGoal, "id">) => void;
  updateGoal: (id: string, patch: Partial<SavingsGoal>) => void;
  contributeToGoal: (id: string, cents: number) => void;
  deleteGoal: (id: string) => void;
  rememberTags: (tags: string[]) => void;
  resetDemo: () => void;
}

export const useBudgetStore = create<BudgetState & Actions>()(
  persist(
    (set, get) => ({
      ...seed,
      setName: (name) => set({ profile: { ...get().profile, name } }),
      setViewMonth: (viewMonth) => set({ viewMonth }),
      addTransaction: (input) => {
        const item: Transaction = { id: uid("tx"), ...input };
        set({ transactions: [item, ...get().transactions] });
        get().rememberTags(input.tags);
      },
      updateTransaction: (id, patch) => {
        set({
          transactions: get().transactions.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        });
        if (patch.tags) get().rememberTags(patch.tags);
      },
      deleteTransaction: (id) => {
        set({ transactions: get().transactions.filter((t) => t.id !== id) });
      },
      addGoal: (goal) => {
        set({ goals: [...get().goals, { ...goal, id: uid("goal") }] });
      },
      updateGoal: (id, patch) => {
        set({ goals: get().goals.map((g) => (g.id === id ? { ...g, ...patch } : g)) });
      },
      contributeToGoal: (id, cents) => {
        set({
          goals: get().goals.map((g) =>
            g.id === id ? { ...g, savedCents: Math.max(0, g.savedCents + cents) } : g,
          ),
        });
      },
      deleteGoal: (id) => {
        set({ goals: get().goals.filter((g) => g.id !== id) });
      },
      rememberTags: (tags) => {
        const extra = tags
          .map((t) => t.trim())
          .filter(Boolean)
          .filter((t) => !SUGGESTED_TAGS.includes(t) && !get().customTags.includes(t));
        if (extra.length) set({ customTags: [...get().customTags, ...extra] });
      },
      resetDemo: () => {
        const fresh = createSeed();
        set(fresh);
      },
    }),
    {
      name: "haushaltskasse-v1",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({
        profile: state.profile,
        transactions: state.transactions,
        goals: state.goals,
        viewMonth: state.viewMonth,
        customTags: state.customTags,
      }),
    },
  ),
);
