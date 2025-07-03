import React from "react";
import { ToggleSection } from "../ToggleSection/ToggleSection";
import type { QuickRangeOption } from "../../utils/datePickerConfig";
import styles from "./QuickRanges.module.css";

interface QuickRangesProps {
  quickRanges: QuickRangeOption[];
  onSelect: (range: QuickRangeOption) => void;
}

export const QuickRanges: React.FC<QuickRangesProps> = ({
  quickRanges,
  onSelect,
}) => {
  return (
    <ToggleSection title="Quick Ranges" defaultOpen={false}>
      <ul className={styles.list}>
        {quickRanges.map((qr) => (
          <li key={qr.label}>
            <button className={styles.itemButton} onClick={() => onSelect(qr)}>
              {qr.label}
            </button>
          </li>
        ))}
      </ul>
    </ToggleSection>
  );
};
