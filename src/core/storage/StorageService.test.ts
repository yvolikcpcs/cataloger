import { describe, it, expect, beforeEach } from "vitest";
import { StorageService } from "./StorageService";
import { MemoryAdapter } from "../storage/MemoryAdapter";

describe("StorageService with MemoryAdapter", () => {
  beforeEach(() => {
    StorageService.reset(new MemoryAdapter("test"));
  });

  it("saves and reads values", () => {
    const svc = StorageService.getInstance();
    svc.set("books", [{ id: 1, title: "Clean Code" }]);

    const books = svc.get<{ id: number; title: string }[]>("books", []);
    expect(books.length).toBe(1);
    expect(books[0].title).toBe("Clean Code");
  });

  it("returns fallback if key missing", () => {
    const svc = StorageService.getInstance();
    const cars = svc.get("cars", [{ id: 0, brand: "fallback" }]);
    expect(cars).toEqual([{ id: 0, brand: "fallback" }]);
  });

  it("removes key", () => {
    const svc = StorageService.getInstance();
    svc.set("x", { a: 1 });
    svc.remove("x");
    expect(svc.get("x", null)).toBeNull();
  });
});
