// import Firebase from 'firebase';
import Auth from '@react-native-firebase/auth';

export const signIn = (email: string, password: string) => Auth()
  .signInWithEmailAndPassword(email, password);

export const signOut = () => Auth()
  .signOut();

export const isLoggedIn = () => Auth().currentUser !== null;

export const currentUser = () => Auth().currentUser;

