import type { FuelType } from './shared';

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: FuelType;
  isUsed: boolean;
}
