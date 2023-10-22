import DataTable from '@/components/DataTable';

export default function Videos() {
  const headers = ['Title', 'URL', 'Views'];
  const names = ['video', 'videos'];
  return <DataTable headers={headers} names={names} />;
}
