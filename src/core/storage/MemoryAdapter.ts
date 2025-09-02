import type { StorageAdapter } from "./StorageAdapter";

export class MemoryAdapter implements StorageAdapter {
  private map = new Map<string, string>();
  constructor(private readonly prefix = "") {}

  private k(key: string) {
    return this.prefix ? `${this.prefix}:${key}` : key;
  }

  get<T>(key: string, fallback: T): T {
    const raw = this.map.get(this.k(key));
    return raw ? (JSON.parse(raw) as T) : fallback;
  }

  set<T>(key: string, value: T): void {
    this.map.set(this.k(key), JSON.stringify(value));
  }

  remove(key: string): void {
    this.map.delete(this.k(key));
  }
}
