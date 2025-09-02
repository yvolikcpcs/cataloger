import { StorageRepository } from "@/core/repo/StorageRepository";
import { StaticSeeder } from "@/core/init/StaticSeeder";

export class StaticRepoFactory {
  /** key — ключ в storage; seed — массив из файла */
  static create<T extends { id: string | number }>(key: string, seed: T[]) {
    return new StorageRepository<T>(key, new StaticSeeder<T>(seed));
  }
}
