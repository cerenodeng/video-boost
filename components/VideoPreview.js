'use client';
import { useEffect, useRef, useState } from 'react';
import { PlayIcon, PauseIcon } from './Icon';
import ProgressBar from './ProgressBar';

export default function VideoPreview() {
  const video = useRef(null);
  useEffect(() => {
    video.current.controls = false;
    video.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor((video.current.currentTime * 100) / video.current.duration))
      if (video.current.ended) {
        setPlay(true)
      }
    });
  }, []);
  const [play, setPlay] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentVideo, setCurentVideo] = useState('/demo-video-1.mp4');

  function onPlayClick(event) {
    if (video.current.paused || video.current.ended) {
      video.current.play();
    } else {
      video.current.pause();
    }
    setPlay(!play);
  }

  // from seconds to mm:ss
  function formatTime(time) {
    const date = new Date(2099, 11, 31, 0, 0, time);
    return date.toTimeString().slice(3, 8);
  }

  function onActionClick(event) {
    const nextVideo = event.currentTarget.dataset.video;
    setCurentVideo(nextVideo);
    setPlay(true);
    setProgress(0);
  }

  return (
    <div className="flex flex-col gap-y-3 absolute right-0 top-0 w-[390px] h-fit">
      <div className="relative">
        <video ref={video} src={currentVideo} controls></video>
        <div className="absolute inset-0 flex flex-col items-center justify-evenly">
          {video.current?.currentTime > 3 && video.current?.currentTime < 7 ?
            <>
              <button className="w-48 p-4 bg-neutral-50 opacity-90 hover:bg-emerald-100" data-video="/demo-video-2.mp4" onClick={onActionClick}>Why?</button>
              <button className="w-48 p-4 bg-neutral-50 opacity-90 hover:bg-emerald-100" data-video="/demo-video-3.mp4" onClick={onActionClick}>Case Study</button>
              <button className="w-48 p-4 bg-neutral-50 opacity-90 hover:bg-emerald-100" data-video="/demo-video-1.mp4" onClick={onActionClick}>About Us</button>
            </>
            : ''
          }
        </div>
      </div>
      <div className="p-3 flex gap-x-3 bg-neutral-50 items-center">
        <button className="flex flex-none w-10 h-10 bg-emerald-300 rounded-full justify-center items-center" onClick={onPlayClick}>
          {play ? <PlayIcon /> : <PauseIcon />}
        </button>
        <ProgressBar progress={progress} text={(video.current?.currentTime && video.current?.duration) ? formatTime(video.current.currentTime) + '/' + formatTime(video.current.duration) : ''} />
      </div>
    </div>
  );
}