import { StorageService } from "@/core/storage/StorageService";
import type { DataSeeder } from "@/core/init/DataSeeder";
import type { Repository } from "./Repository";

export class StorageRepository<T extends { id: string | number }> implements Repository<T> {
  constructor(
    private readonly key: string,
    private readonly seeder?: DataSeeder<T>,
    private readonly storage = StorageService.getInstance()
  ) {}

  /** Возвращает данные; при первом вызове засеивает через seeder, если пусто. */
  async getAll(): Promise<T[]> {
    let items = this.storage.get<T[] | null>(this.key, null);
    if (items === null && this.seeder) {
      const seeded = await this.seeder.seed();
      this.storage.set<T[]>(this.key, seeded);
      items = seeded;
    }
    return items ?? [];
  }

  add(item: T): void {
    const list = this.storage.get<T[]>(this.key, []);
    this.storage.set<T[]>(this.key, [...list, item]);
  }

  update(id: T["id"], patch: Partial<T>): void {
    const list = this.storage.get<T[]>(this.key, []);
    const next = list.map(x => (x.id === id ? { ...x, ...patch } : x));
    this.storage.set<T[]>(this.key, next);
  }

  remove(id: T["id"]): void {
    const list = this.storage.get<T[]>(this.key, []);
    this.storage.set<T[]>(this.key, list.filter(x => x.id !== id));
  }
}
