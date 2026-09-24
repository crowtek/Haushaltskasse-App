import { useEffect, useState } from "react";
import { useBudgetStore } from "@/lib/store";

export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const mark = () => setHydrated(true);
    if (useBudgetStore.persist.hasHydrated()) {
      mark();
      return;
    }
    const unsub = useBudgetStore.persist.onFinishHydration(mark);
    void useBudgetStore.persist.rehydrate();
    return unsub;
  }, []);

  return hydrated;
}
