'use client';
import { useState } from 'react';

export default function Radio({
  label,
  name,
  values,
  defaultValue,
  returnValue,
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className='flex flex-col gap-y-2'>
      <label>{label}</label>
      <div className='flex'>
        {values.map((item, index) => (
          <button
            className={`${
              item == value
                ? 'bg-emerald-300 text-white'
                : 'bg-neutral-300 hover:bg-emerald-100'
            } flex-1 p-3 `}
            key={index}
            onClick={() => {
              setValue(item);
              returnValue(name, null, item);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      {/* {values.map((item, index) => (
        <input
          name={name}
          type='radio'
          value={item}
          className='hidden'
          key={index}
        />
      ))} */}
    </div>
  );
}
