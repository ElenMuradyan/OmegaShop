// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBnpE-1lS2lx8g-I96MhVg3W8W3SWzG4VU",
  authDomain: "omegashop-67199.firebaseapp.com",
  projectId: "omegashop-67199",
  storageBucket: "omegashop-67199.firebasestorage.app",
  messagingSenderId: "503950051302",
  appId: "1:503950051302:web:c7a8ba0e158325da11b827",
  measurementId: "G-DQRW345RF2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export{
    db,
    auth
};