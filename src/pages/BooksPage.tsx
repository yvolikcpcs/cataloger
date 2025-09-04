// ./src/pages/BooksPage.tsx
import type { Book } from '@/types';
import type { Column } from '@/types/table';
import { books as seedBooks} from '@/data/books';
import { GenericPage } from './GenericPage';
import { useStaticRepoData } from '@/core/hooks/useStaticRepoData';

const columns: Column<Book>[] = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Title' },
  { key: 'author', label: 'Author' },
  { key: 'year', label: 'Year' },
];

export default function BooksPage() {
  const { data /*, loading, error*/ } = useStaticRepoData<Book>('books', seedBooks);
  return <GenericPage<Book> title="Books" data={data} columns={columns} />;
}
