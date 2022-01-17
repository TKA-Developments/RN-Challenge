import { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { auth } from '../firebase';
import { RootTabScreenProps } from '../types';
import AccountLogedInPage from './AccountLogedInPage';
import AccountNotLoginPage from './AccountNotLogInPage';

export default function TabAccount({navigation}: RootTabScreenProps<'TabAccount'>) {


  const [isAuth, setIsAuth] = useState(false)
  useEffect(() => {
    const subscribe = auth.onAuthStateChanged(user=>{
      if(user){
        setIsAuth(true)
      }else{
        setIsAuth(false)
      }
    })
    return subscribe
  }, [])

  if(isAuth){
    return (
      <AccountLogedInPage />
    )
  }
  return (
    <AccountNotLoginPage />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
