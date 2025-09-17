import type { HasId } from '@/types';
import type { Repository } from './Repository';

export function makeApiRepository<T extends HasId>(
  resource: string,
): Repository<T> {
  if (!resource) throw new Error('ApiRepository: resource is required');
  const baseUrl = import.meta.env.VITE_API_URL;
  if (!baseUrl) throw new Error('ApiRepository: base url is missing');

  const base = baseUrl.replace(/\/+$/, '');
  const root = `${base}/${resource}`;

  async function request(input: RequestInfo, init?: RequestInit) {
    const res = await fetch(input, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error(`API ${res.status} ${res.statusText}`);

    return res;
  }

  return {
    async getAll() {
      const r = await request(root);
      return (await r.json()) as T[];
    },
    async getById(id) {
      const r = await request(`${root}/${id}`);
      return (await r.json()) as T;
    },
    async add(item) {
      await request(root, { method: 'POST', body: JSON.stringify(item) });
    },
    async update(id, patch) {
      await request(`${root}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
      });
    },
    async remove(id) {
      await request(`${root}/${id}`, { method: 'DELETE' });
    },
  };
}
