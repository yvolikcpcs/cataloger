import type { Book } from '../types';
import type { Column } from '../types/table';
import { books } from '../data/books';
import { GenericPage } from './GenericPage';

const columns: Column<Book>[] = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Title' },
  { key: 'author', label: 'Author' },
  { key: 'year', label: 'Year' },
];

export default function BooksPage() {
    return <GenericPage<Book> title="Cars" data={books} columns={columns} />;
  
}