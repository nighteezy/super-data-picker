import React from "react";
import { RelativeDateInputs } from "../RelativeDateInputs/RelativeDateInputs";
import { isValidRelativeExpr } from "../../utils/relativeDateUtils";
import { ToggleSection } from "../ToggleSection/ToggleSection";

interface RelativeModePanelProps {
  show: boolean;
  onToggle: () => void;
  relativeFrom: string;
  relativeTo: string;
  onChangeFrom: (value: string, error: string | null) => void;
  onChangeTo: (value: string, error: string | null) => void;
  localeCode?: string;
  dateFormat?: string;
}

export const RelativeModePanel: React.FC<RelativeModePanelProps> = ({
  show,
  onToggle,
  relativeFrom,
  relativeTo,
  onChangeFrom,
  onChangeTo,
  localeCode = "en",
  dateFormat = "Pp",
}) => {
  const validate = (value: string) =>
    isValidRelativeExpr(value) ? null : "Неверное выражение";

  return (
    <ToggleSection
      title="Relative values"
      defaultOpen={show}
      toggleState={show}
      onToggle={onToggle}
    >
      <RelativeDateInputs
        relativeFrom={relativeFrom}
        relativeTo={relativeTo}
        onChangeFrom={onChangeFrom}
        onChangeTo={onChangeTo}
        validator={validate}
        localeCode={localeCode}
        dateFormat={dateFormat}
      />
    </ToggleSection>
  );
};
