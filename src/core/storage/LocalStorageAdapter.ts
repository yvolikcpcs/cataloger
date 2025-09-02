import type { StorageAdapter } from "./StorageAdapter";

export class LocalStorageAdapter implements StorageAdapter {
  constructor(private readonly prefix = "") {}

  private k(key: string) {
    return this.prefix ? `${this.prefix}:${key}` : key;
  }

  get<T>(key: string, fallback: T): T {
    const raw = localStorage.getItem(this.k(key));
    return raw ? (JSON.parse(raw) as T) : fallback;
  }

  set<T>(key: string, value: T): void {
    localStorage.setItem(this.k(key), JSON.stringify(value));
  }

  remove(key: string): void {
    localStorage.removeItem(this.k(key));
  }
}
