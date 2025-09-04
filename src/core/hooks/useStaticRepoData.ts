import { useMemo } from 'react';
import { StaticRepoFactory } from '@/core/repo/StaticRepoFactory';
import { useRepoBase } from './useRepoBase';
import type { HasId } from '@/types';

export function useStaticRepoData<T extends HasId>(key: string, seed: T[]) {
  const repo = useMemo(() => StaticRepoFactory.create<T>(key, seed), [key, seed]);
  return useRepoBase(repo);
}