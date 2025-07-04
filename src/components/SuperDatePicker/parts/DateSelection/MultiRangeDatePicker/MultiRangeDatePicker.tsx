import { useState, type FC } from "react";
import DatePicker from "react-datepicker";
import { format, type Locale } from "date-fns";
import styles from "./MultiRangeDatePicker.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { createPortal } from "react-dom";

interface Range {
  start: Date;
  end: Date;
}

interface Props {
  startDate: Date;
  endDate: Date;
  onStartChange: (date: Date) => void;
  onEndChange: (date: Date) => void;
  multiRanges: Range[];
  setMultiRanges: (ranges: Range[]) => void;
  isEndBeforeStart: boolean;
  dateFormat: string;
  locale: Locale;
}

export const MultiRangeDatePicker = ({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  multiRanges,
  setMultiRanges,
  isEndBeforeStart,
  dateFormat,
  locale,
}: Props) => {
  const [removingIndex, setRemovingIndex] = useState<number | null>(null);

  const handleAddRange = () => {
    if (!isEndBeforeStart) {
      setMultiRanges([...multiRanges, { start: startDate, end: endDate }]);
    }
  };

  const handleRemoveRange = (idx: number) => {
    setRemovingIndex(idx);
    setTimeout(() => {
      setMultiRanges(multiRanges.filter((_, i) => i !== idx));
      setRemovingIndex(null);
    }, 300);
  };

  const PopperContainer: FC<{ children?: React.ReactNode }> = ({
    children,
  }) => {
    return createPortal(children || null, document.body);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputsRow}>
        <DatePicker
          selected={startDate}
          onChange={(date) => date && onStartChange(date)}
          showTimeSelect
          dateFormat={dateFormat}
          locale={locale}
          className={styles.input}
          calendarClassName={styles.calendar}
          popperClassName={styles.popper}
          placeholderText="Start"
          popperContainer={PopperContainer}
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => date && onEndChange(date)}
          showTimeSelect
          minDate={startDate}
          dateFormat={dateFormat}
          locale={locale}
          className={styles.input}
          calendarClassName={styles.calendar}
          popperClassName={styles.popper}
          placeholderText="End"
          popperContainer={PopperContainer}
        />
      </div>

      <button
        disabled={isEndBeforeStart}
        onClick={handleAddRange}
        className={styles.addButton}
      >
        Add Range
      </button>

      {multiRanges.length > 0 && (
        <ul className={styles.rangeList}>
          {multiRanges.map((range, idx) => (
            <li
              key={idx}
              className={`${styles.rangeItem} ${
                removingIndex === idx ? styles.fadeOut : ""
              }`}
            >
              <span>
                {format(range.start, dateFormat, { locale })} –{" "}
                {format(range.end, dateFormat, { locale })}
              </span>
              <button
                onClick={() => handleRemoveRange(idx)}
                className={styles.removeButton}
                title="Remove"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
