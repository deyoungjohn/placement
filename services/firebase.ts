import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase project configuration for the project
const firebaseConfig = {
  apiKey: "AIzaSyDsbT4Sd67XblxsyhIp7MB6FLv0sutaelA",
  authDomain: "placement-finder-9284d.firebaseapp.com",
  projectId: "placement-finder-9284d",
  storageBucket: "placement-finder-9284d.firebasestorage.app",
  messagingSenderId: "171967895845",
  appId: "1:171967895845:web:2dbce32ceefa638ce462cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
