// Import the functions you need from the SDKs you need
import firebase from "firebase";
require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeGhwTjZLDRKc3qn8qMhhPGHFBS4ckJQs",
  authDomain: "rnproject-c7f7e.firebaseapp.com",
  projectId: "rnproject-c7f7e",
  storageBucket: "rnproject-c7f7e.appspot.com",
  messagingSenderId: "465052399242",
  appId: "1:465052399242:web:fabbf4ddb0d8861033df73",
  measurementId: "G-B4B7TCFMS4"
};

// Initialize Firebase
let app
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app()
}

firebase.firestore().settings({ experimentalForceLongPolling: true });

export const auth = firebase.auth()
export const db = firebase.firestore();
// export const storage = firebase.storage();