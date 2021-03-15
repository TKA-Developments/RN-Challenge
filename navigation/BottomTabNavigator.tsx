import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { BottomTabParamList } from '../types';
import { StyleSheet } from 'react-native';
import { TabDiscoverStackNavigator } from './TabDiscoverStack';
import { TabMoreStackNavigator } from './TabMoreStack';

const styles = StyleSheet.create({
  bottomTabStyle: {},
});

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <>
      <BottomTab.Navigator
        initialRouteName="Discover"
        tabBarOptions={{
          activeTintColor: Colors[colorScheme].tint,
          labelStyle: {
            fontSize: 15,
            marginVertical: 5,
          },
          style: {
            borderTopWidth: 1,
          },
          tabStyle: {
            paddingTop: 30,
          },
        }}
      >
        <BottomTab.Screen
          name="Discover"
          component={TabDiscoverStackNavigator}
          options={{
            tabBarIcon: ({
              color,
              size
            }) =>
              <MaterialCommunityIcons size={25} color={color} name="compass"/>
          }}
        />
        <BottomTab.Screen
          name="More"
          component={TabMoreStackNavigator}
          options={{
            tabBarIcon: ({
              color,
              size,
            }) => <MaterialCommunityIcons size={25} color={color} name="dots-horizontal"/>,
          }}
        />
      </BottomTab.Navigator>
    </>
  );
}

