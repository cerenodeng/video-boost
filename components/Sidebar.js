'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AddIcon } from './Icon';

export default function Sidebar({ title, menus, user }) {
  const [open, setOpen] = useState();
  const [hide, setHide] = useState(true);
  const pathname = usePathname();
  console.log(typeof window != 'undefined');
  useEffect(() => {
    const sidebarState = window.localStorage.getItem('sidebarState');
    console.log(new Date(), sidebarState);
    if (sidebarState == null || sidebarState == 'open') {
      setOpen(true);
    } else if (sidebarState == 'close') {
      setOpen(false);
    }
  }, []);
  useEffect(() => {
    if (open != null) {
      setHide(false);
    }
    const openState =
      open ?? window.localStorage.getItem('sidebarState') == 'open';
    console.log(
      new Date(),
      window.localStorage.getItem('sidebarState'),
      open,
      openState,
    );
    if (openState) {
      window.localStorage.setItem('sidebarState', 'open');
    } else {
      window.localStorage.setItem('sidebarState', 'close');
    }
  }, [open]);

  return (
    !hide && (
      <aside
        className={`${
          open ? 'w-64' : 'w-fit'
        } sticky top-0 flex h-screen flex-col bg-neutral-900 shadow-2xl shadow-neutral-900/50`}
      >
        <div className='flex items-center gap-x-3 px-8 py-10'>
          <button className='flex items-center'>
            <svg
              className='h-6 w-6 text-neutral-500'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 17 14'
              onClick={() => setOpen(!open)}
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M1 1h15M1 7h15M1 13h15'
              />
            </svg>
          </button>
          {open && (
            <Link
              href={title.url}
              className='text-lg font-medium text-neutral-500'
            >
              {title.name}
            </Link>
          )}
        </div>
        <nav className='flex grow flex-col gap-y-px'>
          {menus.map((menu) => (
            <Link
              href={menu.url}
              className={`${
                pathname == menu.url
                  ? 'bg-neutral-200 text-neutral-700'
                  : 'bg-neutral-900 text-neutral-50 hover:bg-neutral-700 hover:text-neutral-200'
              } 
              relative flex items-center gap-x-3 px-8 py-5 text-lg font-semibold`}
              key={menu.id}
            >
              {menu.icon}
              {open && <div>{menu.name}</div>}
              {pathname == menu.url && menu.add && (
                <button
                  className='absolute inset-y-0 -right-4 z-10'
                  onClick={() => (location = `${menu.url}/add`)}
                >
                  <AddIcon />
                </button>
              )}
            </Link>
          ))}
        </nav>
        <div className='flex cursor-pointer items-center gap-x-3 place-self-center py-5'>
          <div className='relative h-12 w-12'>
            <Image
              src={user.avatar}
              alt={user.name}
              sizes='3vw'
              fill={true}
              className='rounded-full'
            />
          </div>
          {open && (
            <div className='text-base font-medium text-neutral-100'>
              {user.name}
            </div>
          )}
        </div>
      </aside>
    )
  );
}
