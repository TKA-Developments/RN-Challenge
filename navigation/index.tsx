import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import SignInScreen from '../screens/SignInScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import { isLoggedIn } from '../action/auth';
import CreateTODOModal from '../screens/CreateTODOModal';

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn() ? 'Root' : 'SignIn'}
    >
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }}/>
      <Stack.Screen name="SignIn" component={SignInScreen}/>
      <Stack.Screen
        name="CreateTODO"
        component={CreateTODOModal}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }}/>
    </Stack.Navigator>
  );
};

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator/>
    </NavigationContainer>
  );
}
