import { StaticRepoFactory } from '@/core/repo/StaticRepoFactory';
import type { Car } from '../types';
import type { Column } from '../types/table';
import { GenericPage } from './GenericPage';
import { useEffect, useState } from 'react';
import { cars as seedCars } from "@/data/cars";

const columns: Column<Car>[] = [
  { key: 'id', label: 'ID' },
  { key: 'brand', label: 'Brand' },
  { key: 'model', label: 'Model' },
  { key: 'year', label: 'Year' },
  {
    key: 'mileage',
    label: 'Mileage',
    render: (c) => `${c.mileage.toLocaleString()} km`,
  },
  {
    key: 'fuelType',
    label: 'Fuel Type',
    render: (c) => c.fuelType.charAt(0).toUpperCase() + c.fuelType.slice(1),
  },
  {
    key: 'isUsed',
    label: 'Condition',
    render: (c) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          c.isUsed ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
        }`}
      >
        {c.isUsed ? 'Used' : 'New'}
      </span>
    ),
  },
];


export default function CarsPage() {
  const repo = StaticRepoFactory.create<Car>("cars", seedCars);
  const [data, setData] = useState<Car[]>([]);

  useEffect(() => {
    repo.getAll().then(setData);
  }, [repo]);
  return <GenericPage<Car> title="Cars" data={data} columns={columns} />;
}
