import type { Painting } from '@/entities';
import type { DetailField } from '@/features/catalog';
import { GenericDetailsPage } from '@/features/catalog';

const fields: DetailField<Painting>[] = [
  { key: 'id' },
  { key: 'title' },
  { key: 'artist' },
  { key: 'year' },
  { key: 'style', label: 'Style' },
  {
    key: 'dimensions',
    label: 'Dimensions',
    render: (p) => `${p.dimensions.width}×${p.dimensions.height} cm`,
  },
  { key: 'location', label: 'Location' },
];

export default function PaintingsDetailsPage() {
  return (
    <GenericDetailsPage<Painting>
      resource="paintings"
      title="Painting details"
      fields={fields}
      backTo="/paintings"
    />
  );
}
