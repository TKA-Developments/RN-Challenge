import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import NotFoundScreen from '../screens/NotFoundScreen';
import SignInScreen from '../screens/SignInScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import { isLoggedIn } from '../action/Auth';
import CreateTODOModal from '../screens/CreateTODOModal';

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const MainStack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <MainStack.Navigator
      initialRouteName={isLoggedIn() ? 'Root' : 'SignIn'}
    >
      <MainStack.Screen name="Root" component={BottomTabNavigator}
                        options={{ headerShown: false }}/>
      <MainStack.Screen name="SignIn" component={SignInScreen}/>
      <MainStack.Screen
        name="CreateTODO"
        component={CreateTODOModal}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />
      <MainStack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }}/>
    </MainStack.Navigator>
  );
};
