import type { HasId } from '@/types';
import type { Column } from '@/types/table';

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export function Table<T extends HasId>({ data, columns }: TableProps<T>) {
  if (!data?.length) return null;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 border-b">
          <tr>
            {columns.map(({ key, label }) => (
              <th
                key={String(key)}
                className="text-left px-4 py-3 text-sm font-medium text-gray-700 uppercase tracking-wider"
              >
                {label ?? String(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="even:bg-white odd:bg-gray-50">
              {columns.map(({ key, render }) => (
                <td key={String(key)} className="px-4 py-3 text-sm text-gray-800">
                  {render ? render(item) : String(item[key] ?? '-')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
