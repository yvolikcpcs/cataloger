// src/core/repo/Repository.ts
export interface Repository<T extends { id: string | number }> {
  getAll(): Promise<T[]>;
  add(item: T): void;
  update(id: T["id"], patch: Partial<T>): void;
  remove(id: T["id"]): void;
}
