import React from "react";
import { SingleDatePicker } from "./SingleDatePicker/SingleDatePicker";
import { RangeDatePicker } from "./RangeDatePicker/RangeDatePicker";
import { MultiRangeDatePicker } from "./MultiRangeDatePicker/MultiRangeDatePicker";
import { locales } from "../../utils/datePickerConfig";
import { ToggleSection } from "../ToggleSection/ToggleSection";
import type { DateSelectionPanelProps } from "../../types/DateSelectionPanelProps";

export const DateSelectionPanel: React.FC<DateSelectionPanelProps> = ({
  mode,
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  multiRanges,
  setMultiRanges,
  isEndBeforeStart,
  dateFormat,
  locale,
}) => {
  const localeObj = locales[locale];

  const renderPicker = () => {
    if (mode === "single") {
      return (
        <SingleDatePicker
          selected={startDate}
          onChange={onStartChange}
          dateFormat={dateFormat}
          locale={localeObj}
        />
      );
    }

    if (mode === "range") {
      return (
        <RangeDatePicker
          startDate={startDate}
          endDate={endDate}
          onStartChange={onStartChange}
          onEndChange={onEndChange}
          isEndBeforeStart={isEndBeforeStart}
          dateFormat={dateFormat}
          locale={localeObj}
        />
      );
    }

    if (mode === "multi-range") {
      return (
        <MultiRangeDatePicker
          startDate={startDate}
          endDate={endDate}
          onStartChange={onStartChange}
          onEndChange={onEndChange}
          multiRanges={multiRanges}
          setMultiRanges={setMultiRanges}
          isEndBeforeStart={isEndBeforeStart}
          dateFormat={dateFormat}
          locale={localeObj}
        />
      );
    }

    return null;
  };

  return <ToggleSection title="Date Selection">{renderPicker()}</ToggleSection>;
};
