import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import NotFoundScreen from '../screens/NotFoundScreen';
import { MainStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import CreateTODOModal from '../screens/CreateToDoModal';
import EditToDoScreen from '../screens/EditToDoScreen';
import HeaderDeleteButton from '../components/HeaderRightButton';
import TodaysImageScreen from '../screens/TodaysImageScreen';
import GameDemoScreen from '../screens/GameDemoScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

const MainStack = createStackNavigator<MainStackParamList>();

export const MainNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="BottomTabNavigator"
      component={BottomTabNavigator}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="NotFoundScreen"
      component={NotFoundScreen}
      options={{ title: 'Oops!' }}
    />
    <MainStack.Screen
      name="CreateToDoModal"
      component={CreateTODOModal}
      options={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          // cardStyle: {
          //   opacity: progress.interpolate({
          //     inputRange: [0, 0.5, 0.9, 1],
          //     outputRange: [0, 0.25, 0.7, 1],
          //   }),
          // },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }),
          },
        }),
      }}
    />
    <MainStack.Screen
      name="EditToDoScreen"
      component={EditToDoScreen}
      options={{
        headerRight: (_) => <HeaderDeleteButton />,
        title: '',
      }}
    />
    <MainStack.Screen
      name="TodaysImageScreen"
      component={TodaysImageScreen}
      options={{ title: 'Today\'s Image' }}
    />
    <MainStack.Screen
      name="GameDemoScreen"
      component={GameDemoScreen}
      options={{ title: 'Mario Jump Demo' }}
    />
    <MainStack.Screen
      name="ChangePasswordScreen"
      component={ChangePasswordScreen}
      options={{ title: 'Change Password' }}
    />
  </MainStack.Navigator>
);
