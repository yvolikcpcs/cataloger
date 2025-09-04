import type { Repository } from "./Repository";

export class RemoteRepository<T extends { id: string | number }>
  implements Repository<T>
{
  constructor(private readonly url: string, private readonly path?: string) {}

  async getAll(): Promise<T[]> {
    const res = await fetch(this.url);
    if (!res.ok) {
      throw new Error(`RemoteRepository: fetch failed with ${res.status}`);
    }

    const json = await res.json();
    const data = this.path ? json[this.path] : json;
    console.log('data', data);
    if (!Array.isArray(data)) {
      throw new Error("RemoteRepository: fetched data is not an array");
    }

    return data as T[];
  }

  async add(item: T): Promise<void> {
    await fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
  }

  async update(id: T["id"], patch: Partial<T>): Promise<void> {
    await fetch(`${this.url}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
  }

  async remove(id: T["id"]): Promise<void> {
    await fetch(`${this.url}/${id}`, { method: "DELETE" });
  }
}
