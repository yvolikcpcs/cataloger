import type { User } from '@/entities';
import type { DetailField } from '@/features/catalog';
import { GenericDetailsPage } from '@/features/catalog';
import { formatAddress } from '@/utils/address';

const fields: DetailField<User>[] = [
  { key: 'id' },
  { key: 'name' },
  { key: 'username', label: 'User name' },
  { key: 'email', label: 'e-mail' },
  { key: 'phone' },
  { key: 'website' },
  {
    key: 'address',
    render: (user) => formatAddress(user.address),
  },
];

export default function UserDetailsPage() {
  return (
    <GenericDetailsPage<User>
      resource="users"
      title="User details"
      fields={fields}
      backTo="/users"
    />
  );
}
