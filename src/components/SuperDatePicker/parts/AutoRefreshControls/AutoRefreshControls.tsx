import React from "react";
import { useAutoRefresh } from "../../hooks/useAutoRefresh";
import { addRecentRange } from "../../utils/recentRangesStorage";
import { ToggleSection } from "../ToggleSection/ToggleSection";
import styles from "./AutoRefreshControls.module.css";

interface AutoRefreshControlsProps {
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
}

export const AutoRefreshControls: React.FC<AutoRefreshControlsProps> = ({
  showRelative,
  mode,
  relativeFrom,
  relativeTo,
  startDate,
  endDate,
  multiRanges,
  onApply,
}) => {
  const {
    isPaused,
    setIsPaused,
    refreshInterval,
    setRefreshInterval,
    intervalUnit,
    setIntervalUnit,
    handleApply,
  } = useAutoRefresh({
    showRelative,
    mode,
    relativeFrom,
    relativeTo,
    startDate,
    endDate,
    multiRanges,
    onApply,
    addRecentRange,
  });

  return (
    <ToggleSection
      title="Auto Refresh"
      defaultOpen={!isPaused}
      toggleState={!isPaused}
      onToggle={() => setIsPaused((p) => !p)}
    >
      <div className={styles.controls}>
        <input
          type="number"
          value={refreshInterval}
          onChange={(e) => setRefreshInterval(Number(e.target.value))}
          min={1}
          className={styles.input}
        />

        <select
          value={intervalUnit}
          onChange={(e) => setIntervalUnit(e.target.value as "s" | "m" | "h")}
          className={styles.select}
        >
          <option value="s">Seconds</option>
          <option value="m">Minutes</option>
          <option value="h">Hours</option>
        </select>

        <button
          onClick={handleApply}
          className={styles.button}
          data-testid="auto-refresh-toggle"
        >
          Refresh
        </button>

        {!isPaused && (
          <span className={styles.status}>
            Auto-refresh every {refreshInterval} {intervalUnit}
          </span>
        )}
      </div>
    </ToggleSection>
  );
};
