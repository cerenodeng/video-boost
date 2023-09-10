'use client';
import { useRef, useState } from 'react';
import { PlusIcon } from './Icon';

export default function VideoUpload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const inputFile = useRef(null);

  function onAddClick(event) {
    event.preventDefault();
    inputFile.current.click();
  }

  function onFileChange(event) {
    event.preventDefault();
    if (!event.target.files) {
      return;
    }
    setFile(event.target.files[0]);
    if (event.target.files[0]?.type != 'video/mp4') {
      setError('Only .mp4 file can be uploaded');
      return;
    }
    if ((event.target.files[0]?.size / 1000000) >= 20) {
      setError('The file size must less than 20 MB');
      return;
    }
    setError('');
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className={`${file && error != '' ? '' : 'hidden'} text-red-500`}>{error}</div>
      <div className={`${file && error == '' ? '' : 'hidden'} text-base font-semibold`}>{`${file?.name}, ${(file?.size / 1000000).toFixed(1)} MB`}</div>
      <button className="flex gap-x-2 px-5 py-2 w-fit bg-white self-center items-center rounded hover:bg-emerald-50" onClick={onAddClick}>
        <PlusIcon />
        <div className="text-lg">Video</div>
      </button>
      <input type="file" className="hidden" ref={inputFile} onChange={onFileChange} />
    </div>
  );
}