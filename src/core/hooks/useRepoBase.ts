import { useCallback, useEffect, useState } from 'react';
import type { Repository } from '@/core/repo/Repository';
import type { HasId } from '@/types';

export function useRepoBase<T extends HasId>(repo: Repository<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    repo.getAll().then(setData).catch(setError).finally(() => setLoading(false));
  }, [repo]);

  useEffect(() => { reload(); }, [reload]);

  return { data, loading, error, repo, reload, setData };
}
