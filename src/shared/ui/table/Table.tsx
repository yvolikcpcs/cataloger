import { useMemo, useState } from 'react';
import type { Column } from '@/types/table';
import type { HasId } from '@/types';

interface TableProps<T extends HasId> {
  data: T[];
  columns: Column<T>[];
}

export function Table<T extends HasId>({ data, columns }: TableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [dir, setDir] = useState<'asc' | 'desc'>('asc');

  const normalize = (v: unknown): number | string => {
    if (v instanceof Date) return v.getTime();
    if (typeof v === 'number') return v;
    if (typeof v === 'boolean') return Number(v);
    if (typeof v === 'string') return v.toLowerCase();
    return String(v ?? '').toLowerCase();
  };

  const sorted = useMemo(() => {
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
  }, [data, sortKey, dir, columns]);

  const handleHeaderClick = (col: Column<T>) => {
    if (!col.isSortable) return;
    const key = col.key as keyof T;
    if (sortKey !== key) {
      setSortKey(key);
      setDir('asc');
    } else {
      setDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    }
  };

  const renderArrow = (col: Column<T>) => {
    if (!col.isSortable) return null;
    const active = sortKey === col.key;
    if (!active)
      return (
        <span aria-hidden className="opacity-40">
          ↕︎
        </span>
      );
    return <span aria-hidden>{dir === 'asc' ? '▲' : '▼'}</span>;
  };

  const formatItemValue = (value: T[keyof T]): string => {
    if (Array.isArray(value)) return value.join(',');
    return String(value ?? '-');
  };

  if (!sorted?.length) return null;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 border-b">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`text-left px-4 py-3 text-sm font-medium text-gray-700 uppercase tracking-wider
                  ${col.isSortable ? 'cursor-pointer select-none' : ''}`}
                onClick={() => handleHeaderClick(col)}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label ?? String(col.key)}
                  {renderArrow(col)}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sorted.length === 0 ? (
            <tr>
              <td
                className="px-4 py-6 text-sm text-gray-500 italic"
                colSpan={columns.length}
              >
                No results
              </td>
            </tr>
          ) : (
            sorted.map((item) => (
              <tr key={item.id} className="even:bg-white odd:bg-gray-50">
                {columns.map(({ key, render }) => (
                  <td
                    key={String(key)}
                    className="px-4 py-3 text-sm text-gray-800"
                  >
                    {render ? render(item) : formatItemValue(item[key])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
