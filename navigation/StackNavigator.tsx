import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import PlanningScreen from "../screens/PlanningScreen";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DoneIt" component={HomeScreen} />
      <Stack.Screen name="To Do List" component={PlanningScreen}/>
    </Stack.Navigator>
  );
}

export { MainStackNavigator };