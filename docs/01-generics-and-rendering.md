# Generics & Rendering in Cataloger

This page explains how the app renders different entities (Books, Cars, Users, Recipes, Paintings) using **one set of generic components**.

## Key Building Blocks

### `HasId`

```ts
// src/shared/types/index.ts
export type HasId = { id: string | number };
```

### Column & Field configurations

```ts
// src/shared/types/table.ts
export type Column<T> = {
  key: keyof T;
  label?: string;
  render?: (row: T) => React.ReactNode;
  isSortable?: boolean;
  sortAccessor?: (row: T) => number | string | boolean | Date;
};
```

### Generic Table

```ts
// src/shared/ui/table/Table.tsx
export function Table<T extends HasId>({ data, columns, onRowClick }: TableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [dir, setDir] = useState<'asc' | 'desc'>('asc');
  const sorted = useMemo(() => sortData(data, columns, sortKey, dir), [data, columns, sortKey, dir]);
  /* … */
}
```

### Generic List Page

```ts
// src/features/catalog/components/GenericPage.tsx
export function GenericPage<T extends HasId>({ title, resource, columns, onRowClick }: GenericPageProps<T>) {
  const { data, loading, error, reload } = useRepoData<T>(resource);
  return <Table<T> data={filtered} columns={columns} onRowClick={onRowClick} />;
}
```

### Generic Details Page

```ts
// src/features/catalog/components/GenericDetailsPage.tsx
export function GenericDetailsPage<T extends HasId>({ resource, title, fields, backTo }: GenericDetailsPageProps<T>) {
  const { id = '' } = useParams();
  const { item, loading, error, reload } = useRepoItem<T>(resource, id as T['id']);
  /* … */
}
```

### Type-Safe Sorting

```ts
// src/utils/sortData.ts
export function sortData<T extends HasId>(data: T[], columns: Column<T>[], sortKey: keyof T | null, dir: 'asc' | 'desc'): T[] {
  if (!sortKey) return data;
  const activeCol = columns.find((c) => String(c.key) === String(sortKey));
  const getVal = (row: T) => activeCol?.sortAccessor ? activeCol.sortAccessor(row) : row[sortKey];
  /* … */
}
```

### Examples in Pages

**Cars**

```ts
// src/pages/CarsPage.tsx (fragment)
const columns: Column<Car>[] = [
  { key: 'id', isSortable: true },
  { key: 'brand', isSortable: true },
  { key: 'model', isSortable: true },
  { key: 'year', isSortable: true },
  { key: 'mileage', label: 'Mileage', render: (c) => `${c.mileage.toLocaleString()} km`, isSortable: true },
  { key: 'fuelType', label: 'Fuel Type', render: (c) => c.fuelType.charAt(0).toUpperCase() + c.fuelType.slice(1), isSortable: true },
];
```

**Paintings**

```ts
// src/pages/PaintingsPage.tsx (fragment)
{
  key: 'dimensions',
  label: 'Dimensions',
  render: (p) => `${p.dimensions.width}×${p.dimensions.height} cm`,
  isSortable: true,
  sortAccessor: (p) => p.dimensions.width * p.dimensions.height,
}
```
