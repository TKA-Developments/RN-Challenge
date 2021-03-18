import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../../screens/SignInScreen';
import { AuthStackParamList } from '../../types';
import SignUpScreen from '../../screens/SignUpScreen';

export const AuthStack = createStackNavigator<AuthStackParamList>();

export default () => (
  <AuthStack.Navigator
    headerMode="screen"
  >
    <AuthStack.Screen
      name="SignInScreen"
      component={SignInScreen}
      options={{
        title: 'SIGN IN',
      }}
    />
    <AuthStack.Screen
      name="SignUpScreen"
      component={SignUpScreen}
      options={{
        title: 'SIGN UP',
      }}
    />
  </AuthStack.Navigator>
);
