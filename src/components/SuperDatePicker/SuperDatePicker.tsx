import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { quickRanges, locales } from "./utils/datePickerConfig";
import { DatePickerControls } from "./parts/DatePickerControls/DatePickerControls";
import { useDatePickerSettings } from "./hooks/useDatePickerSettings";
import { QuickRanges } from "./parts/QuickRanges/QuickRanges";
import { useApplyQuickRange } from "./hooks/useApplyQuickRange";
import { useAutoRefresh } from "./hooks/useAutoRefresh";
import ApplyClearButtons from "./parts/ApplyClearButtons/ApplyClearButtons";
import { useClearDatePicker } from "./hooks/useClearDatePicker";
import { AppliedValues } from "./parts/AppliedValues/AppliedValues";
import { useDatePickerState } from "./hooks/useDatePickerState";
import { RelativeModePanel } from "./parts/RelativeModePanel/RelativeModePanel";
import { CompareToPreviousToggle } from "./parts/CompareToPreviousToggle/CompareToPreviousToggle";
import { usePreviousPeriod } from "./hooks/usePreviousPeriod";
import { AutoRefreshControls } from "./parts/AutoRefreshControls/AutoRefreshControls";
import useRecentRanges from "./hooks/useRecentRanges";
import { RecentRanges } from "./parts/RecentRanges/RecentRanges";
import type { RecentRange } from "./types/RecentRange";
import styles from "./SuperDatePicker.module.css";
import { DateSelectionPanel } from "./parts/DateSelection/DateSelection";

export const SuperDatePicker: React.FC = () => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    appliedStartDate,
    setAppliedStartDate,
    appliedEndDate,
    setAppliedEndDate,
    appliedMultiRanges,
    setAppliedMultiRanges,
    multiRanges,
    setMultiRanges,
    showRelative,
    setShowRelative,
    relativeFrom,
    setRelativeFrom,
    relativeTo,
    setRelativeTo,
    setFromError,
    setToError,
    compareToPrevious,
    setCompareToPrevious,
  } = useDatePickerState();

  const { mode, setMode, locale, setLocale, dateFormat, setDateFormat } =
    useDatePickerSettings();

  const previousPeriod = usePreviousPeriod(
    mode,
    appliedStartDate,
    appliedEndDate
  );

  const { recent, add: addRecentRange, clear: clearRecent } = useRecentRanges();

  const { applyQuickRange } = useApplyQuickRange({
    setStartDate,
    setEndDate,
    setMultiRanges,
  });

  const { handleApply } = useAutoRefresh({
    showRelative,
    mode,
    relativeFrom,
    relativeTo,
    startDate,
    endDate,
    multiRanges,
    addRecentRange,
    onApply: ({ startDate, endDate, multiRanges }) => {
      setAppliedStartDate(startDate);
      setAppliedEndDate(endDate);
      setAppliedMultiRanges(multiRanges);
      if (multiRanges.length > 0) {
        setMultiRanges([]);
      }
    },
  });

  const handleClear = useClearDatePicker({
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
  });

  const isEndBeforeStart = endDate < startDate;

  const handleRecentSelect = (range: RecentRange) => {
    if (range.type === "single") {
      setMode("single");
      setStartDate(new Date(range.start));
    } else if (range.type === "range") {
      setMode("range");
      setStartDate(new Date(range.start));
      setEndDate(new Date(range.end));
    } else if (range.type === "multi-range") {
      setMode("multi-range");
      setMultiRanges(
        range.ranges.map((r) => ({
          start: new Date(r.start),
          end: new Date(r.end),
        }))
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.section}>
        <DatePickerControls
          mode={mode}
          setMode={setMode}
          locale={locale}
          setLocale={setLocale}
          dateFormat={dateFormat}
          setDateFormat={setDateFormat}
        />
      </div>

      <div className={styles.section}>
        <DateSelectionPanel
          mode={mode}
          startDate={startDate}
          endDate={endDate}
          onStartChange={setStartDate}
          onEndChange={setEndDate}
          multiRanges={multiRanges}
          setMultiRanges={setMultiRanges}
          isEndBeforeStart={isEndBeforeStart}
          dateFormat={dateFormat}
          locale={locale}
        />
      </div>

      <div className={styles.section}>
        <QuickRanges quickRanges={quickRanges} onSelect={applyQuickRange} />
        <RecentRanges
          items={recent}
          onSelect={handleRecentSelect}
          onClearHistory={clearRecent}
        />
      </div>

      <div className={styles.section}>
        <RelativeModePanel
          show={showRelative}
          onToggle={() => setShowRelative(!showRelative)}
          relativeFrom={relativeFrom}
          relativeTo={relativeTo}
          onChangeFrom={(val, err) => {
            setRelativeFrom(val);
            setFromError(err ?? "");
          }}
          onChangeTo={(val, err) => {
            setRelativeTo(val);
            setToError(err ?? "");
          }}
        />
      </div>

      <div className={styles.section}>
        <AutoRefreshControls
          showRelative={showRelative}
          mode={mode}
          relativeFrom={relativeFrom}
          relativeTo={relativeTo}
          startDate={startDate}
          endDate={endDate}
          multiRanges={multiRanges}
          onApply={({ startDate, endDate, multiRanges }) => {
            setAppliedStartDate(startDate);
            setAppliedEndDate(endDate);
            setAppliedMultiRanges(multiRanges);
            if (multiRanges.length > 0) {
              setMultiRanges([]);
            }
          }}
        />
      </div>

      {(mode === "range" || mode === "single") && showRelative && (
        <div className={styles.section}>
          <CompareToPreviousToggle
            enabled={compareToPrevious}
            onToggle={setCompareToPrevious}
          />
        </div>
      )}
      <div className={styles.section}>
        <AppliedValues
          mode={mode}
          appliedStartDate={appliedStartDate}
          appliedEndDate={appliedEndDate}
          appliedMultiRanges={appliedMultiRanges}
          dateFormat={dateFormat}
          locale={locales[locale]}
          previousPeriod={previousPeriod}
          compareEnabled={true}
        />
      </div>

      <div className={styles.section}>
        <ApplyClearButtons onApply={handleApply} onClear={handleClear} />
      </div>
    </div>
  );
};
