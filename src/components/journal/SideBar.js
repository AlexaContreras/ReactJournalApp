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
        <h3 className='mt-5 journal__sidebar-user'>
          <i className='fa fa-user fa-xs'></i>
          <span> {name} </span>
        </h3>
        <button onClick={handleLogout} className='btn-notes mt-1 mr-1'>
          Logout
        </button>
      </div>

      <div className='journal__new-entry' onClick={handleNewEntry}>
        <i className='far fa-calendar-plus fa-5x'></i>
        <p className='mt-5'>New entry</p>
      </div>
      <JournalEntries />
    </aside>
  );
};
