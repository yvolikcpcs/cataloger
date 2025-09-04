export type Column<T> = {
  key: keyof T;
  label?: string;
  render?: (row: T) => React.ReactNode;
  isSortable?: boolean;
  sortAccessor?: (row: T) => number | string | boolean | Date;
};

