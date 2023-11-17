'use client';
import { useState } from 'react';
import { CloseIcon, LoadingIcon } from './Icon';
import Input from './Input';

export default function UserAdd({ close }) {
  const [saving, setSaving] = useState(false);

  function save() {}

  function returnValue(name, id, value) {}

  return (
    <div className='fixed h-screen w-96 overflow-auto border-r border-neutral-200'>
      <div className='flex flex-col gap-y-6 px-10 py-5'>
        <div className='flex justify-between'>
          <h3>Add User</h3>
          <button onClick={close}>
            <CloseIcon />
          </button>
        </div>
        <Input
          label='First Name'
          name='firstName'
          placeholder='First name'
          returnValue={returnValue}
          occupy
        />
        <Input
          label='Last Name'
          name='lastName'
          placeholder='Last name'
          returnValue={returnValue}
          occupy
        />
        <Input
          label='Email'
          name='email'
          type='email'
          placeholder='Email'
          returnValue={returnValue}
          occupy
        />
      </div>
      <div className='fixed -bottom-px flex w-96 justify-between bg-neutral-200 p-5 text-xl font-semibold opacity-90'>
        <button
          className={`${
            saving ? 'cursor-default bg-neutral-700' : 'bg-neutral-500'
          } flex w-28 items-center justify-center px-5 py-2.5 text-neutral-100 hover:bg-neutral-700`}
          onClick={save}
        >
          {saving ? <LoadingIcon /> : 'Save'}
        </button>
      </div>
    </div>
  );
}
