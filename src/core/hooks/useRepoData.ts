import { getRepository } from '@/core/repo/repoRegistry';
import { useRepoBase } from './useRepoBase';
import type { HasId } from '@/types';

export function useRepoData<T extends HasId>(resource: string) {
  const repo = getRepository<T>(resource);
  return useRepoBase(repo);
}
