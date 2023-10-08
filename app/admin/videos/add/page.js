'use client';
import { useState } from 'react';
import VideoSetting from '@/components/VideoSetting';
import ButtonSetting from '@/components/ButtonSetting';
import VideoPreview from '@/components/VideoPreview';

export default function AddVideo() {
  const [settings, setSettings] = useState(new Map());

  return (
    <div className='flex'>
      <div className='flex w-1/4 flex-col'>
        <div className='flex flex-col gap-y-4 bg-neutral-100 p-4'>
          <VideoSetting />
          <ButtonSetting returnSettings={(results) => setSettings(results)} />
        </div>
      </div>
      <div className='relative h-screen w-3/4 p-10'>
        <h2>Preview</h2>
        <VideoPreview settings={settings} />
      </div>
    </div>
  );
}
