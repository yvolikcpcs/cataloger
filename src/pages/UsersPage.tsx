import type { User } from '@/types';
import type { Column } from '@/types/table';
import { GenericPage } from './GenericPage';
import { formatAddress } from '@/utils/address';
import { useRemoteRepoData } from '@/core/hooks/useRemoteRepoData';

const columns: Column<User>[] = [
  { key: 'id', isSortable: true },
  { key: 'name', isSortable: true },
  { key: 'username', label: 'User name', isSortable: true },
  { key: 'email', label: 'e-mail', isSortable: true },
  { key: 'phone' },
  { key: 'website' },
  {
    key: 'address',
    render: (user) => formatAddress(user.address),
  }
];

export default function UsersPage() {
  const { data, loading, error, reload } = useRemoteRepoData<User>('https://jsonplaceholder.typicode.com/users');
  return <GenericPage<User> title="Users" data={data} columns={columns} loading={loading} error={error ?? undefined} onRetry={reload}/>;
}
