import React, { useState } from "react";
import styles from "./ToggleSection.module.css";

interface ToggleSectionProps {
  title: string;
  defaultOpen?: boolean;
  toggleState?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const ToggleSection: React.FC<ToggleSectionProps> = ({
  title,
  children,
  defaultOpen = false,
  disabled = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`${styles.section} ${disabled ? styles.disabled : ""}`}>
      <div className={styles.header}>
        <span>{title}</span>
        <div
          className={styles.switchWrapper}
          onClick={() => !disabled && setOpen(!open)}
        >
          <div className={`${styles.switch} ${open ? styles.active : ""}`}>
            <div className={styles.thumb} />
          </div>
        </div>
      </div>
      {open && <div className={styles.content}>{children}</div>}
    </div>
  );
};
