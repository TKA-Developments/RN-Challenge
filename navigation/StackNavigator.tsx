import { createStackNavigator } from "@react-navigation/stack";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import * as React from "react";
const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Todays" component={TabOneScreen} />
      <Stack.Screen name="TabTwoScreen" component={TabTwoScreen} />
    </Stack.Navigator>
  );
}
