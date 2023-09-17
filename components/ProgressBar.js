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
    <div className="w-full h-4 relative bg-neutral-200">
      {text && <div className="absolute inset-0 text-xs text-center z-10">{text}</div>}
      <div ref={bar} className="h-4 text-xs absolute inset-0 bg-emerald-200 text-center" style={{ width: `${(progress / 100) * width}px` }}></div>
    </div >
  );
}