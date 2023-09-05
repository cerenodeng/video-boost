'use client';

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
      <tbody className="">
        {data.items.map((item, index) => (
          <tr data-link={item[0]} onClick={onClick} key={index}>
            {[...Array(item.length - 1).keys()].map((key, index) => (
              <td key={index}>{item[key + 1]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
} 