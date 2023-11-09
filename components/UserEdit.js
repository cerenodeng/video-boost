'use client';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AlertIcon, CloseIcon, LoadingIcon } from './Icon';
import Input from './Input';
import { useEffect } from 'react';

const queryClient = new QueryClient();

function User({ id, close }) {
  const queryClient = useQueryClient();
  queryClient.setQueryDefaults([id], { queryFn: getItems });
  const { isPending, isError, data, error } = useQuery({
    queryKey: [id],
  });

  async function getItems() {
    const response = await fetch(`/admin/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`error to get users api`);
    }
    return response.json();
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
          <h3>Edit User</h3>
          <button onClick={close}>
            <CloseIcon />
          </button>
        </div>
        <Input
          label='First Name'
          name='firstName'
          defaultValue={data.first_name}
          placeholder='First name'
          returnValue={() => {}}
          occupy
        />
        <Input
          label='Last Name'
          name='lastName'
          defaultValue={data.last_name}
          placeholder='Last name'
          returnValue={() => {}}
          occupy
        />
        <Input
          label='Email'
          name='email'
          type='email'
          defaultValue={data.email}
          placeholder='Email'
          returnValue={() => {}}
          occupy
        />
      </div>
      <div className='fixed -bottom-px flex w-96 justify-between bg-neutral-200 p-5 text-xl font-semibold opacity-90'>
        <button className='w-28 bg-neutral-500 px-5 py-2.5 text-neutral-100 hover:bg-neutral-700'>
          Save
        </button>
        <button className='w-28 bg-red-300 px-5 py-2.5 text-neutral-100 hover:bg-red-500'>
          Delete
        </button>
      </div>
    </div>
  );
}

export default function UserEdit({ id, close }) {
  return (
    <QueryClientProvider client={queryClient}>
      <User id={id} close={close} />
    </QueryClientProvider>
  );
}
