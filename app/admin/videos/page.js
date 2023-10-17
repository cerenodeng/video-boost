import DataTable from '@/components/DataTable';

export default function Videos() {
  const tempCurrnetPage = 23;
  const videos = [];
  for (let i = 0; i < 195; i++) {
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
  const itemsPerPage = 25;
  const totalPages = Math.ceil(videos.length / itemsPerPage);
  const currentPage =
    tempCurrnetPage < 0
      ? 1
      : tempCurrnetPage > totalPages
      ? totalPages
      : tempCurrnetPage;
  const items = videos.slice(
    itemsPerPage * (currentPage - 1),
    itemsPerPage * currentPage,
  );

  return (
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
  );
}
