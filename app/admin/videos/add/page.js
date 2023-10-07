import VideoSetting from './VideoSetting';
import ButtonSetting from './ButtonSetting';
import VideoPreview from './VideoPreview';

export default function AddVideo() {
  const [settings, setSettings] = useState(new Map());
  const [settingCards, setSettingCards] = useState([]);

  return (
    <div className='flex'>
      <div className='flex w-1/4 flex-col'>
        <div className='flex flex-col gap-y-4 bg-neutral-100 p-4'>
          <VideoSetting />
          <ButtonSetting
            returnSettings={(results) => setSettings(results)}
            returnSettingCards={(results) => setSettingCards(results)}
          />
        </div>
      </div>
      <div className='relative h-screen w-3/4 p-10'>
        <h2>Preview</h2>
        <VideoPreview settings={settings} settingCards={settingCards} />
      </div>
    </div>
  );
}
