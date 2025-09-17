import { StorageService } from "@/core/storage/StorageService";
import type { DataSeeder } from "@/core/init/DataSeeder";
import type { Repository } from "./Repository";

export class StorageRepository<T extends { id: string | number }> implements Repository<T> {
  constructor(
    private readonly key: string,
    private readonly seeder?: DataSeeder<T>,
    private readonly storage = StorageService.getInstance()
  ) {}

  async getAll(): Promise<T[]> {
    let items = this.storage.get<T[] | null>(this.key, null);
    if (items === null && this.seeder) {
      const seeded = await this.seeder.seed();
      this.storage.set<T[]>(this.key, seeded);
      items = seeded;
    }
    return items ?? [];
  }

  async add(item: T): Promise<void> {
    const list = this.storage.get<T[]>(this.key, []);
    this.storage.set<T[]>(this.key, [...list, item]);
  }

  async update(id: T["id"], patch: Partial<T>): Promise<void> {
    const list = this.storage.get<T[]>(this.key, []);
    const next = list.map(x => (x.id === id ? { ...x, ...patch } : x));
    this.storage.set<T[]>(this.key, next);
  }

  async remove(id: T["id"]): Promise<void> {
    const list = this.storage.get<T[]>(this.key, []);
    this.storage.set<T[]>(this.key, list.filter(x => x.id !== id));
  }
}
