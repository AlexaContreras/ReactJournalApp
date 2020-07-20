import React from 'react';
import { JournalEntries } from './JournalEntries';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { starNewNote } from '../../actions/notes';

export const SideBar = () => {
  const { name } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleNewEntry = () => {
    dispatch(starNewNote());
  };

  return (
    <aside className='journal__sidebar'>
      <div className='journal__sidebar-navbar'>
        <h3 className='journal__sidebar-user'>
          <i className='fa fa-user fa-xs'></i>
          <span> {name} </span>
        </h3>
        <button onClick={handleLogout} className='btn-notes-logout '>
          Logout
        </button>
      </div>

      <div className='journal__new-entry' onClick={handleNewEntry}>
        <div className='journal__new-entry-div'>
          <i className='fas fa-plus fa-2x'></i>

          <p className='ml-2'>Add note</p>
        </div>
      </div>
      <JournalEntries />
    </aside>
  );
};
