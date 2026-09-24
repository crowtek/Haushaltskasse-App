import {
  ShoppingCart,
  Car,
  House,
  Ticket,
  Heart,
  Package,
  Wallet,
  Gift,
  Sparkles,
  Plane,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { COLOR_VAR, getCategory } from "@/lib/categories";
import type { CategoryId, SavingsGoal } from "@/lib/types";

const ICONS: Record<string, LucideIcon> = {
  cart: ShoppingCart,
  car: Car,
  home: House,
  ticket: Ticket,
  heart: Heart,
  box: Package,
  wallet: Wallet,
  gift: Gift,
  spark: Sparkles,
  plane: Plane,
  shield: Shield,
};

export function CategoryGlyph({
  id,
  className,
}: {
  id: CategoryId;
  className?: string;
}) {
  const cat = getCategory(id);
  const Icon = ICONS[cat.icon] ?? Package;
  return <Icon className={className} strokeWidth={1.9} />;
}

export function CategoryBadge({
  id,
  size = "md",
}: {
  id: CategoryId;
  size?: "sm" | "md" | "lg";
}) {
  const cat = getCategory(id);
  const dim = size === "sm" ? "size-9" : size === "lg" ? "size-12" : "size-11";
  const icon = size === "sm" ? "size-4" : "size-5";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-xl text-white",
        dim,
      )}
      style={{ background: COLOR_VAR[cat.color] }}
    >
      <CategoryGlyph id={id} className={icon} />
    </span>
  );
}

export function GoalGlyph({ icon, className }: { icon: SavingsGoal["icon"]; className?: string }) {
  const Icon = ICONS[icon] ?? Plane;
  return <Icon className={className} strokeWidth={1.9} />;
}
