'use client';
import { useEffect, useState } from 'react';

export default function Input({
  label,
  name,
  type,
  defaultValue,
  placeholder,
  uuid,
  occupy,
  returnValue,
}) {
  const [empty, setEmpty] = useState(!(defaultValue ?? false) ? true : false);
  const [value, setValue] = useState(defaultValue ?? '');
  useEffect(() => {
    if (defaultValue ?? false ? true : false) {
      setValue(defaultValue);
      returnValue(name, uuid, defaultValue);
    }
  }, [defaultValue, name, uuid, returnValue]);

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
        type={type ?? 'text'}
        uuid={uuid}
        value={value}
        onChange={(event) => {
          event.target.value == '' ? setEmpty(true) : setEmpty(false);
          setValue(event.target.value);
          returnValue(name, uuid, event.target.value);
        }}
      />
    </div>
  );
}
