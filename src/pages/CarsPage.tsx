import type { Car } from '@/entities';
import type { Column } from '@/shared/types/table';
import { GenericPage } from '@/features/catalog';
import { useNavigate } from 'react-router-dom';

const columns: Column<Car>[] = [
  { key: 'id', isSortable: true },
  { key: 'brand', isSortable: true },
  { key: 'model', isSortable: true },
  { key: 'year', isSortable: true },
  {
    key: 'mileage',
    label: 'Mileage',
    render: (c) => `${c.mileage.toLocaleString()} km`,
    isSortable: true,
  },
  {
    key: 'fuelType',
    label: 'Fuel Type',
    render: (c) => c.fuelType.charAt(0).toUpperCase() + c.fuelType.slice(1),
    isSortable: true,
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
    isSortable: true,
  },
];

export default function CarsPage() {
  const navigate = useNavigate();

  return (
    <GenericPage<Car>
      title="Cars"
      resource="cars"
      columns={columns}
      onRowClick={(c) => navigate(`/cars/${c.id}`)}
    />
  );
}
