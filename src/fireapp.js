import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.FIREBASE_MSG_SENDER_ID,
  appId: import.meta.env.FIREBASE_APP_ID,
};

const fireapp = initializeApp(firebaseConfig);

export default fireapp;
