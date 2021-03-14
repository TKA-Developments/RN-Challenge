import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import DiscoverScreen from '../screens/DiscoverScreen';
import TabTwoScreen from '../screens/MoreScreen';
import { BottomTabParamList, DiscoverParamList, TabMoreParamList } from '../types';
import { StyleSheet } from 'react-native';

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
        }}
      >
        <BottomTab.Screen
          name="Discover"
          component={TabDiscoverNavigator}
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
          component={TabTwoNavigator}
          options={{
            tabBarIcon: ({
              color,
              size
            }) => <MaterialCommunityIcons size={25} color={color} name="dots-horizontal"/>,
          }}
        />
      </BottomTab.Navigator>
    </>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabDiscoverStack = createStackNavigator<DiscoverParamList>();

function TabDiscoverNavigator() {
  return (
    <TabDiscoverStack.Navigator>
      <TabDiscoverStack.Screen
        name="DiscoverScreen"
        component={DiscoverScreen}
        options={{ headerTitle: 'DISCOVER' }}
      />
    </TabDiscoverStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabMoreParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabMoreScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'MORE' }}
      />
    </TabTwoStack.Navigator>
  );
}
