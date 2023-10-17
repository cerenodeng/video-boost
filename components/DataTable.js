'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  DotsIcon,
  FastNextIcon,
  FastPreviousIcon,
  NextIcon,
  PreviousIcon,
} from './Icon';

export default function DataTable({ data }) {
  const startPage = Math.floor((data.currentPage - 1) / 10) * 10 + 1;
  const maxPage =
    startPage + 9 >= data.totalPages ? data.totalPages - startPage + 1 : 10;
  const [currentPage, setCurrentPage] = useState(data.currentPage);

  function getUnitDigit(number) {
    const result = Number(number.toString().at(-1));
    return result == 0 ? 10 : result;
  }

  function onClick(event) {
    event.preventDefault();
    location = event.currentTarget.dataset.link;
  }

  return (
    <table className='h-screen w-full'>
      <thead className='sticky top-0 opacity-95'>
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
        <tfoot className='sticky bottom-0 opacity-95'>
          <tr>
            <th colSpan={data.headers.length}>
              <div className='flex items-center gap-x-5'>
                <div>
                  Total {data.totalItems}{' '}
                  {data.totalItems > 1 ? data.names[1] : data.names[0]}
                </div>
                {data.totalPages > 10 && (
                  <Link href='#' className='page'>
                    <FastPreviousIcon />
                  </Link>
                )}
                <Link href='#' className='page'>
                  <PreviousIcon />
                </Link>
                {(getUnitDigit(currentPage) < 4 ||
                  getUnitDigit(currentPage) > 7) &&
                  [...Array(maxPage < 3 ? maxPage : 3).keys()].map((index) => (
                    <Link
                      href={`/admin/videos/page/${startPage + index}`}
                      className={`${
                        getUnitDigit(currentPage) == index + 1 ? 'current' : ''
                      } page`}
                      key={index}
                    >
                      {startPage + index}
                    </Link>
                  ))}
                {maxPage > 3 &&
                  (getUnitDigit(currentPage) < 4 ||
                    getUnitDigit(currentPage) > 7) && <DotsIcon />}
                {maxPage > 3 &&
                  getUnitDigit(currentPage) > 3 &&
                  getUnitDigit(currentPage) < 8 && <DotsIcon />}
                {maxPage > 3 &&
                  getUnitDigit(currentPage) > 3 &&
                  getUnitDigit(currentPage) < 8 &&
                  [...Array(maxPage).keys()].map(
                    (index) =>
                      index > 2 &&
                      index < 7 && (
                        <Link
                          href={`/admin/videos/page/${startPage + index}`}
                          className={`${
                            getUnitDigit(currentPage) == index + 1
                              ? 'current'
                              : ''
                          } page`}
                          key={index}
                        >
                          {startPage + index}
                        </Link>
                      ),
                  )}
                {maxPage > 3 &&
                  getUnitDigit(currentPage) > 3 &&
                  getUnitDigit(currentPage) < 8 && <DotsIcon />}
                {maxPage > 7 &&
                  (getUnitDigit(currentPage) < 4 ||
                    getUnitDigit(currentPage) > 7) &&
                  [...Array(maxPage).keys()].map(
                    (index) =>
                      index > 6 && (
                        <Link
                          href={`/admin/videos/page/${startPage + index}`}
                          className={`${
                            getUnitDigit(currentPage) == index + 1
                              ? 'current'
                              : ''
                          } page`}
                          key={index}
                        >
                          {startPage + index}
                        </Link>
                      ),
                  )}
                <Link href='#' className='page'>
                  <NextIcon />
                </Link>
                {data.totalPages > 10 && (
                  <Link href='#' className='page'>
                    <FastNextIcon />
                  </Link>
                )}
                <div className='flex items-center gap-x-2'>
                  <div>Page</div>
                  <input
                    name='currentPage'
                    className='w-20'
                    value={currentPage}
                    onChange={(event) => setCurrentPage(event.target.value)}
                  />
                  <div>of {data.totalPages}</div>
                </div>
              </div>
            </th>
          </tr>
        </tfoot>
      )}
    </table>
  );
}
