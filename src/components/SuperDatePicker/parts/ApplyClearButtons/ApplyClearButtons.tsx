import React from "react";
import styles from "./ApplyClearButtons.module.css";

interface ApplyClearButtonsProps {
  onApply: () => void;
  onClear: () => void;
}

const ApplyClearButtons: React.FC<ApplyClearButtonsProps> = ({
  onApply,
  onClear,
}) => {
  return (
    <div className={styles.container}>
      <button onClick={onApply} className={styles.applyButton}>
        Apply
      </button>
      <button onClick={onClear} className={styles.clearButton}>
        Clear
      </button>
    </div>
  );
};

export default ApplyClearButtons;
