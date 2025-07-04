// hooks/useRecentRanges.ts
import { useState } from "react";
import type { RecentRange } from "../types/RecentRange";

const useRecentRanges = () => {
  const [recent, setRecent] = useState<RecentRange[]>([]);

  const add = (range: RecentRange) => {
    setRecent((prev) => {
      const updated = [range, ...prev.filter((r) => r !== range)];
      return updated.slice(0, 10);
    });
  };

  const clear = () => {
    setRecent([]);
  };

  return {
    recent,
    add,
    clear,
  };
};

export default useRecentRanges;
