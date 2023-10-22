export async function GET() {
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

  const items = JSON.stringify(videos);
  return Response.json({ items });
}
