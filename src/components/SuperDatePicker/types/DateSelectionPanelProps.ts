import type { locales } from "../utils/datePickerConfig";

export type DateSelectionMode = "single" | "range" | "multi-range";

export interface MultiRange {
  start: Date;
  end: Date;
}

export interface DateSelectionPanelProps {
  mode: DateSelectionMode;

  startDate: Date;
  endDate: Date;
  onStartChange: (date: Date) => void;
  onEndChange: (date: Date) => void;

  multiRanges: MultiRange[];
  setMultiRanges: (ranges: MultiRange[]) => void;

  isEndBeforeStart: boolean;

  dateFormat: string;
  locale: keyof typeof locales;
}
