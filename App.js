import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
     <NavigationContainer>
       <Stack.Navigator>
          <Stack.Screen name="To Do List" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}/>
       </Stack.Navigator>
     </NavigationContainer>
  );
}