import { useMemo, useState } from 'react';
import type { Column } from '@/shared/types/table';
import type { HasId } from '@/shared/types';
import { formatItemValue, sortData } from '@/utils';

interface TableProps<T extends HasId> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
}

export function Table<T extends HasId>({
  data,
  columns,
  onRowClick,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [dir, setDir] = useState<'asc' | 'desc'>('asc');

  const sorted = useMemo(
    () => sortData(data, columns, sortKey, dir),
    [data, columns, sortKey, dir],
  );

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
          {sorted.map((item) => (
            <tr
              key={item.id}
              className={`even:bg-white odd:bg-gray-50 ${
                onRowClick ? 'hover:bg-indigo-50 cursor-pointer' : ''
              }`}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map(({ key, render }) => (
                <td
                  key={String(key)}
                  className="px-4 py-3 text-sm text-gray-800"
                >
                  {render ? render(item) : formatItemValue(item[key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
