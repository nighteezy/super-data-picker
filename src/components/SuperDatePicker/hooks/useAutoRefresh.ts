import { useCallback, useEffect, useRef, useState } from "react";
import { intervalUnitToMs } from "../utils/datePickerConfig";
import { useParseRelativeDate } from "./useParseRelativeDate";
import type { RecentRange } from "../types/RecentRange";

type IntervalUnit = "s" | "m" | "h";

interface UseAutoRefreshParams {
  showRelative: boolean;
  mode: "single" | "range" | "multi-range";
  relativeFrom: string;
  relativeTo: string;
  startDate: Date;
  endDate: Date;
  multiRanges: { start: Date; end: Date }[];
  onApply: (payload: {
    startDate: Date;
    endDate: Date | null;
    multiRanges: { start: Date; end: Date }[];
  }) => void;
  addRecentRange: (range: RecentRange) => void;
}

export const useAutoRefresh = ({
  showRelative,
  mode,
  relativeFrom,
  relativeTo,
  startDate,
  endDate,
  multiRanges,
  onApply,
  addRecentRange,
}: UseAutoRefreshParams) => {
  const [isPaused, setIsPaused] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5);
  const [intervalUnit, setIntervalUnit] = useState<IntervalUnit>("m");
  const parseRelativeDate = useParseRelativeDate();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleApply = useCallback(() => {
    let payload: {
      startDate: Date;
      endDate: Date | null;
      multiRanges: { start: Date; end: Date }[];
    };

    if (showRelative) {
      const from = parseRelativeDate(relativeFrom);
      const to = parseRelativeDate(relativeTo);
      payload = { startDate: from, endDate: to, multiRanges: [] };
      addRecentRange({ type: "range", start: from, end: to });
    } else if (mode === "range") {
      payload = { startDate, endDate, multiRanges: [] };
      addRecentRange({ type: "range", start: startDate, end: endDate });
    } else if (mode === "single") {
      payload = { startDate, endDate: null, multiRanges: [] };
      addRecentRange({ type: "single", start: startDate });
    } else {
      payload = { startDate: new Date(), endDate: null, multiRanges };
      addRecentRange({ type: "multi-range", ranges: multiRanges });
    }

    onApply(payload);
  }, [
    showRelative,
    mode,
    parseRelativeDate,
    relativeFrom,
    relativeTo,
    onApply,
    startDate,
    endDate,
    multiRanges,
    addRecentRange,
  ]);

  useEffect(() => {
    if (!isPaused) {
      const ms = refreshInterval * intervalUnitToMs(intervalUnit);
      intervalRef.current = setInterval(() => {
        handleApply();
      }, ms);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused, refreshInterval, intervalUnit, handleApply]);

  return {
    isPaused,
    setIsPaused,
    refreshInterval,
    setRefreshInterval,
    intervalUnit,
    setIntervalUnit,
    handleApply,
  };
};
