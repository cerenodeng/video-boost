'use client';
import { Fragment, useEffect, useRef, useState } from 'react';
import { PlayIcon, PauseIcon } from './Icon';
import ProgressBar from './ProgressBar';

export default function VideoPreview({ settings }) {
  const video = useRef(null);
  useEffect(() => {
    video.current.controls = false;
    video.current.addEventListener('timeupdate', () => {
      setProgress(
        Math.floor((video.current.currentTime * 100) / video.current.duration),
      );
      if (video.current.ended) {
        setPlay(true);
      }
    });
  }, []);
  const [play, setPlay] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentVideo, setCurentVideo] = useState('/demo-video-1.mp4');
  const buttons = Object.fromEntries(settings);

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
    <div className='absolute bottom-10 right-10 m-7 flex h-fit w-[390px] flex-col gap-y-3'>
      <div className='flex items-center gap-x-3 bg-neutral-50 p-3'>
        <button
          className='flex h-10 w-10 flex-none items-center justify-center rounded-full bg-emerald-300'
          onClick={onPlayClick}
        >
          {play ? <PlayIcon /> : <PauseIcon />}
        </button>
        <ProgressBar
          progress={progress}
          text={
            video.current?.currentTime && video.current?.duration
              ? formatTime(video.current.currentTime) +
                '/' +
                formatTime(video.current.duration)
              : ''
          }
        />
      </div>
      <div className='relative'>
        <video ref={video} src={currentVideo} controls></video>
        <div className='absolute inset-0 flex flex-col items-center justify-evenly'>
          {Object.keys(buttons).map((key) => (
            <button
              className='w-48 bg-neutral-50 p-4 opacity-90 hover:bg-emerald-100'
              data-width={buttons[key]?.width}
              data-video={`/${buttons[key]?.nextVideo}`}
              style={{
                color: buttons[key]?.titleColor,
                backgroundColor: buttons[key]?.bgColor,
              }}
              key={key}
              onClick={onActionClick}
            >
              {buttons[key]?.title}
            </button>
          ))}
          {/* {video.current?.currentTime > 3 && video.current?.currentTime < 7 ? (
            <>
              <button
                className='w-48 bg-neutral-50 p-4 opacity-90 hover:bg-emerald-100'
                data-video='/demo-video-2.mp4'
                onClick={onActionClick}
              >
                Why?
              </button>
              <button
                className='w-48 bg-neutral-50 p-4 opacity-90 hover:bg-emerald-100'
                data-video='/demo-video-3.mp4'
                onClick={onActionClick}
              >
                Case Study
              </button>
              <button
                className='w-48 bg-neutral-50 p-4 opacity-90 hover:bg-emerald-100'
                data-video='/demo-video-1.mp4'
                onClick={onActionClick}
              >
                About Us
              </button>
            </>
          ) : (
            ''
          )} */}
        </div>
      </div>
    </div>
  );
}
