'use client';
import DataTable from '@/components/DataTable';
import UserEdit from '@/components/UserEdit';
import { useState } from 'react';

export default function Users({ params }) {
  let defaultEditMode;
  if (params.path && params.path[0] == 'add') {
    defaultEditMode = true;
  } else {
    defaultEditMode = false;
  }
  const headers = ['Name', 'Email'];
  const names = ['user', 'users'];
  const [editMode, setEditMode] = useState(defaultEditMode);
  const [userId, setUserId] = useState(null);

  function returnId(id) {
    setUserId(id);
    setEditMode(true);
  }

  return (
    <div className='flex'>
      {editMode && <UserEdit id={userId} close={() => setEditMode(false)} />}
      <div className={editMode ? 'ml-96' : ''}>
        <DataTable
          headers={headers}
          names={names}
          path='users'
          returnId={returnId}
        />
      </div>
    </div>
  );
}
