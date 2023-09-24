import { useEffect, useRef, useState } from 'react';

export default function ProgressBar({ progress, text }) {
  const bar = useRef(null);
  const [width, setWidth] = useState();

  useEffect(() => {
    function onResize() {
      setWidth(bar.current.offsetWidth);
    }
    onResize();
    // window.addEventListener('resize', onResize);
  }, []);

  return (
    <div className='relative h-4 w-full bg-neutral-200'>
      {text && (
        <div className='absolute inset-0 z-10 text-center text-xs'>{text}</div>
      )}
      <div
        ref={bar}
        className='absolute inset-0 h-4 bg-emerald-200 text-center text-xs'
        style={{ width: `${(progress / 100) * width}px` }}
      ></div>
    </div>
  );
}
