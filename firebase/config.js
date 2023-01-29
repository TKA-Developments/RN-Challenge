import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAe1Y10Tw1hASkC2yGWZDnXyY-rliIXAKk",
  authDomain: "rn-challenge-b7649.firebaseapp.com",
  projectId: "rn-challenge-b7649",
  storageBucket: "rn-challenge-b7649.appspot.com",
  messagingSenderId: "391055486470",
  appId: "1:391055486470:web:c875e13187f9e748d91d87"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase }

