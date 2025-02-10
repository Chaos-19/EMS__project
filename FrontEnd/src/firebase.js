// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "emsproject-50f27.firebaseapp.com",
  projectId: "emsproject-50f27",
  storageBucket: "emsproject-50f27.firebasestorage.app",
  messagingSenderId: "566965077593",
  appId: "1:566965077593:web:ecc72c0493c5cce8119348"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);