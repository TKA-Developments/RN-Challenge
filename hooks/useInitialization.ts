import { useEffect, useState } from 'react';
import Firebase from 'firebase';
import firebaseCredentials from '../constants/Firebase';

const initializer = async () => {
  if (Firebase.apps.length === 0) {
    Firebase.initializeApp(firebaseCredentials);

    Firebase.firestore()
      .settings({
        cacheSizeBytes: Firebase.firestore.CACHE_SIZE_UNLIMITED,
      });

    await Firebase
      .firestore()
      .enablePersistence();
  }
};

export default () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializer()
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return isLoading;
};
