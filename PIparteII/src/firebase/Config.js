import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD2IZAqI8bmv77bkRnnNjvdWEGDEKLF6Cg",
    authDomain: "pi2prog3.firebaseapp.com",
    projectId: "pi2prog3",
    storageBucket: "pi2prog3.firebasestorage.app",
    messagingSenderId: "1048496638208",
    appId: "1:1048496638208:web:fb282cc1af046979ca4be5"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();