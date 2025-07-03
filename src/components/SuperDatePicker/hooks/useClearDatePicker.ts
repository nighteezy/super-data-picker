import type { Dispatch, SetStateAction } from "react";

interface UseClearDatePickerParams {
  setStartDate: Dispatch<SetStateAction<Date>>;
  setEndDate: Dispatch<SetStateAction<Date>>;
  setAppliedStartDate: Dispatch<SetStateAction<Date | null>>;
  setAppliedEndDate: Dispatch<SetStateAction<Date | null>>;
  setMultiRanges: Dispatch<SetStateAction<{ start: Date; end: Date }[]>>;
  setAppliedMultiRanges: Dispatch<SetStateAction<{ start: Date; end: Date }[]>>;
  setRelativeFrom: Dispatch<SetStateAction<string>>;
  setRelativeTo: Dispatch<SetStateAction<string>>;
  setFromError: Dispatch<SetStateAction<string>>;
  setToError: Dispatch<SetStateAction<string>>;
}

export const useClearDatePicker = ({
  setStartDate,
  setEndDate,
  setAppliedStartDate,
  setAppliedEndDate,
  setMultiRanges,
  setAppliedMultiRanges,
  setRelativeFrom,
  setRelativeTo,
  setFromError,
  setToError,
}: UseClearDatePickerParams) => {
  const handleClear = () => {
    const now = new Date();
    setStartDate(now);
    setEndDate(now);
    setAppliedStartDate(null);
    setAppliedEndDate(null);
    setMultiRanges([]);
    setAppliedMultiRanges([]);
    setRelativeFrom("now-15m");
    setRelativeTo("now");
    setFromError("");
    setToError("");
  };

  return handleClear;
};
