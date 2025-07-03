export const isValidRelativeExpr = (expr: string): boolean => {
  return /^now([+-]\d+[smhd])?(\/[smhdwMy])?$/.test(expr);
};

export const normalizeRelativeExpr = (expr: string): string => {
  if (/^\d+[smhd]$/.test(expr)) {
    return `now-${expr}`;
  }

  if (/^[+-]\d+[smhd]$/.test(expr)) {
    return `now${expr}`;
  }

  return expr;
};
