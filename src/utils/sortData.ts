import type { Column } from '@/shared/types/table';
import type { HasId } from '@/shared/types';

function normalize(value: unknown): number | string {
  if (value instanceof Date) return value.getTime();
  if (typeof value === 'number') return value;
  if (typeof value === 'boolean') return Number(value);
  if (typeof value === 'string') return value.toLowerCase();
  return String(value ?? '').toLowerCase();
}

export function sortData<T extends HasId>(
  data: T[],
  columns: Column<T>[],
  sortKey: keyof T | null,
  dir: 'asc' | 'desc',
): T[] {
  if (!sortKey) return data;

  const activeCol = columns.find((c) => String(c.key) === String(sortKey));
  const getVal = (row: T) =>
    activeCol?.sortAccessor ? activeCol.sortAccessor(row) : row[sortKey];

  return [...data].sort((a, b) => {
    const av = normalize(getVal(a));
    const bv = normalize(getVal(b));
    if (av < bv) return dir === 'asc' ? -1 : 1;
    if (av > bv) return dir === 'asc' ? 1 : -1;
    return 0;
  });
}
