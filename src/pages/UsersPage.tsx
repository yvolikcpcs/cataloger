import type { User } from '@/types';
import type { Column } from '@/types/table';
import { GenericPage } from './GenericPage';
import { formatAddress } from '@/utils/address';

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
  return <GenericPage<User> title="Users" resource="users" columns={columns} />;
}
