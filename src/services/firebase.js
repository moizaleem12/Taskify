import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:   import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:  import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:   import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:  import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL:  import.meta.env.VITE_FIREBASE_DATABASE_URL,
  measurementId:   import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

export { firebaseApp, firestore };