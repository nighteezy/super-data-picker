import { useCallback } from "react";
import { startOfDay, startOfHour, startOfMinute } from "date-fns";

type TimeUnit = "s" | "m" | "h" | "d";
type RoundUnit = "d" | "h" | "m";

const applyOffset = (date: Date, amount: number, unit: TimeUnit): Date => {
  const msMap: Record<TimeUnit, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };
  return new Date(date.getTime() + amount * msMap[unit]);
};

const applyRounding = (date: Date, unit: RoundUnit): Date => {
  switch (unit) {
    case "d":
      return startOfDay(date);
    case "h":
      return startOfHour(date);
    case "m":
      return startOfMinute(date);
  }
};

export const useParseRelativeDate = () => {
  return useCallback((expr: string): Date => {
    const now = new Date();

    if (expr === "now") return now;
    if (expr === "now/d") return startOfDay(now);
    if (expr === "now/h") return startOfHour(now);
    if (expr === "now/m") return startOfMinute(now);
    if (expr === "now/w") {
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(new Date(now.setDate(diff)).setHours(0, 0, 0, 0));
    }

    const roundMatch = expr.match(/now([+-])(\d+)([smhd])\/(d|h|m)/);
    if (roundMatch) {
      const [, sign, amountStr, unit, roundTo] = roundMatch;
      const amount = parseInt(amountStr, 10) * (sign === "+" ? 1 : -1);
      const shifted = applyOffset(now, amount, unit as TimeUnit);
      return applyRounding(shifted, roundTo as RoundUnit);
    }

    const offsetMatch = expr.match(/now([+-])(\d+)([smhd])/);
    if (offsetMatch) {
      const [, sign, amountStr, unit] = offsetMatch;
      const amount = parseInt(amountStr, 10) * (sign === "+" ? 1 : -1);
      return applyOffset(now, amount, unit as TimeUnit);
    }

    return now;
  }, []);
};
