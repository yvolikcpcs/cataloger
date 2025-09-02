import type { Painting } from '../types';
import type { Column } from '../types/table';
import { paintings as seedPaintings } from '../data/paintings';
import { GenericPage } from './GenericPage';
import { StaticRepoFactory } from '@/core/repo/StaticRepoFactory';
import { useEffect, useState } from 'react';

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

  const repo = StaticRepoFactory.create<Painting>("painting", seedPaintings);
  const [data, setData] = useState<Painting[]>([]);

  useEffect(() => {
    repo.getAll().then(setData);
  }, [repo]);
  return <GenericPage<Painting> title="Cars" data={data} columns={columns} />;
}
