# TypeScript Features Used in Cataloger

A concise list of the TS features that keep the project type-safe and maintainable.

## Generics with Constraints

* **Where:** `GenericPage<T>`, `GenericDetailsPage<T>`, `Table<T>`, `Repository<T>`.
* **Why:** Reuse UI/data logic across different entities with type safety.

## `keyof` and Indexed Access Types

* **Where:** `Column<T>`, `DetailField<T>`, `T['id']`.
* **Why:** Compile-time safety for field names and id usage.

## Utility Types

* **`Partial<T>`** — safe partial updates.
* **`Pick`/`Omit`** — derive subsets for list/detail views.

## String Literal Unions

* **Where:** `FuelType = 'gasoline' | 'diesel' | 'electric' | 'hybrid'`.
* **Why:** Eliminates magic strings.

## Optional Properties

* **Where:** `Painting.style?`, `Painting.location?`.
* **Why:** Model real-world optional data.

## Type-Only Imports

* **Where:** `import type { Column } from '@/shared/types/table'`.
* **Why:** Clear intent and smaller runtime bundle.

## Repository Factory

```ts
// src/core/repo/RepoFactory.ts (fragment)
get<T extends HasId>(resource: string): Repository<T> {
  if (!resource) throw new Error('RepoFactory.get: resource is required');
  const k = this.key(resource);
  if (!this.cache.has(k)) this.cache.set(k, makeApiRepository<T>(resource));
  return this.cache.get(k)! as Repository<T>;
}
```

* Provides one typed repository per resource.
* Uses `T['id']` and `Partial<T>` for safe calls.

## Normalization Helper

```ts
// src/utils/sortData.ts
function normalize(value: unknown): number | string {
  if (value instanceof Date) return value.getTime();
  if (typeof value === 'number') return value;
  if (typeof value === 'boolean') return Number(value);
  if (typeof value === 'string') return value.toLowerCase();
  return String(value ?? '').toLowerCase();
}
```

Keeps sorting logic generic and type-friendly.