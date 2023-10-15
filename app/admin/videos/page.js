import DataTable from '@/components/DataTable';

export default function Videos() {
  const videos = [];
  for (let i = 0; i < 52; i++) {
    videos.push(
      [
        '/admin/videos/0',
        'Product Introduction #' + (3 * i + 1),
        'https://www.china.com',
        Number(15319).toLocaleString('en-US'),
      ],
      [
        '/admin/videos/1',
        'Call to Action #' + (3 * i + 2),
        'https://www.alibaba.com',
        Number(7215).toLocaleString('en-US'),
      ],
      [
        '/admin/videos/2',
        'Customer Service #' + (3 * i + 3),
        'https://www.lenovo.com',
        Number(3862).toLocaleString('en-US'),
      ],
    );
  }

  const totalItems = videos.length;
  const itemsPerPage = 15;
  const currentPage = 11;
  const items = videos.slice(
    itemsPerPage * (currentPage - 1),
    itemsPerPage * currentPage,
  );
  const totalPages = Math.ceil(videos.length / itemsPerPage);

  return (
    <div className='flex flex-col gap-y-10'>
      <DataTable
        data={{
          headers: ['Title', 'URL', 'Views'],
          totalItems: totalItems,
          items: items,
          itemsPerPage: itemsPerPage,
          totalPages: totalPages,
          currentPage: currentPage,
          names: ['video', 'videos'],
        }}
      />
    </div>
  );
}
