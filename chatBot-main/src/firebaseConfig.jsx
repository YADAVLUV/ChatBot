// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import {Fire_API_KEY}from '@env';
// Firebase configuration
const firebaseConfig = {
  apiKey: Fire_API_KEY,
  authDomain: "chatbot-dc523.firebaseapp.com",
  databaseURL: "https://chatbot-dc523-default-rtdb.firebaseio.com/",
  projectId: "chatbot-dc523",
  storageBucket: "chatbot-dc523.firebasestorage.app",
  messagingSenderId: "977578212058",
  appId: "1:977578212058:android:7fc650e51fcc53445443e3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
