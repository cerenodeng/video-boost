'use client';
import DataTable from '@/components/DataTable';
import UserAdd from '@/components/UserAdd';
import UserEdit from '@/components/UserEdit';
import { useState } from 'react';

export default function Users() {
  const headers = ['Name', 'Email'];
  const names = ['user', 'users'];
  const [addMode, setAddMode] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [userId, setUserId] = useState(null);

  function returnId(id) {
    setUserId(id);
    setEditMode(true);
  }

  return (
    <div className='flex'>
      {addMode && <UserAdd close={() => setAddMode(false)} />}
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
