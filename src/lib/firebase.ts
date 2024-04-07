// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBm5RBO6gOtVnLk2y0WKNxIztCZiq0rkmY",
  authDomain: "todo-app-65d7c.firebaseapp.com",
  projectId: "todo-app-65d7c",
  storageBucket: "todo-app-65d7c.appspot.com",
  messagingSenderId: "724167064048",
  appId: "1:724167064048:web:ed0db4c41d4fb1a763c535",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
