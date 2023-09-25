'use client';
import { useEffect, useState } from 'react';

export default function Input({
  label,
  name,
  placeholder,
  occupy,
  returnValue,
}) {
  const [empty, setEmpty] = useState(true);
  const [value, setValue] = useState('');
  useEffect(() => {
    returnValue(value);
  }, [returnValue, value]);

  function displayClass() {
    if (typeof occupy == 'undefined') {
      return empty ? 'hidden' : 'block';
    } else {
      return empty ? 'invisible' : 'visible';
    }
  }

  return (
    <div className='flex flex-col'>
      <label className={displayClass()} htmlFor={name}>
        {label}
      </label>
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(event) => {
          event.target.value == '' ? setEmpty(true) : setEmpty(false);
          setValue(event.target.value);
        }}
      />
    </div>
  );
}
