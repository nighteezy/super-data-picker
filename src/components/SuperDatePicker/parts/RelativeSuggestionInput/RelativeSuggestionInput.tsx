import React, { useState } from "react";
import { relativeSuggestions } from "../../utils/relativeSuggestions";
import styles from "./RelativeSuggestionInput.module.css";

interface Props {
  value: string;
  onChange: (val: string) => void;
  hasError?: boolean;
}

export const RelativeSuggestionInput: React.FC<Props> = ({
  value,
  onChange,
  hasError = false,
}) => {
  const [focused, setFocused] = useState(false);

  const filtered = relativeSuggestions.filter((s) =>
    s.toLowerCase().startsWith(value.toLowerCase())
  );

  return (
    <div className={styles.relativeSuggestionContainer}>
      <input
        className={`${styles.relativeSuggestionInput} ${
          hasError ? styles.relativeSuggestionInputError : ""
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 100)}
        placeholder="e.g. now-15m"
      />
      {focused && filtered.length > 0 && (
        <ul className={styles.relativeSuggestionList}>
          {filtered.map((sug) => (
            <li key={sug} onMouseDown={() => onChange(sug)}>
              {sug}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
