export const formatValue = <T>(value: T[keyof T]): string => {
  if (Array.isArray(value)) return value.join(',');
  return String(value ?? '-');
};
