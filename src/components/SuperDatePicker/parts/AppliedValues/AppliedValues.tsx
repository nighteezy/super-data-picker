import React, { useState } from "react";
import { format } from "date-fns";
import type { Locale } from "date-fns";
import styles from "./AppliedValues.module.css";

interface PreviousPeriod {
  startDate: Date;
  endDate: Date;
}

interface AppliedValuesProps {
  mode: "single" | "range" | "multi-range";
  appliedStartDate: Date | null;
  appliedEndDate: Date | null;
  appliedMultiRanges: { start: Date; end: Date }[];
  dateFormat: string;
  locale: Locale;
  previousPeriod?: PreviousPeriod | null;
  onReapply?: () => void;
  onRestorePrevious?: (period: PreviousPeriod) => void;
  showCompareToggle?: boolean;
  compareEnabled?: boolean;
  onToggleCompare?: (enabled: boolean) => void;
}

export const AppliedValues: React.FC<AppliedValuesProps> = ({
  mode,
  appliedStartDate,
  appliedEndDate,
  appliedMultiRanges,
  dateFormat,
  locale,
  previousPeriod,
  onReapply,
  onRestorePrevious,
  showCompareToggle = false,
  compareEnabled = false,
  onToggleCompare,
}) => {
  const [expanded, setExpanded] = useState(false);

  const shouldRender =
    (mode === "multi-range" && appliedMultiRanges.length > 0) ||
    (appliedStartDate &&
      (mode === "single" || (mode === "range" && appliedEndDate)));

  if (!shouldRender) return null;

  return (
    <div className={styles.container} data-testid="applied-values">
      <strong className={styles.header}>📅 Applied:</strong>

      {mode === "multi-range" ? (
        <>
          {appliedMultiRanges.length > 2 && (
            <button
              onClick={() => setExpanded((e) => !e)}
              className={styles.toggleBtn}
            >
              {expanded ? "Hide ranges" : "Show ranges"}
            </button>
          )}
          {(expanded ? appliedMultiRanges : appliedMultiRanges.slice(0, 2)).map(
            (range, idx) => (
              <div
                key={idx}
                className={styles.range}
                title={`${format(range.start, "PPpp", { locale })} — ${format(
                  range.end,
                  "PPpp",
                  { locale }
                )}`}
              >
                {format(range.start, dateFormat, { locale })} —{" "}
                {format(range.end, dateFormat, { locale })}
              </div>
            )
          )}
          {!expanded && appliedMultiRanges.length > 2 && (
            <div className={styles.moreText}>
              +{appliedMultiRanges.length - 2} more
            </div>
          )}
        </>
      ) : (
        <div
          className={styles.range}
          title={
            appliedStartDate && appliedEndDate
              ? `${format(appliedStartDate, "PPpp", { locale })} — ${format(
                  appliedEndDate,
                  "PPpp",
                  { locale }
                )}`
              : appliedStartDate
              ? format(appliedStartDate, "PPpp", { locale })
              : ""
          }
        >
          {appliedStartDate && format(appliedStartDate, dateFormat, { locale })}
          {appliedEndDate &&
            ` — ${format(appliedEndDate, dateFormat, { locale })}`}
        </div>
      )}

      {showCompareToggle && onToggleCompare && (
        <div className={styles.switchRow}>
          <span>Compare to previous period</span>
          <div
            className={styles.switchWrapper}
            onClick={() => onToggleCompare(!compareEnabled)}
          >
            <div
              className={`${styles.switch} ${
                compareEnabled ? styles.active : ""
              }`}
            >
              <div className={styles.thumb} />
            </div>
          </div>
        </div>
      )}

      {compareEnabled && previousPeriod && (
        <div className={styles.previousBlock}>
          <strong>↩️ Previous Period:</strong>
          <br />
          {format(previousPeriod.startDate, dateFormat, { locale })} —{" "}
          {format(previousPeriod.endDate, dateFormat, { locale })}
          {onRestorePrevious && (
            <div>
              <button
                className={styles.restoreBtn}
                onClick={() => onRestorePrevious(previousPeriod)}
              >
                Restore
              </button>
            </div>
          )}
        </div>
      )}

      {(onReapply || onRestorePrevious) && (
        <div className={styles.actions}>
          {onReapply && (
            <button className={styles.reapplyBtn} onClick={onReapply}>
              🔁 Re-apply
            </button>
          )}
        </div>
      )}
    </div>
  );
};
