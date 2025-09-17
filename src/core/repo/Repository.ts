import type { HasId } from '@/types';

export interface Repository<T extends HasId> {
  getAll(): Promise<T[]>;
  getById(id: T['id']): Promise<T>;
  add(item: T): Promise<void>;
  update(id: T['id'], patch: Partial<T>): Promise<void>;
  remove(id: T['id']): Promise<void>;
}
