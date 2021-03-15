import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TabMoreParamList } from '../types';
import MoreScreen from '../screens/MoreScreen';
import AboutScreen from '../screens/AboutScreen';

export const TabMoreStack = createStackNavigator<TabMoreParamList>();

export const TabMoreStackNavigator = () => {
  return (
    <TabMoreStack.Navigator>
      <TabMoreStack.Screen
        name="TabMoreScreen"
        component={MoreScreen}
        options={{ headerTitle: 'MORE' }}
      />
      <TabMoreStack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{ headerTitle: 'MORE' }}
      />
    </TabMoreStack.Navigator>
  );
};
