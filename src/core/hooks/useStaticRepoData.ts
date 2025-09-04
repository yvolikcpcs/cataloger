import { useEffect, useMemo, useState } from 'react';
import { StaticRepoFactory } from '@/core/repo/StaticRepoFactory';
import type { Repository } from '@/core/repo/Repository';
import type { HasId } from '@/types';

export function useStaticRepoData<T extends HasId>(key: string, seed: T[]) {
  const repo: Repository<T> = useMemo(
    () => StaticRepoFactory.create<T>(key, seed),
    [key, seed]
  );

  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const reload = () => {
    setLoading(true);
    setError(null);
    repo.getAll()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  };

  useEffect(reload, [repo]);

  return { data, loading, error, repo, reload, setData };
}
