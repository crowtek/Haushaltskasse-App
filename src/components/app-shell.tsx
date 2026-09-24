import { Link, useRouterState } from "@tanstack/react-router";
import { ChartLine, ChartPie, House, Plus } from "lucide-react";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/hydrate";

const TABS = [
  { to: "/", label: "Übersicht", icon: House, end: true },
  { to: "/neu", label: "Neu", icon: Plus, end: false },
  { to: "/kategorien", label: "Kategorien", icon: ChartPie, end: false },
  { to: "/bericht", label: "Bericht", icon: ChartLine, end: false },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrated();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-dvh justify-center bg-bg-deep">
      <div className="relative flex min-h-dvh w-full max-w-md flex-col bg-bg lg:shadow-float">
        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto pb-28">
          {hydrated ? children : <PageSkeleton />}
        </main>
        <nav className="bottom-nav absolute inset-x-0 bottom-0 z-20 border-t border-border bg-nav/95 px-2 pt-2 backdrop-blur-md">
          <ul className="grid grid-cols-4">
            {TABS.map((tab) => {
              const active = tab.end ? pathname === "/" : pathname === tab.to;
              const Icon = tab.icon;
              return (
                <li key={tab.to}>
                  <Link
                    to={tab.to}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-xl py-1.5 text-xs font-semibold transition-colors duration-150",
                      active ? "text-primary" : "text-fg-subtle",
                    )}
                  >
                    <Icon
                      className="size-5"
                      strokeWidth={active ? 2.4 : 1.8}
                      fill={active && tab.to !== "/neu" ? "currentColor" : "none"}
                      fillOpacity={active && tab.to !== "/neu" ? 0.18 : 0}
                    />
                    {tab.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <Toaster
          position="top-center"
          richColors={false}
          toastOptions={{
            className: "font-sans",
            style: {
              background: "var(--color-surface)",
              color: "var(--color-fg)",
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
            },
          }}
        />
      </div>
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="space-y-4 px-5 pt-10">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-surface-muted" />
      <div className="h-4 w-64 animate-pulse rounded-lg bg-surface-muted" />
      <div className="h-40 animate-pulse rounded-3xl bg-surface-muted" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-24 animate-pulse rounded-2xl bg-surface-muted" />
        <div className="h-24 animate-pulse rounded-2xl bg-surface-muted" />
      </div>
      <div className="h-20 animate-pulse rounded-2xl bg-surface-muted" />
      <div className="h-20 animate-pulse rounded-2xl bg-surface-muted" />
    </div>
  );
}
