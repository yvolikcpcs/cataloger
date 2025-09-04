import type { Column } from "@/types/table";
import { Table } from "@/shared/ui/table/Table";
import type { HasId } from "@/types";

type GenericPageProps<T extends HasId> = {
  title: string;
  data: T[];
  columns: Column<T>[];
};

export function GenericPage<T extends HasId>({
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
