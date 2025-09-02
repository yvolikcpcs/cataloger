import { StorageRepository } from "@/core/repo/StorageRepository";
import { RemoteSeeder } from "@/core/init/RemoteSeeder";

export class RemoteRepoFactory {
  static create<T extends { id: string | number }>(
    key: string,
    url: string,
    path?: string
  ) {
    return new StorageRepository<T>(key, new RemoteSeeder<T>(url, path));
  }
}
