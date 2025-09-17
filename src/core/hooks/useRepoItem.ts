import { useCallback, useEffect, useState } from 'react';
import type { HasId } from '@/types';
import type { Repository } from '@/core/repo/Repository';
import { repoFactory } from '@/core/repo/RepoFactory';

export function useRepoItem<T extends HasId>(resource: string, id: T['id']) {
  const repo: Repository<T> = repoFactory.get<T>(resource);

  const [item, setItem] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    repo
      .getById(id)
      .then(setItem)
      .catch((e) => setError(e instanceof Error ? e : new Error(String(e))))
      .finally(() => setLoading(false));
  }, [repo, id]);

  const save = useCallback(
    async (patch: Partial<T>) => {
      setSaving(true);
      setError(null);
      try {
        await repo.update(id, patch);
        const fresh = await repo.getById(id);
        setItem(fresh);
        return fresh;
      } catch (e) {
        const err = e instanceof Error ? e : new Error(String(e));
        setError(err);
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [repo, id],
  );

  useEffect(() => {
    reload();
  }, [reload]);

  return { item, setItem, loading, saving, error, reload, save };
}
