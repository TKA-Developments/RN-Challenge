import 'expo-firestore-offline-persistence';
import { useEffect, useState } from 'react';
import Database from '@react-native-firebase/database';

const initializer = async () => {
  await Database()
    .setPersistenceEnabled(true);
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
