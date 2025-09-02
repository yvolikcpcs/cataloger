import type { DataSeeder } from "./DataSeeder";

export class StaticSeeder<T> implements DataSeeder<T> {
  constructor(private readonly data: T[]) {}
  seed(): T[] {
    return this.data;
  }
}
