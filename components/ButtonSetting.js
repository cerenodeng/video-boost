'use client';
import { Fragment, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PlusIcon } from './Icon';
import Input from './Input';
import Select from './Select';

export default function ButtonSetting({ returnSettings, returnSettingCards }) {
  const [settings, setSettings] = useState(new Map());
  const [settingCards, setSettingCards] = useState([]);
  const [data, setData] = useState('');
  useEffect(() => {
    setData(JSON.stringify(Object.fromEntries(settings)));
    returnSettings(settings);
  }, [settings, returnSettings]);
  useEffect(() => {
    returnSettingCards(settingCards);
  }, [settingCards, returnSettingCards]);

  function SettingCard() {
    const uuid = useRef(uuidv4());
    const selectOptions = [
      { id: 1, value: 'full', label: 'Full' },
      { id: 2, value: 'fit', label: 'Fit' },
      { id: 3, value: 'compact', label: 'Compact' },
    ];

    return (
      <div className='flex flex-col gap-y-2 bg-neutral-50 p-6 shadow-sm'>
        <Input
          label='Title'
          name='title'
          placeholder='Button title'
          uuid={uuid.current}
          returnValue={returnValue}
        />
        <Input
          label='Title Color'
          name='titleColor'
          placeholder='Title text color'
          uuid={uuid.current}
          returnValue={returnValue}
          occupy
        />
        <Input
          label='Background Color'
          name='bgColor'
          placeholder='Button background color'
          uuid={uuid.current}
          returnValue={returnValue}
          occupy
        />
        <Select
          label='Width'
          name='width'
          placeholder='Button Width'
          uuid={uuid.current}
          options={selectOptions}
          returnValue={returnValue}
          occupy
        />
      </div>
    );
  }

  // store button's settings from input or select
  function returnValue(type, id, value) {
    setSettings((settings) => {
      const found = settings.get(id);
      if (typeof found === 'undefined') {
        const data = {};
        data[type] = value;
        return settings.set(id, data);
      } else {
        const newSettings = new Map();
        [...settings.keys()].map((key) => {
          if (key == id) {
            const data = { ...found };
            data[type] = value;
            newSettings.set(key, data);
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
