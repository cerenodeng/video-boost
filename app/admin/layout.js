import Sidebar from '@/components/Sidebar';

export default function AdminLayout({ children }) {
  const title = {
    name: 'Video Boost',
    url: '/admin',
  };
  const menus = [
    { id: 1, name: 'Videos', url: '/admin/videos' },
    { id: 2, name: 'Settings', url: '/admin/settings' },
  ];
  const user = {
    avatar: '/demo-avatar.jpg',
    name: 'Cereno Deng',
  };

  return (
    <div className="flex">
      <Sidebar title={title} menus={menus} user={user} />
      {children}
    </div>
  );
}