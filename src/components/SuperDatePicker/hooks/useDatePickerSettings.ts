import { useState } from "react";

type Mode = "single" | "range" | "multi-range";

export const useDatePickerSettings = () => {
  const [mode, setMode] = useState<Mode>("single");
  const [locale, setLocale] = useState("en");
  const [dateFormat, setDateFormat] = useState("Pp");

  return {
    mode,
    setMode,
    locale,
    setLocale,
    dateFormat,
    setDateFormat,
  };
};
