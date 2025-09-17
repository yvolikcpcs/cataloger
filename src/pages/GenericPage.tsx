import { useMemo, useState } from "react";
import type { Column } from "@/types/table";
import { Table } from "@/shared/ui/table/Table";
import { TableSearch } from "@/shared/ui/table/TableSearch";
import type { HasId } from "@/types";
import { Spinner } from "@/shared/ui/Spinner";
import { ErrorAlert } from "@/shared/ui/ErrorAlert";

type GenericPageProps<T extends HasId> = {
  title: string;
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  error?: Error;
  onRetry?: () => void;
};

export function GenericPage<T extends HasId>({
  title,
  data,
  columns,
  loading = false,
  error,
  onRetry,
}: GenericPageProps<T>) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((row) => JSON.stringify(row).toLowerCase().includes(q));
  }, [data, query]);

  const errorMsg =
    error instanceof Error ? error.message : error ? String(error) : "";

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <TableSearch value={query} onChange={setQuery} disabled={loading} />
      </div>

      {error && <ErrorAlert message={errorMsg} onRetry={onRetry} />}

      {loading ? (
        <Spinner label="Loading…" />
      ) : (
        <Table<T> data={filtered} columns={columns} />
      )}
    </div>
  );
}
