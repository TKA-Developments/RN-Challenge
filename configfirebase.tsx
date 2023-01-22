// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA730L1nzgNZFv-N0-Z2x2VXaVXwqmn36k",
  authDomain: "rn-challenge-dd223.firebaseapp.com",
  databaseURL: "https://rn-challenge-dd223-default-rtdb.firebaseio.com",
  projectId: "rn-challenge-dd223",
  storageBucket: "rn-challenge-dd223.appspot.com",
  messagingSenderId: "566970168809",
  appId: "1:566970168809:web:e5b44aabfaf5b66c0a0778",
  measurementId: "G-ME6YZ90JPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);