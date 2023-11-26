'use client';
import { useState } from 'react';
import Input from '@/components/Input';
import Radio from '@/components/Radio';

export default function Settings() {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  function returnValue(name, id, value) {
    setValues((values) => {
      values[name] = value;
      return values;
    });
  }

  return (
    <div className='fixed h-screen w-96 overflow-auto border-r border-neutral-200'>
      <div className='flex flex-col gap-y-6 px-10 py-5'>
        <div className='flex justify-between'>
          <h3>Setting</h3>
        </div>
        <Input
          label='First Name'
          name='firstName'
          // defaultValue={data.first_name}
          placeholder='First name'
          // uuid={id}
          returnValue={returnValue}
          occupy
        />
        <Input
          label='Last Name'
          name='lastName'
          // defaultValue={data.last_name}
          placeholder='Last name'
          // uuid={id}
          returnValue={returnValue}
          occupy
        />
        <Input
          label='Email'
          name='email'
          type='email'
          // defaultValue={data.email}
          placeholder='Email'
          // uuid={id}
          returnValue={returnValue}
          occupy
        />
        <Radio
          label='Sidebar Width'
          name='sideWidth'
          values={['narrow', 'wide']}
          defaultValue={'wide'}
          returnValue={returnValue}
        />
      </div>
    </div>
  );
}
