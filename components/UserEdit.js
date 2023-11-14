'use client';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AlertIcon, CloseIcon, LoadingIcon } from './Icon';
import Input from './Input';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient();

function User({ id, close }) {
  const queryClient = useQueryClient();
  queryClient.setQueryDefaults([id], { queryFn: getItems });
  const { isPending, isError, data, error } = useQuery({
    queryKey: [id],
  });
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  useEffect(() => {
    if (data != undefined) {
      setValues({
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
      });
    }
  }, [data]);
  const [saving, setSaving] = useState(false);

  async function getItems() {
    const response = await fetch(`/admin/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`error to get users api`);
    }
    return response.json();
  }

  function returnValue(name, id, value) {
    setValues((values) => {
      values[name] = value;
      return values;
    });
  }

  async function save(event) {
    event.preventDefault();
    if (!saving) {
      setSaving(true);
      const response = await fetch(`/admin/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        console.log('error to put users api');
      } else {
        const { id } = await response.json();
        if (id != undefined) {
          console.log(id);
        }
      }
      setSaving(false);
    }
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
          defaultValue={values.firstName}
          placeholder='First name'
          uuid={id}
          returnValue={returnValue}
          occupy
        />
        <Input
          label='Last Name'
          name='lastName'
          defaultValue={values.lastName}
          placeholder='Last name'
          uuid={id}
          returnValue={returnValue}
          occupy
        />
        <Input
          label='Email'
          name='email'
          type='email'
          defaultValue={values.email}
          placeholder='Email'
          uuid={id}
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
