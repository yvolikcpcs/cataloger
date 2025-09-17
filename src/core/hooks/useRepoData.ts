import { useMemo } from "react";
import { makeApiRepository } from "@/core/repo/ApiRepository";
import { useRepoBase } from "./useRepoBase";
import type { HasId } from "@/types";

export function useRepoData<T extends HasId>(resource: string) {
  const repo = useMemo(() => makeApiRepository<T>(resource), [resource]);
  return useRepoBase(repo);
}
