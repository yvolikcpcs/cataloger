// src/core/repo/Repository.ts
export interface Repository<T extends { id: string | number }> {
  getAll(): Promise<T[]>;
  add(item: T): Promise<void>;
  update(id: T["id"], patch: Partial<T>): Promise<void>;
  remove(id: T["id"]): Promise<void>;
}
