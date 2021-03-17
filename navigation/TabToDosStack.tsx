import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ToDosParamList } from '../types';
import DiscoverScreen from '../screens/DiscoverScreen';

export const TabToDosStack = createStackNavigator<ToDosParamList>();

export const TabDiscoverStackNavigator = () => (
  <TabToDosStack.Navigator>
    <TabToDosStack.Screen
      name="ToDosScreen"
      component={DiscoverScreen}
      options={{ headerTitle: 'TO DO' }}
    />
  </TabToDosStack.Navigator>
);
