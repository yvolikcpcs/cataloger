import type { User } from '@/entities';
import type { Column } from '@/shared/types/table';
import { GenericPage } from '@/features/catalog';
import { formatAddress } from '@/utils/address';
import { useNavigate } from 'react-router-dom';

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
  },
];

export default function UsersPage() {
  const navigate = useNavigate();

  return (
    <GenericPage<User>
      title="Users"
      resource="users"
      columns={columns}
      onRowClick={(c) => navigate(`/users/${c.id}`)}
    />
  );
}
