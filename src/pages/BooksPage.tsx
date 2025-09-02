import type { Book } from '../types';
import type { Column } from '../types/table';
import { books as seedBooks} from '../data/books';
import { GenericPage } from './GenericPage';
import { StaticRepoFactory } from '@/core/repo/StaticRepoFactory';
import { useEffect, useState } from 'react';

const columns: Column<Book>[] = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Title' },
  { key: 'author', label: 'Author' },
  { key: 'year', label: 'Year' },
];

export default function BooksPage() {
  const repo = StaticRepoFactory.create<Book>("books", seedBooks);
  const [data, setData] = useState<Book[]>([]);

  useEffect(() => {
    repo.getAll().then(setData);
  }, [repo]);
  return <GenericPage<Book> title="Books" data={data} columns={columns} />;
  
}