import type { User } from '@/types';
import type { Column } from '../types/table';
import { GenericPage } from './GenericPage';
import { useEffect, useState } from 'react';
import { RemoteRepoFactory } from '@/core/repo/RemoteRepoFactory';
import { formatAddress } from '@/utils/address';

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
  const [data, setData] = useState<User[]>([]);
  
  const repo = RemoteRepoFactory.create<User>(
    "https://jsonplaceholder.typicode.com/users"
  );

  useEffect(() => {
    repo.getAll().then(setData);
  }, []);

  return <GenericPage<User> title="Cars" data={data} columns={columns} />;
}
