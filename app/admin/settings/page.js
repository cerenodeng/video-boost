'use client';
import { useEffect, useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AlertIcon, LoadingIcon } from '@/components/Icon';
import Input from '@/components/Input';
import Radio from '@/components/Radio';

const queryClient = new QueryClient();

function Settings() {
  const id = 'c4194388-7802-11ee-b1ec-9f3b2547f2e0';
  const queryClient = useQueryClient();
  queryClient.setQueryDefaults([id], { queryFn: getItem });
  const { isPending, isError, data, error } = useQuery({
    queryKey: [id],
  });
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    narrowSidebar: false,
  });
  useEffect(() => {
    if (data != undefined) {
      setValues({
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        narrowSidebar: data.setting.narrow_sidebar,
      });
    }
  }, [data]);

  async function getItem() {
    const response = await fetch(`/admin/api/users/${id}`);
    if (!response.ok) {
      throw new Error('error to get users api');
    }
    return response.json();
  }

  function returnValue(name, id, value) {
    setValues((values) => {
      values[name] = value;
      return values;
    });
  }

  if (isPending) {
    return (
      <div className='fixed flex h-screen w-96 items-center justify-center gap-x-3 overflow-auto border-r border-neutral-200'>
        <LoadingIcon />
        <div>Loading ...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='fixed flex h-screen w-96 items-center justify-center gap-x-3 overflow-auto border-r border-neutral-200'>
        <AlertIcon />
        <div>{error.message}</div>
      </div>
    );
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
          defaultValue={data.first_name}
          placeholder='First name'
          // uuid={id}
          returnValue={returnValue}
          occupy
        />
        <Input
          label='Last Name'
          name='lastName'
          defaultValue={data.last_name}
          placeholder='Last name'
          // uuid={id}
          returnValue={returnValue}
          occupy
        />
        <Input
          label='Email'
          name='email'
          type='email'
          defaultValue={data.email}
          placeholder='Email'
          // uuid={id}
          returnValue={returnValue}
          occupy
        />
        <Radio
          label='Sidebar Width'
          name='sideWidth'
          values={['narrow', 'wide']}
          defaultValue={data.narrowSidebar ? 'narrow' : 'wide'}
          returnValue={returnValue}
        />
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Settings />
    </QueryClientProvider>
  );
}
