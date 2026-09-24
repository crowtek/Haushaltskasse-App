export type TxType = "expense" | "income";

export type CategoryId =
  | "food"
  | "transport"
  | "home"
  | "leisure"
  | "health"
  | "other"
  | "salary"
  | "refund"
  | "gift";

export interface Category {
  id: CategoryId;
  short: string;
  name: string;
  icon: "cart" | "car" | "home" | "ticket" | "heart" | "box" | "wallet" | "gift" | "spark";
  color: "food" | "transport" | "home" | "leisure" | "health" | "other" | "income";
  kind: TxType;
}

export interface Transaction {
  id: string;
  type: TxType;
  amountCents: number;
  categoryId: CategoryId;
  title: string;
  note: string;
  tags: string[];
  date: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetCents: number;
  savedCents: number;
  icon: "plane" | "shield" | "home" | "spark";
}

export interface Profile {
  name: string;
}

export interface BudgetState {
  profile: Profile;
  transactions: Transaction[];
  goals: SavingsGoal[];
  viewMonth: string;
  customTags: string[];
}
