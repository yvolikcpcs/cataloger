
import { useMemo } from 'react';
import { RemoteRepoFactory } from '@/core/repo/RemoteRepoFactory';
import { useRepoBase } from './useRepoBase';
import type { HasId } from '@/types';

export function useRemoteRepoData<T extends HasId>(url: string, path?: string) {
  const repo = useMemo(() => RemoteRepoFactory.create<T>(url, path), [url, path]);
  return useRepoBase(repo);
}
