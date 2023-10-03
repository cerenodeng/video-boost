'use client';
import { Fragment, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PlusIcon } from './Icon';
import Input from './Input';

export default function ButtonSetting() {
  const [settings, setSettings] = useState(new Map());
  const [settingCards, setSettingCards] = useState([]);
  const [data, setData] = useState('');
  useEffect(() => {
    setData(JSON.stringify(Object.fromEntries(settings)));
  }, [settings]);

  function SettingCard() {
    const uuid = useRef(uuidv4());

    return (
      <div className='flex flex-col gap-y-2 bg-neutral-50 p-6 shadow-sm'>
        <Input
          label='Title'
          name='title'
          placeholder='Button title'
          uuid={uuid.current}
          returnValue={returnTitle}
        />
        <Input
          label='Background Color'
          name='bgColor'
          placeholder='Button background color'
          uuid={uuid.current}
          returnValue={returnBgColor}
          occupy
        />
      </div>
    );
  }

  // store every button's title
  function returnTitle(id, value) {
    setSettings((settings) => {
      const found = settings.get(id);
      if (typeof found === 'undefined') {
        return settings.set(id, { title: value });
      } else {
        const newSettings = new Map();
        [...settings.keys()].map((key) => {
          if (key == id) {
            newSettings.set(key, { ...found, title: value });
          } else {
            newSettings.set(key, settings.get(key));
          }
        });
        return newSettings;
      }
    });
  }

  function returnBgColor(id, value) {
    setSettings((settings) => {
      const found = settings.get(id);
      if (typeof found === 'undefined') {
        return settings.set(id, { bgColor: value });
      } else {
        const newSettings = new Map();
        [...settings.keys()].map((key) => {
          if (key == id) {
            newSettings.set(key, { ...found, bgColor: value });
          } else {
            newSettings.set(key, settings.get(key));
          }
        });
        return newSettings;
      }
    });
  }

  function onAddClick(event) {
    event.preventDefault();
    setSettingCards([
      ...settingCards,
      { id: uuidv4(), content: <SettingCard /> },
    ]);
  }

  return (
    <form className='flex flex-col items-center gap-y-6'>
      {data}
      {settingCards.map((settingCard) => (
        <Fragment key={settingCard.id}>{settingCard.content}</Fragment>
      ))}
      <button
        type='button'
        className='flex w-32 items-center gap-x-2 self-center rounded bg-white px-5 py-2 hover:bg-emerald-50'
        onClick={onAddClick}
      >
        <PlusIcon />
        <div className='text-lg'>Action</div>
      </button>
    </form>
  );
}
