'use client';
import DataTable from '@/components/DataTable';
import UserEdit from '@/components/UserEdit';
import { useState } from 'react';

export default function Users() {
  const headers = ['Name', 'Email'];
  const names = ['user', 'users'];
  const [editMode, setEditMode] = useState(false);
  const [userId, setUserId] = useState(null);

  function returnId(id) {
    console.log(new Date(), id);
    setUserId(id);
    setEditMode(!editMode);
  }

  return (
    <>
      {editMode && <UserEdit id={userId} />}
      <DataTable
        headers={headers}
        names={names}
        path='users'
        returnId={returnId}
      />
    </>
  );
}
