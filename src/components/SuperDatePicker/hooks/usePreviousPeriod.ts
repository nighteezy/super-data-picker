import { useMemo } from "react";

interface PreviousPeriod {
  startDate: Date;
  endDate: Date;
}

export const usePreviousPeriod = (
  mode: "single" | "range" | "multi-range",
  appliedStartDate: Date | null,
  appliedEndDate: Date | null
): PreviousPeriod | null => {
  return useMemo(() => {
    if (!appliedStartDate) return null;
    if (mode === "single") {
      const prevStart = new Date(appliedStartDate);
      prevStart.setDate(prevStart.getDate() - 1);
      return { startDate: prevStart, endDate: prevStart };
    }

    if (mode === "range" && appliedEndDate) {
      const diff = appliedEndDate.getTime() - appliedStartDate.getTime();
      const prevEnd = new Date(appliedStartDate.getTime() - 1);
      const prevStart = new Date(prevEnd.getTime() - diff);
      return { startDate: prevStart, endDate: prevEnd };
    }

    return null;
  }, [mode, appliedStartDate, appliedEndDate]);
};
