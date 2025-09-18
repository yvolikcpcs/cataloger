import { Link, useParams } from 'react-router-dom';
import type { HasId } from '@/shared/types';
import { useRepoItem } from '@/features/catalog/hooks/useRepoItem';
import { Spinner } from '@/shared/ui/Spinner';
import { ErrorAlert } from '@/shared/ui/ErrorAlert';

export type DetailField<T> = {
  key: keyof T;
  label?: string;
  render?: (item: T) => React.ReactNode;
};

type GenericDetailsPageProps<T extends HasId> = {
  resource: string;
  title: string;
  fields: DetailField<T>[];
  backTo: string;
};

export function GenericDetailsPage<T extends HasId>({
  resource,
  title,
  fields,
  backTo,
}: GenericDetailsPageProps<T>) {
  const { id = '' } = useParams();
  const { item, loading, error, reload } = useRepoItem<T>(
    resource,
    id as T['id'],
  );

  if (loading) return <Spinner label="Loading…" />;
  if (error) return <ErrorAlert message={error.message} onRetry={reload} />;
  if (!item) return <ErrorAlert message="Item not found" />;

  const formatValue = (value: T[keyof T]): string => {
    if (Array.isArray(value)) return value.join(', ');
    return String(value ?? '—');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <Link to={backTo} className="text-sm text-indigo-600 hover:underline">
          ← Back
        </Link>
      </div>

      <div className="bg-white rounded-xl ring-1 ring-gray-200 p-4 md:p-6">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {fields.map((f) => {
            const label = f.label ?? String(f.key);
            const content = f.render
              ? f.render(item)
              : formatValue(item[f.key]);

            return (
              <div
                key={String(f.key)}
                className="border-b border-gray-100 pb-3"
              >
                <dt className="text-xs uppercase tracking-wide text-gray-500">
                  {label}
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{content}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}
