import { PlusIcon } from './Icon';

export default function Builder() {
  return (
    <div className="flex flex-col w-1/4">
      <div className="flex flex-col p-4 bg-neutral-100">
        <button className="flex gap-x-2 px-5 py-2 w-fit bg-white self-center items-center rounded hover:bg-emerald-50">
          <PlusIcon />
          <div className="text-lg">Video</div>
        </button>
      </div>
    </div>
  );
}