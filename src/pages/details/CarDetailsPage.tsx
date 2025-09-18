import type { Car } from '@/entities';
import type { DetailField } from '@/features/catalog';
import { GenericDetailsPage } from '@/features/catalog';

const fields: DetailField<Car>[] = [
  { key: 'id' },
  { key: 'brand' },
  { key: 'model' },
  { key: 'year' },
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
          c.isUsed
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-green-100 text-green-800'
        }`}
      >
        {c.isUsed ? 'Used' : 'New'}
      </span>
    ),
  },
];

export default function CarDetailsPage() {
  return (
    <GenericDetailsPage<Car>
      resource="cars"
      title="Car details"
      fields={fields}
      backTo="/cars"
    />
  );
}
