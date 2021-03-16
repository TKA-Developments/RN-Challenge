import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { DiscoverParamList } from '../types';
import DiscoverScreen from '../screens/DiscoverScreen';

export const TabDiscoverStack = createStackNavigator<DiscoverParamList>();

export const TabDiscoverStackNavigator = () => {
  return (
    <TabDiscoverStack.Navigator>
      <TabDiscoverStack.Screen
        name="DiscoverScreen"
        component={DiscoverScreen}
        options={{ headerTitle: 'TO DO' }}
      />
    </TabDiscoverStack.Navigator>
  );
};
