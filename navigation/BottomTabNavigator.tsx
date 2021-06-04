import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabLoginScreen from '../screens/TabLoginScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabRegisterScreen from '../screens/TabRegisterScreen';
import TabTaskScreen from '../screens/TabTaskScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TestScreen from '../screens/TestScreen';
import { BottomTabParamList, TabTaskParamList, MainTabParamList } from '../types';
import firebase from 'firebase'
import Navigation from '.';
import AuthTabNavigator from './AuthTabNavigator';


const MainTab = createStackNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <MainTab.Navigator
      screenOptions={{headerShown: false}}
    >
       <MainTab.Screen
        name="TabDashboard"
        component={BottomTabNavigator}
      />
      <MainTab.Screen
        name="TabAuth"
        component={AuthTabNavigator}
      />
    </MainTab.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
        <BottomTab.Screen
          name="TabTask"
          component={TabTaskNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
          }}
        />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const TabTaskStack = createStackNavigator<TabTaskParamList>()

function TabTaskNavigator() {
  return (
    <TabTaskStack.Navigator>
      <TabTaskStack.Screen
        name="TabTask"
        component={TabTaskScreen}
        options={{headerTitle: "Tab Task Screen"}}
      />
    </TabTaskStack.Navigator>
  )
}


// const TabOneStack = createStackNavigator<TabOneParamList>();

// function TabOneNavigator() {
//   return (
//     <TabOneStack.Navigator>
//       <TabOneStack.Screen
//         name="TabOneScreen"
//         component={TabOneScreen}
//         options={{ headerTitle: 'Tab One Title' }}
//       />
//     </TabOneStack.Navigator>
//   );
// }

// const TabTwoStack = createStackNavigator<TabTwoParamList>();

// function TabTwoNavigator() {
//   return (
//     <TabTwoStack.Navigator>
//       <TabTwoStack.Screen
//         name="TabTwoScreen"
//         component={TabTwoScreen}
//         options={{ headerTitle: 'Tab Two Title' }}
//       />
//     </TabTwoStack.Navigator>
//   );
// }


