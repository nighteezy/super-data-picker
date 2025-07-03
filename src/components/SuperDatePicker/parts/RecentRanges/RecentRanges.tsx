import React from "react";
import type { RecentRange } from "../../types/RecentRange";
import { ToggleSection } from "../ToggleSection/ToggleSection";
import styles from "./RecentRanges.module.css";

interface Props {
  items: RecentRange[];
  onSelect: (range: RecentRange) => void;
}

export const RecentRanges: React.FC<Props> = ({ items, onSelect }) => {
  if (items.length === 0) return null;

  return (
    <ToggleSection title="Recent Ranges" defaultOpen={false}>
      <div className={styles.list}>
        {items.map((range, i) => (
          <button
            key={i}
            className={styles.itemButton}
            onClick={() => onSelect(range)}
          >
            {renderLabel(range)}
          </button>
        ))}
      </div>
    </ToggleSection>
  );
};

function renderLabel(range: RecentRange) {
  if (range.type === "single") return `Single: ${range.start.toLocaleString()}`;
  if (range.type === "range")
    return `Range: ${range.start.toLocaleString()} – ${range.end.toLocaleString()}`;
  if (range.type === "multi-range")
    return `Multi: ${range.ranges.length} ranges`;
}
