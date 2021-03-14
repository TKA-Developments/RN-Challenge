import 'expo-firestore-offline-persistence';
import { useEffect, useState } from 'react';
import Database from '@react-native-firebase/database';

const initializer = async () => {
  // console.log('test');
  // if (FirebaseApp.apps.length === 0) {
  //   console.log('test');
  //   await FirebaseApp.initializeApp(firebaseCredentials);
  // Firebase.firestore()
  //   .settings({
  //     cacheSizeBytes: Firebase.firestore.CACHE_SIZE_UNLIMITED,
  //   });

  // await Firebase
  //   .firestore()
  //   .enablePersistence();
  await Database()
    .setPersistenceEnabled(true);
  // }
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
