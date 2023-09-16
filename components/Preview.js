export default function Preview() {
  return (
    <div className="relative p-10 w-3/4">
      <h2>Preview</h2>
      <div className="absolute right-0 top-0 w-[390px] h-[844px] border border-neutral-300 bg-neutral-100">
        <video src="/demo-video.mp4"></video>
      </div>
    </div>
  );
}