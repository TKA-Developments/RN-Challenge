import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../../screens/SignInScreen';

type AuthStackParamList = {
  SignIn: undefined,
  SignUp: undefined,
};

const AuthStack = createStackNavigator<AuthStackParamList>();

// TODO
// Header not showing for some unknown reason
export default () => {
  return (
    <AuthStack.Navigator
      initialRouteName="SignIn"
      headerMode="screen"
    >
      <AuthStack.Screen name="SignIn" component={SignInScreen}/>
      {/*<AuthStack.Screen name="SignUp" component={SignUpScreen} />*/}
    </AuthStack.Navigator>
  );
};
