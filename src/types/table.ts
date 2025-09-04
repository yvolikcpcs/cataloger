import type { HasId } from ".";

export type Column<T> = {
  key: keyof T;
  label?: string;
  render?: (row: T) => React.ReactNode;
  isSortable?: boolean;
  sortAccessor?: (row: T) => number | string | boolean | Date;
};

export type TableConfig<T extends HasId> = {
  title: string;
  data: T[];
  columns: Column<T>[];
};
