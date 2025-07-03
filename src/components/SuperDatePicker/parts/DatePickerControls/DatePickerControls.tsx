import React from "react";
import styles from "./DatePickerControls.module.css";
import { dateFormats } from "../../utils/datePickerConfig";
import { ToggleSection } from "../ToggleSection/ToggleSection";

interface DatePickerControlsProps {
  mode: "single" | "range" | "multi-range";
  setMode: (mode: "single" | "range" | "multi-range") => void;
  locale: string;
  setLocale: (locale: string) => void;
  dateFormat: string;
  setDateFormat: (format: string) => void;
}

export const DatePickerControls: React.FC<DatePickerControlsProps> = ({
  mode,
  setMode,
  locale,
  setLocale,
  dateFormat,
  setDateFormat,
}) => {
  return (
    <ToggleSection title="Date Picker Settings">
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label className={styles.label}>Mode</label>
          <select
            className={styles.select}
            value={mode}
            onChange={(e) =>
              setMode(e.target.value as "single" | "range" | "multi-range")
            }
          >
            <option value="single">Single</option>
            <option value="range">Range</option>
            <option value="multi-range">Multiple Ranges</option>
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label className={styles.label}>Locale</label>
          <select
            className={styles.select}
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
          >
            <option value="en">English</option>
            <option value="ru">Russian</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label className={styles.label}>Date Format</label>
          <select
            className={styles.select}
            value={dateFormat}
            onChange={(e) => setDateFormat(e.target.value)}
          >
            {dateFormats.map((fmt) => (
              <option key={fmt.value} value={fmt.value}>
                {fmt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </ToggleSection>
  );
};
