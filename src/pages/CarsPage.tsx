import type { Car } from '@/types';
import type { Column } from '@/types/table';
import { GenericPage } from './GenericPage';
import { cars as seedCars } from "@/data/cars";
import { useStaticRepoData } from '@/core/hooks/useStaticRepoData';

const columns: Column<Car>[] = [
  { key: 'id', isSortable: true },
  { key: 'brand', isSortable: true },
  { key: 'model', isSortable: true },
  { key: 'year', isSortable: true },
  {
    key: 'mileage',
    label: 'Mileage',
    render: (c) => `${c.mileage.toLocaleString()} km`,
    isSortable: true
  },
  {
    key: 'fuelType',
    label: 'Fuel Type',
    render: (c) => c.fuelType.charAt(0).toUpperCase() + c.fuelType.slice(1),
    isSortable: true
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
    isSortable: true
  },
];


export default function CarsPage() {
  const { data } = useStaticRepoData<Car>('cars', seedCars);
  return <GenericPage<Car> title="Cars" data={data} columns={columns} />;
}