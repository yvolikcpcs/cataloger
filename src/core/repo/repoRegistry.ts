import type { HasId } from '@/types';
import type { Repository } from './Repository';
import { makeApiRepository } from './ApiRepository';

function keyOf(resource: string, baseUrl = import.meta.env.VITE_API_URL ?? '') {
  return `${baseUrl.replace(/\/+$/, '')}|${resource}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const registry = new Map<string, Repository<any>>();

export function getRepository<T extends HasId>(
  resource: string,
): Repository<T> {
  const key = keyOf(resource);
  let repo = registry.get(key);
  if (!repo) {
    repo = makeApiRepository<T>(resource);
    registry.set(key, repo);
  }
  return repo as Repository<T>;
}

export function clearRepositoryRegistry() {
  registry.clear();
}
