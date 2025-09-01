import type { Dimensions } from "./shared";

export interface Painting {
  id: number;
  title: string;
  artist: string;
  year: number;
  style?: string;
  dimensions: Dimensions;
  location?: string;
}