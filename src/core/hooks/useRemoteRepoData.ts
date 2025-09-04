import { useEffect, useMemo, useState } from 'react';
import { RemoteRepoFactory } from '@/core/repo/RemoteRepoFactory';
import type { Repository } from '@/core/repo/Repository';
import type { HasId } from '@/types';

export function useRemoteRepoData<T extends HasId>(url: string, path?: string) {
  const repo: Repository<T> = useMemo(
    () => RemoteRepoFactory.create<T>(url, path),
    [url, path]
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
