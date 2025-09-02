import type { DataSeeder } from "./DataSeeder";

export class RemoteSeeder<T> implements DataSeeder<T> {
  constructor(private readonly url: string, private readonly path: string = "") {}

  async seed(): Promise<T[]> {
    const res = await fetch(this.url);
    if (!res.ok) {
      throw new Error(`RemoteSeeder: fetch failed with ${res.status}`);
    }
    const json = await res.json();
    console.log('json', json)
    const data = this.path ? json[this.path] : json;
    if (!Array.isArray(data)) {
      throw new Error("RemoteSeeder: fetched data is not an array");
    }
    return data as T[];
  }
}
