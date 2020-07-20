import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startSaveNote,
  startUploading,
  addNewNote,
} from '../../../actions/notes';
import moment from 'moment';

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const { active: note } = notes;
  const notesArray = notes.notes;

  const handleSave = () => {
    dispatch(startSaveNote(note));

    const noteFound = notesArray.find((noteArray) => noteArray.id === note.id);

    if (!noteFound) {
      dispatch(addNewNote(note.id, note));
    }
  };

  const handlePicture = () => {
    document.querySelector('#fileSelector').click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      dispatch(startUploading(file));
    }
  };

  const date = new Date().getTime();
  const newDate = moment(date);

  return (
    <div className='notes__app-bar'>
      <span>{newDate.format('dddd, MMMM Do YYYY')}</span>

      <input
        id='fileSelector'
        type='file'
        name='file'
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div>
        <button className='btn-notes mr-5' onClick={handlePicture}>
          Picture
        </button>
        <button className='btn-notes' onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
