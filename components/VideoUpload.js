'use client';
import { useEffect, useRef, useState } from 'react';
import { PlusIcon } from './Icon';

export default function VideoUpload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const uploadButton = useRef(null);
  const inputFile = useRef(null);

  useEffect(() => {
    async function uploadFile() {
      if (file) {
        const response = await fetch('https://httpbin.org/post', {
          method: 'POST',
          body: file,
          headers: {
            'content-type': file.type,
            'content-length': `${file.size}`
          }
        });
        const result = await response.json();
        console.log(result);
        uploadButton.current.disabled = false;
        setFile(null);
      }
    }
    uploadFile();
    return () => {
      // setFile(null);
      // setError('');
    };
  }, [file]);

  function onAddClick(event) {
    event.preventDefault();
    if (!file) {
      inputFile.current.click();
    }
  }

  function onFileChange(event) {
    event.preventDefault();
    if (!event.currentTarget.files) {
      return;
    }
    const targetFile = event.currentTarget.files[0];
    if (targetFile.type != 'video/mp4') {
      setError('Only .mp4 file can be uploaded');
      return;
    }
    if ((targetFile.size / 1000000) >= 20) {
      setError('The file size must less than 20 MB');
      return;
    }
    uploadButton.current.disabled = true;
    setError('');
    setFile(targetFile);
  }

  return (
    <form className="flex flex-col gap-y-2 items-center">
      <div className={`${file && error != '' ? '' : 'hidden'} text-red-500`}>{error}</div>
      <div className={`${file && error == '' ? '' : 'hidden'} text-base font-semibold`}>{`${file?.name}, ${(file?.size / 1000000).toFixed(1)} MB`}</div>
      <button
        ref={uploadButton}
        type="button"
        className={`${file && error == '' ? 'cursor-wait' : 'cursor-pointer'} flex gap-x-2 px-5 py-2 w-fit bg-white self-center items-center rounded hover:bg-emerald-50`}
        onClick={onAddClick}
      >
        <PlusIcon />
        <div className="text-lg">Video</div>
      </button>
      <input
        ref={inputFile}
        type="file"
        className="hidden"
        onChange={onFileChange}
      />
    </form>
  );
}