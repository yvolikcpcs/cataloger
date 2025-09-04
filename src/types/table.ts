import type { HasId } from ".";

export type Column<T> = {
  key: keyof T;
  label?: string;
  render?: (row: T) => React.ReactNode;
};

export type TableConfig<T extends HasId> = {
  title: string;
  data: T[];
  columns: Column<T>[];
};
