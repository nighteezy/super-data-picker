import DatePicker from "react-datepicker";
import type { Locale } from "date-fns";
import styles from "./RangeDatePicker.module.css";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  startDate: Date;
  endDate: Date;
  onStartChange: (date: Date) => void;
  onEndChange: (date: Date) => void;
  dateFormat: string;
  locale: Locale;
  isEndBeforeStart: boolean;
}

export const RangeDatePicker = ({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  dateFormat,
  locale,
  isEndBeforeStart,
}: Props) => (
  <div className={styles.container}>
    <DatePicker
      selected={startDate}
      onChange={(date) => date && onStartChange(date)}
      selectsStart
      startDate={startDate}
      endDate={endDate}
      showTimeSelect
      dateFormat={dateFormat}
      locale={locale}
      className={styles.input}
      calendarClassName={styles.calendar}
      popperClassName={styles.popper}
      placeholderText="Start date"
    />

    <DatePicker
      selected={endDate}
      onChange={(date) => date && onEndChange(date)}
      selectsEnd
      startDate={startDate}
      endDate={endDate}
      minDate={startDate}
      showTimeSelect
      dateFormat={dateFormat}
      locale={locale}
      className={styles.input}
      calendarClassName={styles.calendar}
      popperClassName={styles.popper}
      placeholderText="End date"
    />

    {isEndBeforeStart && (
      <p className={styles.error}>End date cannot be before start date.</p>
    )}
  </div>
);
