import Auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';

type UserData = FirebaseAuthTypes.User | null;

export default (): [
  UserData,
  React.Dispatch<React.SetStateAction<UserData>>,
] => {
  const [user, setUser] = useState<UserData>(null);

  useEffect(() => {
    const unsubscribeAuthStateListener = Auth()
      .onAuthStateChanged((user_) => {
        setUser(user_);
      });
    return () => {
      unsubscribeAuthStateListener();
    };
  }, []);

  return [user, setUser];
};
