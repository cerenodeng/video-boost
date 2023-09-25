'use client';
import { useState } from 'react';
import { PlusIcon } from './Icon';
import Input from './Input';

export default function ButtonSetting() {
  const [buttons, setButtons] = useState([]);

  function onAddClick(event) {
    event.preventDefault();
  }

  function returnValue(value) {}

  return (
    <form className='flex flex-col items-center gap-y-6'>
      <div className='flex flex-col bg-neutral-50 p-6 shadow-sm'>
        <Input
          label='Title'
          name='title'
          placeholder='Title'
          returnValue={returnValue}
        />
      </div>
      <button
        type='button'
        className='flex w-32 items-center gap-x-2 self-center rounded bg-white px-5 py-2 hover:bg-emerald-50'
        onClick={onAddClick}
      >
        <PlusIcon />
        <div className='text-lg'>Action</div>
      </button>
    </form>
  );
}
