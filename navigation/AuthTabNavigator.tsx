import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import TabLoginScreen from '../screens/TabLoginScreen';
import TabRegisterScreen from '../screens/TabRegisterScreen';
import { BottomTabParamList, TabTaskParamList, TabAuthParamList, TabLoginParamList, TabRegisterParamList } from '../types';


const TabAuthStack = createStackNavigator<TabAuthParamList>()

export default function AuthTabNavigator() {
  return (
    <TabAuthStack.Navigator
        screenOptions={{headerShown: false}}
    >
      <TabAuthStack.Screen 
        name="TabLogin"
        component={TabLoginNavigator}
      />
      <TabAuthStack.Screen 
        name="TabRegister"
        component={TabRegisterNavigator}
      />
    </TabAuthStack.Navigator>
  )
} 

const TabLoginStack = createStackNavigator<TabLoginParamList>()

function TabLoginNavigator() {
    return (
        <TabLoginStack.Navigator
        screenOptions={{headerShown: false}}
        >
          <TabLoginStack.Screen 
            name="TabLogin"
            component={TabLoginScreen}
          />
        </TabLoginStack.Navigator>
    )
}

const TabRegisterStack = createStackNavigator<TabRegisterParamList>()

function TabRegisterNavigator() {
  return (
    <TabRegisterStack.Navigator
    screenOptions={{headerShown: false}}
    >
      <TabRegisterStack.Screen
        name="TabRegister"
        component={TabRegisterScreen}
      />
    </TabRegisterStack.Navigator>
  )
}