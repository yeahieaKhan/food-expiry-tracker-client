// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDL70gWbohtt1dkvsjacxkqOiZJ_Ze21Us",
  authDomain: "foot-expiry-tracker-syster.firebaseapp.com",
  projectId: "foot-expiry-tracker-syster",
  storageBucket: "foot-expiry-tracker-syster.firebasestorage.app",
  messagingSenderId: "1041521315791",
  appId: "1:1041521315791:web:e2b9d23500f4e1538f0cba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
