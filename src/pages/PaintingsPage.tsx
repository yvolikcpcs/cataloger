import type { Painting } from '@/entities';
import type { Column } from '@/shared/types/table';
import { GenericPage } from '@/features/catalog';
import { useNavigate } from 'react-router-dom';

const columns: Column<Painting>[] = [
  { key: 'id', isSortable: true },
  { key: 'title', isSortable: true },
  { key: 'artist', isSortable: true },
  { key: 'year', isSortable: true },
  { key: 'style', label: 'Style' },
  {
    key: 'dimensions',
    label: 'Dimensions',
    render: (p) => `${p.dimensions.width}×${p.dimensions.height} cm`,
    isSortable: true,
    sortAccessor: (p) => p.dimensions.width * p.dimensions.height,
  },
  { key: 'location', label: 'Location' },
];

export default function PaintingsPage() {
  const navigate = useNavigate();

  return (
    <GenericPage<Painting>
      title="Paintings"
      resource="paintings"
      columns={columns}
      onRowClick={(c) => navigate(`/paintings/${c.id}`)}
    />
  );
}
