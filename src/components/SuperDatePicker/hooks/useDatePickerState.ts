import { useState } from "react";

export const useDatePickerState = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const [appliedStartDate, setAppliedStartDate] = useState<Date | null>(null);
  const [appliedEndDate, setAppliedEndDate] = useState<Date | null>(null);

  const [multiRanges, setMultiRanges] = useState<
    Array<{ start: Date; end: Date }>
  >([]);
  const [appliedMultiRanges, setAppliedMultiRanges] = useState<
    Array<{ start: Date; end: Date }>
  >([]);

  const [showRelative, setShowRelative] = useState(false);
  const [relativeFrom, setRelativeFrom] = useState("now-15m");
  const [relativeTo, setRelativeTo] = useState("now");

  const [toError, setToError] = useState<string>("");
  const [fromError, setFromError] = useState<string>("");

  const [compareToPrevious, setCompareToPrevious] = useState(false);
  const [previousPeriod, setPreviousPeriod] = useState<{
    startDate: Date;
    endDate: Date;
  } | null>(null);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,

    appliedStartDate,
    setAppliedStartDate,
    appliedEndDate,
    setAppliedEndDate,

    multiRanges,
    setMultiRanges,
    appliedMultiRanges,
    setAppliedMultiRanges,

    showRelative,
    setShowRelative,
    relativeFrom,
    setRelativeFrom,
    relativeTo,
    setRelativeTo,

    fromError,
    setFromError,
    toError,
    setToError,

    compareToPrevious,
    setCompareToPrevious,
    previousPeriod,
    setPreviousPeriod,
  };
};
