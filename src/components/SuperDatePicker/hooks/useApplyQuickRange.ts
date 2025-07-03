import { useCallback } from "react";

import { isValid } from "date-fns";
import type { QuickRangeOption } from "../utils/datePickerConfig";
import { useParseRelativeDate } from "./useParseRelativeDate";

interface UseApplyQuickRangeProps {
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  setMultiRanges: (ranges: { start: Date; end: Date }[]) => void;
}

export const useApplyQuickRange = ({
  setStartDate,
  setEndDate,
  setMultiRanges,
}: UseApplyQuickRangeProps) => {
  const parseRelativeDate = useParseRelativeDate();
  const applyQuickRange = useCallback(
    (range: QuickRangeOption) => {
      const from = parseRelativeDate(range.from);
      const to = parseRelativeDate(range.to);

      if (isValid(from) && isValid(to)) {
        setStartDate(from);
        setEndDate(to);
        setMultiRanges([]);
      }
    },
    [parseRelativeDate, setStartDate, setEndDate, setMultiRanges]
  );

  return { applyQuickRange };
};
