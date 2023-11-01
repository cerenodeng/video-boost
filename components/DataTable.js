'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  AlertIcon,
  DotsIcon,
  FastNextIcon,
  FastPreviousIcon,
  LoadingIcon,
  NextIcon,
  PreviousIcon,
} from './Icon';

const queryClient = new QueryClient();

function Table({ headers, names, path }) {
  const [currentPage, setCurrentPage] = useState(24);
  const [startPage, setStartPage] = useState();
  const [maxPage, setMaxPage] = useState();
  const [focus, setFocus] = useState(false);
  const queryClient = useQueryClient();
  queryClient.setQueryDefaults(['items'], { queryFn: getItems });
  const { isPending, isError, data, error } = useQuery({ queryKey: ['items'] });
  useEffect(() => {
    setStartPage(Math.floor((currentPage - 1) / 10) * 10 + 1);
    setMaxPage(
      startPage + 9 >= data?.totalPages ? data?.totalPages - startPage + 1 : 10,
    );
  }, [startPage, currentPage, data?.totalPages]);

  async function getItems() {
    const response = await fetch(`/admin/api/${path}/${currentPage}`);
    if (!response.ok) {
      throw new Error(`error to get ${path} api`);
    }
    return response.json();
  }

  if (isPending) {
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
          <tr>
            <td
              colSpan={headers.length}
              className='cursor-default hover:bg-white'
            >
              <div className='flex w-full items-center justify-center gap-x-3'>
                <LoadingIcon />
                <div>Loading ...</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  if (isError) {
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
          <tr>
            <td
              colSpan={headers.length}
              className='cursor-default hover:bg-white'
            >
              <div className='flex w-full items-center justify-center gap-x-3'>
                <AlertIcon />
                <div>{error.message}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  function getUnitDigit(number) {
    const result = Number(number.toString().at(-1));
    return result == 0 ? 10 : result;
  }

  function onRowClick(event) {
    event.preventDefault();
    location = event.currentTarget.dataset.link;
  }

  function onCurrentPageFocus(event) {
    event.preventDefault();
    event.target.value = '';
    setFocus(true);
  }

  let timeoutId;
  let pageNumbers = '';
  function onCurrentPageKeyUp(event) {
    event.preventDefault();
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    if (!isNaN(Number(event.key))) {
      pageNumbers = pageNumbers + event.key.toString();
    }
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      event.target.blur();
      setFocus(false);
      setCurrentPage(Number(pageNumbers));
    }, 500);
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
          <tr data-link={item[1]} onClick={onRowClick} key={item[0]}>
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
                    value={!focus ? currentPage : ''}
                    onFocus={onCurrentPageFocus}
                    onKeyUp={onCurrentPageKeyUp}
                    // onKeyDown={(event) => (event.target.value = event.key)}
                    onChange={(event) => event}
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

export default function DataTable({ headers, names, path }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Table headers={headers} names={names} path={path} />
    </QueryClientProvider>
  );
}
