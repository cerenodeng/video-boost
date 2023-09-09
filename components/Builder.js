import VideoUpload from './VideoUpload';

export default function Builder() {
  return (
    <div className="flex flex-col w-1/4">
      <div className="flex flex-col p-4 bg-neutral-100">
        <VideoUpload />
      </div>
    </div>
  );
}