import type { StorageAdapter } from "./StorageAdapter";
import { LocalStorageAdapter } from "./LocalStorageAdapter";

/**
 * Singleton, делегирующий все операции через StorageAdapter.
 * По умолчанию использует LocalStorageAdapter("cataloger").
 */
export class StorageService {
  private static instance: StorageService | null = null;
  private constructor(private adapter: StorageAdapter) {}

  static getInstance(adapter?: StorageAdapter): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService(
        adapter ?? new LocalStorageAdapter("cataloger")
      );
    }
    return StorageService.instance;
  }

  /** (опционально) Сменить адаптер на лету — удобно в тестах/сторибуке. */
  setAdapter(adapter: StorageAdapter) {
    this.adapter = adapter;
  }

  // --- API через интерфейс ---
  get<T>(key: string, fallback: T): T {
    return this.adapter.get<T>(key, fallback);
  }
  set<T>(key: string, value: T): void {
    this.adapter.set<T>(key, value);
  }
  remove(key: string): void {
    this.adapter.remove(key);
  }

  /** Сброс singleton (полезно для тестов) */
  static reset(adapter?: StorageAdapter) {
    StorageService.instance = new StorageService(
      adapter ?? new LocalStorageAdapter("cataloger")
    );
  }
}
