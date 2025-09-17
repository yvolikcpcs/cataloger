import type { Painting } from '@/types';
import type { DetailField } from '../GenericDetailsPage';
import { GenericDetailsPage } from '../GenericDetailsPage';

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

export default function UserDetailsPage() {
  return (
    <GenericDetailsPage<Painting>
      resource="paintings"
      title="Painting details"
      fields={fields}
      backTo="/paintings"
    />
  );
}
