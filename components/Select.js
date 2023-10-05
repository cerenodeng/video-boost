'use client';
import { useState } from 'react';

export default function Select({
  label,
  name,
  placeholder,
  uuid,
  options,
  occupy,
  returnValue,
}) {
  const [empty, setEmpty] = useState(true);
  const [value, setValue] = useState('');

  function displayClass(value) {
    if (typeof occupy == 'undefined') {
      return value ? 'block' : 'hidden';
    } else {
      return value ? 'visible' : 'invisible';
    }
  }

  return (
    <div className='flex flex-col'>
      <label className={displayClass(value)} htmlFor={name}>
        {label}
      </label>
      <select
        name={name}
        uuid={uuid}
        value={value}
        onChange={(event) => {
          // event.target.value == '' ? setEmpty(true) : setEmpty(false);
          setValue(event.target.value);
          returnValue(name, uuid, event.target.value);
        }}
      >
        {placeholder && (
          <option value='' disabled selected>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
