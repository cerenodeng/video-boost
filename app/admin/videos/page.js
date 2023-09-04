export default function Videos() {
  const videos = [
    { id: 0, title: 'Product Introduction', url: 'https://www.china.com', views: 1530 },
    { id: 1, title: 'Call to Action', url: 'https://www.alibaba.com', views: 7215 },
    { id: 2, title: 'Customer Service', url: 'https://www.lenovo.com', views: 3862 },
  ];

  return (
    <div className="flex flex-col gap-y-10">
      <h1>Videos</h1>
      <table className="table-fixed divide-y border-b">
        <thead>
          <tr className="divide-x">
            <th>Title</th>
            <th>URL</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {videos.map((video) => (
            <tr key={video.id} className="divide-x">
              <td>{video.title}</td>
              <td>{video.url}</td>
              <td>{video.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}