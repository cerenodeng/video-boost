import ButtonSetting from './ButtonSetting';
import VideoUpload from './VideoUpload';

export default function Builder() {
  return (
    <div className='flex w-1/4 flex-col'>
      <div className='flex flex-col gap-y-4 bg-neutral-100 p-4'>
        <VideoUpload />
        <ButtonSetting />
      </div>
    </div>
  );
}
