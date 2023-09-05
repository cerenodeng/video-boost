import DataTable from '@/components/DataTable';

export default function Videos() {
  const videos = [
    ['/admin/videos/0', 'Product Introduction', 'https://www.china.com', Number(15319).toLocaleString('en-US')],
    ['/admin/videos/1', 'Call to Action', 'https://www.alibaba.com', Number(7215).toLocaleString('en-US')],
    ['/admin/videos/2', 'Customer Service', 'https://www.lenovo.com', Number(3862).toLocaleString('en-US')],
  ];

  return (
    <div className="flex flex-col gap-y-10">
      <h1>Videos</h1>
      <DataTable data={{ headers: ['Title', 'URL', 'Views'], items: videos }} />
    </div>
  );
}