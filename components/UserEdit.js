import Input from './Input';

export default function UserEdit({ id }) {
  return (
    <div className='fixed h-screen w-96 overflow-auto border-r border-neutral-200'>
      <div className='flex flex-col gap-y-6 p-10'>
        <Input
          label='First Name'
          name='firstName'
          defaultValue=''
          placeholder='First name'
          returnValue={() => {}}
        />
        <Input
          label='Last Name'
          name='lastName'
          defaultValue=''
          placeholder='Last name'
          returnValue={() => {}}
          occupy
        />
        <Input
          label='Email'
          name='email'
          type='email'
          defaultValue=''
          placeholder='Email'
          returnValue={() => {}}
          occupy
        />
        {/* <Input label='Test' name='test' returnValue={() => {}} occupy />
        <Input label='Test' name='test' returnValue={() => {}} occupy />
        <Input label='Test' name='test' returnValue={() => {}} occupy />
        <Input label='Test' name='test' returnValue={() => {}} occupy />
        <Input label='Test' name='test' returnValue={() => {}} occupy />
        <Input label='Test' name='test' returnValue={() => {}} occupy />
        <Input label='Test' name='test' returnValue={() => {}} occupy />
        <Input label='Test' name='test' returnValue={() => {}} occupy /> */}
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
