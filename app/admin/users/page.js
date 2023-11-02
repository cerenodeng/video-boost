import DataTable from '@/components/DataTable';

export default function Users() {
  const headers = ['Name', 'Email'];
  const names = ['name', 'email'];
  return <DataTable headers={headers} names={names} path='users' />;
}
