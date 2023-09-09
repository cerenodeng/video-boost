'use client';
import { useRef } from 'react';
import { PlusIcon } from './Icon';

export default function VideoUpload() {
  const videoFile = useRef(null);

  function onClick(event) {
    event.preventDefault();
    videoFile.current.click();
  }

  return (
    <>
      <button className="flex gap-x-2 px-5 py-2 w-fit bg-white self-center items-center rounded hover:bg-emerald-50" onClick={onClick}>
        <PlusIcon />
        <div className="text-lg">Video</div>
      </button>
      <input type="file" className="hidden" ref={videoFile} onChange={(event) => console.log(event.target.value)} />
    </>
  );
}