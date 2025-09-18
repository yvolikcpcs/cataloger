import type { FuelType } from '@/shared/types';

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: FuelType;
  isUsed: boolean;
}
