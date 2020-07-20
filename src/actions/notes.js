import { db } from '../firebase/firebase-config';
import { types } from '../types/types';
import { loadNotes } from '../helpers/loadNotes';
import Swal from 'sweetalert2';
import { fileUpload } from '../helpers/fileUpload';

export const starNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

    dispatch(activeNote(doc.id, newNote));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const addNewNote = (id, note) => ({
  type: types.notesNewEntry,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!note.url) {
      delete note.url;
    }

    const noteTofirestore = { ...note };
    delete noteTofirestore.id;

    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteTofirestore);

    dispatch(refreshNote(note.id, noteTofirestore));

    Swal.fire('Saved', note.title, 'success');
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdate,
  payload: {
    id,
    note: { id, ...note },
  },
});

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: note } = getState().notes;

    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    const fileUrl = await fileUpload(file);
    note.url = fileUrl;

    dispatch(startSaveNote(note));

    Swal.close();
  };
};

export const startDelete = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    await db
      .doc(`${uid}/journal/notes/${id}`)
      .delete()
      .then(() => {
        Swal.fire('Deleted', 'Success', 'success');
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err,
        });
      });

    dispatch(deleteNote(id));
  };
};

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const logoutNotes = () => ({
  type: types.notesLogoutClean,
});
