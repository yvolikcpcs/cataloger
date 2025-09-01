import type { Painting } from '../types';
import type { Column } from '../types/table';
import { paintings } from '../data/paintings';
import { GenericPage } from './GenericPage';

const columns: Column<Painting>[] = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Title' },
  { key: 'artist', label: 'Artist' },
  { key: 'year', label: 'Year' },
  { key: 'style', label: 'Style' },
  {
    key: 'dimensions',
    label: 'Dimensions',
    render: (p) => `${p.dimensions.width}×${p.dimensions.height} cm`,
  },
  { key: 'location', label: 'Location' },
];

export default function PaintingsPage() {
  return <GenericPage<Painting> title="Cars" data={paintings} columns={columns} />;
  ;
}