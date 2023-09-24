import { SettingIcon, VideoIcon } from '@/components/Icon';
import Sidebar from '@/components/Sidebar';

export default function AdminLayout({ children }) {
  const title = {
    name: 'Video Boost',
    url: '/admin',
  };
  const menus = [
    {
      id: 1,
      name: 'Videos',
      url: '/admin/videos',
      icon: <VideoIcon />,
      add: true,
    },
    {
      id: 2,
      name: 'Settings',
      url: '/admin/settings',
      icon: <SettingIcon />,
      add: false,
    },
  ];
  const user = {
    avatar: '/demo-avatar.jpg',
    name: 'Cereno Deng',
  };

  return (
    <div className='flex'>
      <Sidebar title={title} menus={menus} user={user} />
      <div className='w-full'>{children}</div>
    </div>
  );
}
