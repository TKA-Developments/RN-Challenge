import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBC29JellXRIUAiUz26104iRA2CKc7XgPM",
  authDomain: "watchuwan-todo.firebaseapp.com",
  projectId: "watchuwan-todo",
  storageBucket: "watchuwan-todo.appspot.com",
  messagingSenderId: "1061551372934",
  appId: "1:1061551372934:web:13b3a6a7e6f9375351af07",
  measurementId: "G-ZDN5HHNC49",
};
// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default firebase;
