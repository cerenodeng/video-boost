'use client';

import Link from 'next/link';
import { DotsIcon, NextIcon, PreviousIcon } from './Icon';

export default function DataTable({ data }) {
  const maxPage = data.totalPages < 10 ? data.totalPages : 10;

  function onClick(event) {
    event.preventDefault();
    location = event.currentTarget.dataset.link;
  }

  return (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.items.map((item, index) => (
          <tr data-link={item[0]} onClick={onClick} key={index}>
            {[...Array(item.length - 1).keys()].map((key, index) => (
              <td key={index}>{item[key + 1]}</td>
            ))}
          </tr>
        ))}
      </tbody>
      {data.totalPages > 1 && (
        <tfoot>
          <tr>
            <th colSpan={data.headers.length}>
              <div className='flex items-center gap-x-5'>
                <Link href='#' className='page'>
                  <PreviousIcon />
                </Link>
                {[...Array(maxPage < 3 ? maxPage : 3).keys()].map((index) => (
                  <Link
                    href={`/admin/videos/page/${index + 1}`}
                    className={`${
                      data.currentPage == index + 1 ? 'current' : ''
                    } page`}
                    key={index}
                  >
                    {index + 1}
                  </Link>
                ))}
                {maxPage > 3 && <DotsIcon />}
                {maxPage > 7 &&
                  [...Array(maxPage).keys()].map(
                    (index) =>
                      index > 6 && (
                        <Link
                          href={`/admin/videos/page/${index + 1}`}
                          className='page'
                          key={index}
                        >
                          {index + 1}
                        </Link>
                      ),
                  )}
                <Link href='#' className='page'>
                  <NextIcon />
                </Link>
              </div>
            </th>
          </tr>
        </tfoot>
      )}
    </table>
  );
}
