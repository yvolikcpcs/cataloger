import { repoFactory } from '@/core/repo/RepoFactory';
import { useRepoBase } from './useRepoBase';
import type { HasId } from '@/shared/types';

export function useRepoData<T extends HasId>(resource: string) {
  const repo = repoFactory.get<T>(resource);
  return useRepoBase(repo);
}
