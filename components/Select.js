'use client';
import { useEffect, useState } from 'react';

export default function Select({
  label,
  name,
  defaultValue,
  placeholder,
  uuid,
  options,
  occupy,
  returnValue,
}) {
  const [value, setValue] = useState(defaultValue ?? '');
  useEffect(() => {
    if (defaultValue ?? false ? true : false) {
      setValue(defaultValue);
      returnValue(name, uuid, defaultValue);
    }
  }, [defaultValue, name, uuid, returnValue]);

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
          setValue(event.target.value);
          returnValue(name, uuid, event.target.value);
        }}
      >
        {!defaultValue && placeholder && (
          <option className='placeholder' value='' disabled>
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
