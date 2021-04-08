import firebase from "firebase/app";
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD1yq7qSaRp9-mhZ99VOf9vWmPFt-_BSqQ",
  authDomain: "reactnativechallenge.firebaseapp.com",
  projectId: "reactnativechallenge",
  storageBucket: "reactnativechallenge.appspot.com",
  messagingSenderId: "447973912472",
  appId: "1:447973912472:web:b417dc4005dc6348dc45ed"
};

firebase.initializeApp(firebaseConfig);

export default firebase;