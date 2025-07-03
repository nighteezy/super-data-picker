import type { RecentRange } from "../types/RecentRange";

const STORAGE_KEY = "recent_ranges";
const MAX_HISTORY = 10;

export function getRecentRanges(): RecentRange[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw, (_key, value) =>
      typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)
        ? new Date(value)
        : value
    );
  } catch {
    return [];
  }
}

export function addRecentRange(range: RecentRange) {
  const existing = getRecentRanges();
  const deduped = existing.filter(
    (r) => JSON.stringify(r) !== JSON.stringify(range)
  );
  const next = [range, ...deduped].slice(0, MAX_HISTORY);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
