'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AddIcon } from './Icon';

export default function Sidebar({ title, menus, user }) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex flex-col w-64 h-screen bg-neutral-900 shadow-2xl shadow-neutral-900/50">
      <Link href={title.url} className="px-8 py-10 text-lg font-medium text-neutral-500">{title.name}</Link>
      <nav className="flex flex-col grow gap-y-px">
        {menus.map((menu) => (
          <Link
            href={menu.url}
            className={`${pathname == menu.url ?
              "text-neutral-700 bg-neutral-200" :
              "text-neutral-50 bg-neutral-900 hover:text-neutral-200 hover:bg-neutral-700"} 
              relative flex gap-x-3 px-8 py-5 text-lg font-semibold items-center`
            }
            key={menu.id}
          >
            {menu.icon}
            <div>{menu.name}</div>
            {pathname == menu.url && menu.add &&
              <button className="absolute inset-y-0 -right-4 z-10" onClick={() => location = `${menu.url}/add`}>
                <AddIcon />
              </button>
            }
          </Link>
        ))}
      </nav>
      <div className="flex py-5 gap-x-3 place-self-center items-center cursor-pointer">
        <div className="relative w-12 h-12">
          <Image
            src={user.avatar}
            alt={user.name}
            sizes="1vw"
            fill={true}
            className="rounded-full"
          />
        </div>
        <div className="text-base font-medium text-neutral-100">{user.name}</div>
      </div>
    </aside >
  );
}