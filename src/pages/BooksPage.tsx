import type { Book } from '@/types';
import type { Column } from '@/types/table';
import { GenericPage } from './GenericPage';

const columns: Column<Book>[] = [
  { key: 'id', isSortable: true },
  { key: 'title', isSortable: true },
  { key: 'author', isSortable: true },
  { key: 'year', isSortable: true },
];

export default function BooksPage() {
  return <GenericPage<Book> title="Books" resource="books" columns={columns} />;
}
