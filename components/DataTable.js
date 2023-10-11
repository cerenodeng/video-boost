'use client';

import Link from 'next/link';
import { DotsIcon, NextIcon, PreviousIcon } from './Icon';

export default function DataTable({ data }) {
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
                <Link href='#' className='page'>
                  1
                </Link>
                <Link href='#' className='page'>
                  2
                </Link>
                <Link href='#' className='page'>
                  3
                </Link>
                <DotsIcon />
                <Link href='#' className='page'>
                  8
                </Link>
                <Link href='#' className='page'>
                  9
                </Link>
                <Link href='#' className='page'>
                  10
                </Link>
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
