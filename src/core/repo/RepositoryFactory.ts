import { StorageRepository } from "@/core/repo/StorageRepository";
import type { DataSeeder } from "@/core/init/DataSeeder";

export class RemoteRepoFactory {
  static create<T extends { id: string | number }>(
    key: string,
    seeder: DataSeeder<T>
  ) {
    return new StorageRepository<T>(key, seeder);
  }
}
