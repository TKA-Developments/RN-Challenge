import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { BottomTabParamList } from '../types';
import { TabDiscoverStackNavigator } from './TabToDosStack';
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
          name="ToDosStack"
          component={TabDiscoverStackNavigator}
          options={{
            tabBarIcon: ({
              color,
              size,
            }) => <Octicons size={25} color={color} name="checklist"/>,
            title: 'To Do',
          }}
        />
        <BottomTab.Screen
          name="MoreStack"
          component={TabMoreStackNavigator}
          options={{
            tabBarIcon: ({
              color,
              size,
            }) => <MaterialCommunityIcons size={25} color={color} name="dots-horizontal"/>,
            title: 'More',
          }}
        />
      </BottomTab.Navigator>
    </>
  );
}
