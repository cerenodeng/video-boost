'use client';
import { useEffect, useRef, useState } from 'react';
import { PlayIcon, PauseIcon } from './Icon';

export default function VideoPreview() {
  const video = useRef(null);
  useEffect(() => {
    video.current.controls = false;
  }, []);
  const [play, setPlay] = useState(true);

  function onPlayClick(event) {
    if (video.current.paused || video.current.ended) {
      video.current.play();
    } else {
      video.current.pause();
    }
    setPlay(!play);
  }

  return (
    <div className="flex flex-col gap-y-3 absolute right-0 top-0 w-[390px] h-fit">
      <video ref={video} src="/demo-video.mp4" controls></video>
      <div className="p-3 flex bg-neutral-50">
        <button className="flex w-10 h-10 bg-emerald-300 rounded-full justify-center items-center" onClick={onPlayClick}>
          {play ? <PlayIcon /> : <PauseIcon />}
        </button>
      </div>
    </div>
  );
}