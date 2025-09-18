import { useMemo, useState } from 'react';
import type { Column } from '@/shared/types/table';
import { Table } from '@/shared/ui/table/Table';
import { TableSearch } from '@/shared/ui/table/TableSearch';
import type { HasId } from '@/shared/types';
import { Spinner } from '@/shared/ui/Spinner';
import { ErrorAlert } from '@/shared/ui/ErrorAlert';
import { useRepoData } from '@/features/catalog/hooks/useRepoData';

type GenericPageProps<T extends HasId> = {
  title: string;
  resource: string;
  columns: Column<T>[];
  onRowClick?: (row: T) => void; // NEW
};

export function GenericPage<T extends HasId>({
  title,
  resource,
  columns,
  onRowClick,
}: GenericPageProps<T>) {
  const { data, loading, error, reload } = useRepoData<T>(resource);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((row) => JSON.stringify(row).toLowerCase().includes(q));
  }, [data, query]);

  const errorMsg =
    error instanceof Error ? error.message : error ? String(error) : '';

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <TableSearch value={query} onChange={setQuery} disabled={loading} />
      </div>

      {error && <ErrorAlert message={errorMsg} onRetry={reload} />}

      {loading ? (
        <Spinner label="Loading…" />
      ) : (
        <Table<T> data={filtered} columns={columns} onRowClick={onRowClick} />
      )}
    </div>
  );
}
