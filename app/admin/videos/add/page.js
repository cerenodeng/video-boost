import ButtonSetting from './ButtonSetting';
import VideoSetting from './VideoSetting';
import Preview from '@/components/Preview';

export default function AddVideo() {
  return (
    <div className='flex'>
      <div className='flex w-1/4 flex-col'>
        <div className='flex flex-col gap-y-4 bg-neutral-100 p-4'>
          <VideoSetting />
          <ButtonSetting />
        </div>
      </div>
      <Preview />
    </div>
  );
}
