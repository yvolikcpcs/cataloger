export interface DataSeeder<T> {
  seed(): Promise<T[]> | T[];
}
