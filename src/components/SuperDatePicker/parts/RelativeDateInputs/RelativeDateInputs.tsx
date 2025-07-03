import React, { useState, useMemo } from "react";
import { format } from "date-fns";
import { locales } from "../../utils/datePickerConfig";
import { useParseRelativeDate } from "../../hooks/useParseRelativeDate";
import { RelativeSuggestionInput } from "../RelativeSuggestionInput/RelativeSuggestionInput";
import styles from "./RelativeDateInputs.module.css";

interface RelativeDateInputsProps {
  relativeFrom: string;
  relativeTo: string;
  onChangeFrom: (value: string, error: string) => void;
  onChangeTo: (value: string, error: string) => void;
  validator: (value: string) => string | null;
  localeCode?: string;
  dateFormat?: string;
}

export const RelativeDateInputs: React.FC<RelativeDateInputsProps> = ({
  relativeFrom,
  relativeTo,
  onChangeFrom,
  onChangeTo,
  validator,
  localeCode = "en",
  dateFormat = "Pp",
}) => {
  const [fromError, setFromError] = useState<string>("");
  const [toError, setToError] = useState<string>("");

  const locale = locales[localeCode];
  const parseRelativeDate = useParseRelativeDate();

  const handleFromChange = (value: string) => {
    const error = validator(value);
    setFromError(error ?? "");
    onChangeFrom(value, error ?? "");
  };

  const handleToChange = (value: string) => {
    const error = validator(value);
    setToError(error ?? "");
    onChangeTo(value, error ?? "");
  };

  const parsedFromDate = useMemo(() => {
    if (!fromError) {
      try {
        return parseRelativeDate(relativeFrom);
      } catch {
        return null;
      }
    }
    return null;
  }, [fromError, parseRelativeDate, relativeFrom]);

  const parsedToDate = useMemo(() => {
    if (!toError) {
      try {
        return parseRelativeDate(relativeTo);
      } catch {
        return null;
      }
    }
    return null;
  }, [toError, parseRelativeDate, relativeTo]);

  return (
    <div className={styles.container}>
      <div className={styles.group}>
        <label className={styles.label}>Relative From:</label>
        <RelativeSuggestionInput
          value={relativeFrom}
          onChange={handleFromChange}
          hasError={!!fromError}
        />
        {fromError && <div className={styles.error}>{fromError}</div>}
        {!fromError && parsedFromDate && (
          <div className={styles.preview}>
            → {format(parsedFromDate, dateFormat, { locale })}
          </div>
        )}
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Relative To:</label>
        <RelativeSuggestionInput
          value={relativeTo}
          onChange={handleToChange}
          hasError={!!toError}
        />
        {toError && <div className={styles.error}>{toError}</div>}
        {!toError && parsedToDate && (
          <div className={styles.preview}>
            → {format(parsedToDate, dateFormat, { locale })}
          </div>
        )}
      </div>

      <small className={styles.supportNote}>
        Поддерживаются выражения: <code>now</code>, <code>now-15m</code>,{" "}
        <code>now/d</code>, <code>now/w</code>
      </small>
    </div>
  );
};
