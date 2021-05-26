import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeParamList, CreateTaskParamList } from '../types';

import Home from '../screens/Home';
import CreateTask from '../screens/CreateTask';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="CreateTask" component={CreateTask} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// const HomeStack = createStackNavigator<HomeParamList>();

// function HomeNavigator() {
//   return (
//     <HomeStack.Navigator
//       screenOptions={{
//         headerShown: false
//       }}
//     >
//       <HomeStack.Screen 
//         name="HomeScreen"
//         component={Home}
//       />
//     </HomeStack.Navigator>
//   )
// }

// const CreateTaskStack = createStackNavigator<CreateTaskParamList>();

// function CreateTaskNavigator() {
//   return (
//     <CreateTaskStack.Navigator
//       screenOptions={{
//         headerShown: false
//       }}
//     >
//       <CreateTaskStack.Screen 
//         name="CreateTaskScreen"
//         component={CreateTask}
//       />
//     </CreateTaskStack.Navigator>
//   )
// }

export default Navigator;