import Firebase from 'firebase';
import { useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

export default (navigation: StackNavigationProp<RootStackParamList, 'Splash'>) => {
  console.log('a');
  useEffect(() => {
    Firebase.auth()
      .onAuthStateChanged((user) => {
        if (user !== null) {
          console.log('Ok');
          navigation.navigate('Root');
        } else {
          console.log('Not ok');
          navigation.navigate('SignIn');
        }
      });
  }, []);
};
