// import Firebase from 'firebase';
import Auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';

export default () => {
  const [isUserAuth, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const unsubscribeAuthStateListener = Auth()
      .onAuthStateChanged((user) => {
        setUser(user);
      });
    return () => {
      unsubscribeAuthStateListener();
    };
  }, []);

  return isUserAuth;
};
