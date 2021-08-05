import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyCgcpmHFwOCGvZtLna6erSgLSG6CkOW4ZE',
  authDomain: 'chat-app-fdc6b.firebaseapp.com',
  projectId: 'chat-app-fdc6b',
  storageBucket: 'chat-app-fdc6b.appspot.com',
  databaseURL:
    'https://chat-app-fdc6b-default-rtdb.asia-southeast1.firebasedatabase.app/',
  messagingSenderId: '527097349740',
  appId: '1:527097349740:web:7ac1883135e4c37a8c3a49',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
