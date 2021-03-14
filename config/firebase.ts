import firebase from "firebase/app";
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCW_GntIyHnKv60_zpWxIHbhwM_TV9Dwgw",
    authDomain: "react-native-challenge-60e03.firebaseapp.com",
    projectId: "react-native-challenge-60e03",
    storageBucket: "react-native-challenge-60e03.appspot.com",
    messagingSenderId: "746871870412",
    appId: "1:746871870412:web:a8b9c9ca934db3ed7e4369"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;