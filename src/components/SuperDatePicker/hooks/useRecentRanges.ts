import { useCallback, useState } from "react";
import type { RecentRange } from "../types/RecentRange";

const MAX_RECENT = 10;

export const useRecentRanges = () => {
  const [recent, setRecent] = useState<RecentRange[]>([]);

  const add = useCallback((newRange: RecentRange) => {
    setRecent((prev) => {
      const serialized = JSON.stringify(newRange);
      const exists = prev.some((r) => JSON.stringify(r) === serialized);
      if (exists) return prev;

      const updated = [newRange, ...prev];
      return updated.slice(0, MAX_RECENT);
    });
  }, []);

  return { recent, add, setRecent };
};
