import { types } from '../types/types';
import {
  firebase,
  googleAuthProvider,
  facebookAuthProvider,
} from '../firebase/firebase-config';
import { starLoading, finishLoading } from './ui';
import Swal from 'sweetalert2';
import { logoutNotes } from './notes';

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(starLoading());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(finishLoading());
        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => {
        console.log(e);
        dispatch(finishLoading());
        Swal.fire('Error', e.message, 'error');
      });
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({
          displayName: name,
        });
        dispatch(login(user.uid, user.displayName));
      })
      .catch(({ message }) => {
        console.log(message);
        Swal.fire('Error', message, 'error');
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    dispatch(starLoading());
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch(({ message }) => {
        console.log(message);
        dispatch(finishLoading());
      });
  };
};

export const startFacebookLogin = () => {
  return (dispatch) => {
    dispatch(starLoading());
    firebase
      .auth()
      .signInWithPopup(facebookAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch(({ message }) => {
        console.log(message);
        dispatch(finishLoading());
      });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
    dispatch(logoutNotes());
  };
};

export const logout = () => ({
  type: types.logout,
});
