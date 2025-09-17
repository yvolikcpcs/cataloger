import type { Book } from '@/types';
import type { DetailField } from '../GenericDetailsPage';
import { GenericDetailsPage } from '../GenericDetailsPage';

const fields: DetailField<Book>[] = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Title' },
  { key: 'author', label: 'Author' },
  { key: 'year', label: 'Year' },
];

export default function BookDetailsPage() {
  return (
    <GenericDetailsPage<Book>
      resource="books"
      title="Book details"
      fields={fields}
      backTo="/books"
    />
  );
}
