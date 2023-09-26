'use client';
import { useState } from 'react';
import { PlusIcon } from './Icon';
import Input from './Input';

export default function ButtonSetting() {
  const [buttons, setButtons] = useState([]);

  function onAddClick(event) {
    event.preventDefault();
  }

  // store every button's setting
  function returnTitle(id, value) {
    const found = buttons.filter((button) => button.id == id);
    if (found.length == 0) {
      setButtons([...buttons, { id: id, title: value }]);
    } else {
      const others = buttons.filter((button) => button.id != id);
      others.push({ id: id, title: value });
      setButtons(others);
    }
  }

  return (
    <form className='flex flex-col items-center gap-y-6'>
      {JSON.stringify(buttons)}
      <div className='flex flex-col bg-neutral-50 p-6 shadow-sm'>
        <Input
          label='Title'
          name='title'
          placeholder='Title'
          returnValue={returnTitle}
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
