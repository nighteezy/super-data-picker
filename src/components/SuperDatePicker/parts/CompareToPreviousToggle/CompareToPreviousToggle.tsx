import React from "react";

interface CompareToPreviousToggleProps {
  enabled: boolean;
  onToggle: (value: boolean) => void;
  disabled?: boolean;
}

export const CompareToPreviousToggle: React.FC<
  CompareToPreviousToggleProps
> = ({ enabled, onToggle, disabled = false }) => {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => onToggle(e.target.checked)}
        disabled={disabled}
      />
      Сравнить с предыдущим периодом
    </label>
  );
};
