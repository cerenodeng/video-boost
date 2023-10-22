export async function GET(request, { params }) {
  const page = Number(params.page);
  const videos = [];
  let index = 0;
  for (let i = 0; i < 195; i++) {
    videos.push(
      [
        index,
        '/admin/videos/0',
        'Product Introduction #' + (3 * i + 1),
        'https://www.china.com',
        Number(15319).toLocaleString('en-US'),
      ],
      [
        index + 1,
        '/admin/videos/1',
        'Call to Action #' + (3 * i + 2),
        'https://www.alibaba.com',
        Number(7215).toLocaleString('en-US'),
      ],
      [
        index + 2,
        '/admin/videos/2',
        'Customer Service #' + (3 * i + 3),
        'https://www.lenovo.com',
        Number(3862).toLocaleString('en-US'),
      ],
    );
    index += 3;
  }
  const totalItems = videos.length;
  const itemsPerPage = 25;
  const totalPages = Math.ceil(videos.length / itemsPerPage);
  const currentPage = page < 0 ? 1 : page > totalPages ? totalPages : page;
  const partVideos = videos.slice(
    itemsPerPage * (currentPage - 1),
    itemsPerPage * currentPage,
  );

  const items = JSON.stringify(partVideos);
  return Response.json({
    totalItems,
    itemsPerPage,
    totalPages,
    currentPage,
    items,
  });
}
