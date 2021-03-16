import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { BottomTabParamList } from '../types';
import { StyleSheet } from 'react-native';
import { TabDiscoverStackNavigator } from './TabDiscoverStack';
import { TabMoreStackNavigator } from './TabMoreStack';
import { useThemeColors } from '../components/Themed';

const styles = StyleSheet.create({
  bottomTabStyle: {},
});

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const color = useThemeColors();

  return (
    <>
      <BottomTab.Navigator
        tabBarOptions={{
          activeTintColor: color.primary,
          inactiveTintColor: color.tabIconDefault,
          activeBackgroundColor: color.secondaryBackground,
          inactiveBackgroundColor: color.secondaryBackground,
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

