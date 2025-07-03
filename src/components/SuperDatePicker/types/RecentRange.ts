export type RecentRange =
  | { type: "single"; start: Date }
  | { type: "range"; start: Date; end: Date }
  | { type: "multi-range"; ranges: { start: Date; end: Date }[] };
