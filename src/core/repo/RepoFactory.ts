import type { HasId } from '@/types';
import type { Repository } from './Repository';
import { makeApiRepository } from './ApiRepository';

export class RepoFactory {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private cache = new Map<string, Repository<any>>();
  private get envKey() {
    const base = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '');
    return base;
  }

  private key(resource: string) {
    return `${this.envKey}|${resource}`;
  }

  get<T extends HasId>(resource: string): Repository<T> {
    if (!resource) throw new Error('RepoFactory.get: resource is required');
    const k = this.key(resource);
    if (!this.cache.has(k)) {
      this.cache.set(k, makeApiRepository<T>(resource));
    }
    return this.cache.get(k)! as Repository<T>;
  }

  clear() {
    this.cache.clear();
  }
}

export const repoFactory = new RepoFactory();
