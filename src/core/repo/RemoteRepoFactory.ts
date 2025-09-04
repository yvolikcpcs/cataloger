import { RemoteRepository } from "./RemoteRepository";

export class RemoteRepoFactory {
  static create<T extends { id: string | number }>(url: string, path?: string) {
    return new RemoteRepository<T>(url, path);
  }
}
