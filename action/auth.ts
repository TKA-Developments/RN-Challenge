import Firebase from 'firebase';

export const signIn = (email: string, password: string) =>
  Firebase.auth()
    .setPersistence(Firebase.auth.Auth.Persistence.LOCAL)
    .then(() => Firebase.auth()
      .signInWithEmailAndPassword(email, password))
    .catch((e) => Promise.reject(e));

export const signOut = () => Firebase.auth()
  .signOut();

export const isLoggedIn = () => Firebase.auth().currentUser !== null;
