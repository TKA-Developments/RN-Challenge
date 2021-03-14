import Firebase from 'firebase';
import { useEffect, useState } from 'react';

export default () => {
  const [isUserAuth, setUser] = useState<Firebase.User | null>(null);

  useEffect(() => {
    Firebase.auth()
      .onAuthStateChanged((user) => {
        setUser(user);
      });
  }, []);

  return isUserAuth;
};
