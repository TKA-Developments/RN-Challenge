import React from "react";
import {createStackNavigator, HeaderTitle} from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import PlanningScreen from "../screens/PlanningScreen";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerTransparent: true,
      headerTintColor: "#fed049",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }}>
      <Stack.Screen name="DUNNIT" component={HomeScreen} />
      <Stack.Screen name="TASK LIST" component={PlanningScreen}/>
    </Stack.Navigator>
  );
}

export { MainStackNavigator };