import DatePicker from "react-datepicker";
import type { Locale } from "date-fns";
import styles from "./SingleDatePicker.module.css";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  selected: Date;
  onChange: (date: Date) => void;
  dateFormat: string;
  locale: Locale;
}

export const SingleDatePicker = ({
  selected,
  onChange,
  dateFormat,
  locale,
}: Props) => (
  <div className={styles.wrapper}>
    <DatePicker
      selected={selected}
      onChange={(date) => date && onChange(date)}
      showTimeSelect
      dateFormat={dateFormat}
      locale={locale}
      className={styles.input}
      popperPlacement="bottom-start"
    />
  </div>
);
