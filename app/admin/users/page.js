import DataTable from '@/components/DataTable';

export default function Users() {
  const headers = ['Name', 'Email'];
  const names = ['user', 'users'];
  return <DataTable headers={headers} names={names} path='users' />;
}
