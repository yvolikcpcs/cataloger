import type { User } from '@/types';
import type { Column } from '../types/table';
import { GenericPage } from './GenericPage';
import { useEffect, useState } from 'react';
import { RemoteRepoFactory } from '@/core/repo/RemoteRepoFactory';

const columns: Column<User>[] = [
  { key: 'id', label: 'ID' },
  { key: 'firstName', label: 'First name' },
  { key: 'lastName', label: 'Last name' },
  { key: 'age'},
  { key: 'maidenName'},
  { key: 'age' },
  { key: 'gender' },
  { key: 'email', label: 'e-mail' },
  { key: 'phone' },
  { key: 'birthDate', label: 'Date of birth' },

];

export default function UsersPage() {
  const [data, setData] = useState<User[]>([]);
  
  const repo = RemoteRepoFactory.create<User>(
    'users',
    'https://dummyjson.com/users',
    'users'
  );

  useEffect(() => {
    repo.getAll().then(setData);
  }, [repo]);

  return <GenericPage<User> title="Cars" data={data} columns={columns} />;
}
