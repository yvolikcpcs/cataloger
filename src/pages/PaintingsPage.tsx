import type { Painting } from '@/types';
import type { Column } from '@/types/table';
import { paintings as seedPaintings } from '@/data/paintings';
import { GenericPage } from './GenericPage';
import { useStaticRepoData } from '@/core/hooks/useStaticRepoData';

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
  const { data } = useStaticRepoData<Painting>('paintings', seedPaintings);
  return <GenericPage<Painting> title="Paintings" data={data} columns={columns} />;
}
