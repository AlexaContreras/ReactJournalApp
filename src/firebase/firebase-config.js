import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCdC9iGQnYaeX9p8Ju67XnwBER5UR3wot0',
  authDomain: 'journal-app-react-5b37f.firebaseapp.com',
  databaseURL: 'https://journal-app-react-5b37f.firebaseio.com',
  projectId: 'journal-app-react-5b37f',
  storageBucket: 'journal-app-react-5b37f.appspot.com',
  messagingSenderId: '229534193212',
  appId: '1:229534193212:web:0272ebf8b4a50ef22a1539',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export { db, googleAuthProvider, facebookAuthProvider, firebase };
