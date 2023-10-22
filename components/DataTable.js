'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  DotsIcon,
  FastNextIcon,
  FastPreviousIcon,
  NextIcon,
  PreviousIcon,
} from './Icon';

const queryClient = new QueryClient();

function Table({ headers, names }) {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  queryClient.setQueryDefaults(['items'], { queryFn: getItems });
  const { isPending, isError, data, error } = useQuery({ queryKey: ['items'] });

  async function getItems() {
    const response = await fetch(`/admin/api/videos/${currentPage}`);
    if (!response.ok) {
      throw new Error('error to get videos api');
    }
    return response.json();
  }

  if (isPending) {
    return <div>Loading ...</div>;
  }
  if (isError) {
    return <div>{`An error has occurred: ${error.message}`}</div>;
  }

  const startPage = Math.floor((data.currentPage - 1) / 10) * 10 + 1;
  const maxPage =
    startPage + 9 >= data.totalPages ? data.totalPages - startPage + 1 : 10;

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
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.items.map((item) => (
          <tr data-link={item[1]} onClick={onClick} key={item[0]}>
            {[...Array(item.length - 2).keys()].map((key, index) => (
              <td key={index}>{item[key + 2]}</td>
            ))}
          </tr>
        ))}
        {currentPage == data.totalPages &&
          [...Array(data.itemsPerPage - data.items.length - 1).keys()].map(
            (index) => (
              <tr className='no-border' key={index}>
                <td colSpan={headers.length}></td>
              </tr>
            ),
          )}
      </tbody>
      {data.totalPages > 1 && (
        <tfoot className='sticky bottom-0 opacity-95'>
          <tr>
            <th colSpan={headers.length}>
              <div className='flex items-center gap-x-5'>
                <div>
                  Total {data.totalItems}{' '}
                  {data.totalItems > 1 ? names[1] : names[0]}
                </div>
                {data.totalPages > 10 && startPage != 1 && (
                  <Link href='#' className='page'>
                    <FastPreviousIcon />
                  </Link>
                )}
                {currentPage != 1 && (
                  <Link href='#' className='page'>
                    <PreviousIcon />
                  </Link>
                )}
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
                  getUnitDigit(currentPage) < 8 &&
                  currentPage != data.totalPages && <DotsIcon />}
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
                {currentPage != data.totalPages && (
                  <Link href='#' className='page'>
                    <NextIcon />
                  </Link>
                )}
                {data.totalPages > 10 && data.totalPages - startPage > 9 && (
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

export default function DataTable({ headers, names }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Table headers={headers} names={names} />
    </QueryClientProvider>
  );
}
