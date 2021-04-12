import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import { Animated, TouchableHighlight, ColorSchemeName, Text } from 'react-native';
import { AddToListButton, View } from '../components/Themed';
import TodoDetailScreen from '../screens/TodoDetailScreen';

import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

export interface Props {
  navigation: any
}

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      // linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName='TabOne'>
      {/* <Stack.Screen name="Root" component={BottomTabNavigator} /> */}
      <Stack.Screen 
        name="TabOne" 
        component={TabOneScreen}         
        options={({navigation}) => ({          
          title: 'Today\'s Plan',
          headerRight: () => (
            <AddToListButton 
              onPress={() => navigation.navigate('TodoDetail')}
              iconPadding={15}
              iconSize={24}/>
          ),
        })}
      />
      <Stack.Screen
        name='TodoDetail'
        component={TodoDetailScreen}
        options={{          
          title: ''
        }}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
