import { enUS, ru, fr } from "date-fns/locale";
import type { Locale } from "date-fns";

export interface QuickRangeOption {
  label: string;
  from: string;
  to: string;
}

export const quickRanges: QuickRangeOption[] = [
  { label: "Last 15 minutes", from: "now-15m", to: "now" },
  { label: "Last 30 minutes", from: "now-30m", to: "now" },
  { label: "Last 1 hour", from: "now-1h", to: "now" },
  { label: "Today", from: "now/d", to: "now" },
  { label: "This week", from: "now/w", to: "now" },
];

export const intervalUnitToMs = (unit: "s" | "m" | "h"): number => {
  switch (unit) {
    case "s":
      return 1000;
    case "m":
      return 60 * 1000;
    case "h":
      return 60 * 60 * 1000;
    default:
      return 1000;
  }
};

export const locales: { [key: string]: Locale } = {
  en: enUS,
  ru: ru,
  fr: fr,
};

export const dateFormats = [
  { label: "Date and Time (Pp)", value: "Pp" },
  { label: "DD.MM.YYYY HH:mm", value: "dd.MM.yyyy HH:mm" },
  { label: "YYYY-MM-DD", value: "yyyy-MM-dd" },
  { label: "Full Date (PPP)", value: "PPP" },
];
