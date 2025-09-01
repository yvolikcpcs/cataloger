import type { Column } from "../types/table";
import { Table } from "../shared/ui/Table";

type GenericPageProps<T extends { id: number | string }> = {
  title: string;
  data: T[];
  columns: Column<T>[];
};

export function GenericPage<T extends { id: number | string }>({
  title,
  data,
  columns,
}: GenericPageProps<T>) {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <Table<T> data={data} columns={columns} />
    </div>
  );
}
