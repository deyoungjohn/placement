import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase project configuration for the Final Year Project
const firebaseConfig = {
  apiKey: "AIzaSyDsbT4Sd67XblxsyhIp7MB6FLv0sutaelA",
  authDomain: "placement-finder-9284d.firebaseapp.com",
  projectId: "placement-finder-9284d",
  storageBucket: "placement-finder-9284d.firebasestorage.app",
  messagingSenderId: "171967895845",
  appId: "1:171967895845:web:2dbce32ceefa638ce462cc"
};

// Initialize Firebase
// Note: In a real deployment, these would use environment variables.
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
