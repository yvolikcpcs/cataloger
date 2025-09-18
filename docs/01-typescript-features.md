# TypeScript Features Used

## 1) Interfaces & Type Aliases
- **Interfaces** for domain entities: `Book`, `Car`, `Painting`, `Recipe`, `User`.
- **Type aliases** for unions and shared shapes: `FuelType`, `Address`, `Dimensions`, `HasId`, `Column<T>`.

```ts
export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: FuelType;
  isUsed: boolean;
}

export type FuelType = 'gasoline' | 'diesel' | 'electric' | 'hybrid';
```

---

## 2) Literal Unions
Constrain allowed values and improve autocomplete.
```ts
export type FuelType = 'gasoline' | 'diesel' | 'electric' | 'hybrid';
type Dir = 'asc' | 'desc';
```

---

## 3) Generics (Components, Hooks, Utils, Repos)
Generic types keep end‑to‑end safety for any entity `T extends HasId`.

- **UI components**: `GenericPage<T>`, `GenericDetailsPage<T>`, `Table<T>`
- **Hooks**: `useRepoBase<T>`, `useRepoData<T>`, `useRepoItem<T>`
- **Repos**: `Repository<T>`, `RepoFactory.get<T>()`, `makeApiRepository<T>()`
- **Utils**: `sortData<T>`, `formatValue<T>(value: T[keyof T])`

```ts
export type Column<T> = {
  key: keyof T;
  label?: string;
  render?: (row: T) => React.ReactNode;
  isSortable?: boolean;
  sortAccessor?: (row: T) => number | string | boolean | Date;
};

export function GenericPage<T extends HasId>(/* props */) { /* ... */ }
```

---

## 4) Indexed Access Types & `keyof`
Used to bind config to entity fields and to keep `id` types correct.

```ts
type Column<T> = { key: keyof T; /* ... */ };

export interface Repository<T extends HasId> {
  getById(id: T['id']): Promise<T>;
  update(id: T['id'], patch: Partial<T>): Promise<void>;
}
```

---

## 5) Utility Types
- `Partial<T>` in `Repository.update` for PATCH semantics.
- `Pick`/`Omit` patterns are suitable for view models if needed.

```ts
update(id: T['id'], patch: Partial<T>): Promise<void>;
```

---

## 6) Optional Properties
Optional fields are explicit and must be handled safely.

```ts
export interface Painting {
  id: number;
  title: string;
  artist: string;
  year: number;
  style?: string;
  dimensions: Dimensions;
  location?: string;
}
```

---

## 7) Type‑only Imports
Erased at runtime, reduce bundle/cycles.

```ts
import type { Column } from '@/shared/types/table';
import type { Car } from '@/entities';
```

---

## 8) Type Narrowing
Runtime checks are used to normalize heterogeneous values before sorting. This function is used in the sorting frontend feature.

```ts
function normalize(value: unknown): number | string {
  if (value instanceof Date) return value.getTime();
  if (typeof value === 'number') return value;
  if (typeof value === 'boolean') return Number(value);
  if (typeof value === 'string') return value.toLowerCase();
  return String(value ?? '').toLowerCase();
}
```

---

## 9) Type Assertions & Non‑null Assertion
- Casting route param `id` to `T['id']` when the URL provides `string`:
  ```ts
  const { id = '' } = useParams();
  useRepoItem<T>(resource, id as T['id']);
  ```
- Non‑null assertion when reading from cache (paired with logic that ensures presence):
  ```ts
  return this.cache.get(k)! as Repository<T>;
  ```

---

## 10) React Types
Render callbacks are typed against `T` to prevent shape mismatches.

```ts
const columns: Column<Car>[] = [
  { key: 'id', isSortable: true },
  { key: 'brand', isSortable: true },
  { key: 'model', isSortable: true },
  { key: 'year', isSortable: true },
];
```

---

## 11) RepoFactory — TypeScript Features
- **Generics**: `get<T extends HasId>(resource: string): Repository<T>`
- **Constraints**: `T extends HasId` guarantees each entity has an `id`.
- **Indexed access**: repository methods use `T['id']`.
- **Utility types**: `Partial<T>` for updates.
- **Type assertion**: cached repo is returned as `Repository<T>`.

```ts
export class RepoFactory {
  private cache = new Map<string, Repository<any>>();
  // ...
  get<T extends HasId>(resource: string): Repository<T> {
    const k = this.key(resource);
    if (!this.cache.has(k)) {
      this.cache.set(k, makeApiRepository<T>(resource));
    }
    return this.cache.get(k)! as Repository<T>;
  }
}
```
---

## 12) Patterns Used in the Project

### Repository Pattern
- **Where:** `src/core/repo/Repository.ts`, `ApiRepository.ts`  
- **What it solves:** unified CRUD contract for any entity `T`.  
- **TS angle:** `Repository<T>`, `T['id']`, `Partial<T>` keep all calls typed.

### Factory Pattern
- **Where:** `src/core/repo/RepoFactory.ts`  
- **What it solves:** single creation point + caching per `resource`.  
- **TS angle:** `get<T extends HasId>()` returns `Repository<T>` bound to the entity.

### Generic Hooks
- **Where:** `useRepoBase`, `useRepoData`, `useRepoItem`  
- **What it solves:** reusable data lifecycle (load/error/state) for any `T`.  
- **TS angle:** hooks are generic and keep types from repo to UI.

### Generic UI via Configuration
- **Where:** `GenericPage<T>`, `GenericDetailsPage<T>`, `Table<T>`  
- **What it solves:** one table/details for all entities by passing typed configs.  
- **TS angle:** `keyof T` in `Column<T>`/`DetailField<T>` prevents invalid keys.

### Debounced Input Hook
- **Where:** `useDebounced` + `TableSearch` usage in `GenericPage`  
- **What it solves:** avoids extra renders and API calls while typing.  
- **TS angle:** `useDebounced<T>` is generic and preserves the input type.

### Sorting Strategy with Accessors
- **Where:** `utils/sortData.ts`  
- **What it solves:** sort by raw field or computed value (`sortAccessor`).  
- **TS angle:** `Column<T>['sortAccessor']` is strictly typed; `normalize` uses narrowing.

### Barrel Exports
- **Where:** `features/catalog/index.ts`, `core/repo/index.ts`, `entities/index.ts`, `shared/ui/index.ts`  
- **What it solves:** clean imports and encapsulated structure.

---

# End‑to‑End Type Safety (Actual Flow)

```ts
// Page → Generic UI → Hook → Repo → API

// Books page
const columns: Column<Book>[] = [
  { key: 'id', isSortable: true },
  { key: 'title', isSortable: true },
  { key: 'author', isSortable: true },
  { key: 'year', isSortable: true },
];

export default function BooksPage() {
  const navigate = useNavigate();
  return (
    <GenericPage<Book>
      title="Books"
      resource="books"
      columns={columns}
      onRowClick={(b) => navigate(`/books/${b.id}`)}
    />
  );
}

// GenericPage → useRepoData<T>
const { data, loading, error } = useRepoData<T>(resource);

// useRepoData → useRepoBase with repo
export function useRepoData<T extends HasId>(resource: string) {
  const repo = repoFactory.get<T>(resource);
  return useRepoBase(repo);
}

// useRepoBase drives fetching
repo.getAll().then(setData);

// Repository contract
export interface Repository<T extends HasId> {
  getAll(): Promise<T[]>;
  getById(id: T['id']): Promise<T>;
  update(id: T['id'], patch: Partial<T>): Promise<void>;
}
```
