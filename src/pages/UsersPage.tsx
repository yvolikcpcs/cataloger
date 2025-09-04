import type { User } from '@/types';
import type { Column } from '@/types/table';
import { GenericPage } from './GenericPage';
import { formatAddress } from '@/utils/address';
import { useRemoteRepoData } from '@/core/hooks/useRemoteRepoData';

const columns: Column<User>[] = [
  { key: 'id' },
  { key: 'name' },
  { key: 'username', label: 'User name' },
  { key: 'email', label: 'e-mail' },
  { key: 'phone' },
  { key: 'website' },
  {
    key: 'address',
    render: (user) => formatAddress(user.address),
  }
];

export default function UsersPage() {
  const { data } = useRemoteRepoData<User>('https://jsonplaceholder.typicode.com/users');
  return <GenericPage<User> title="Users" data={data} columns={columns} />;
}
