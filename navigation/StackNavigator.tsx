import { createStackNavigator } from "@react-navigation/stack";
import Todo from "../screens/Todo";
import EditTodo from "../screens/EditTodo";
import * as React from "react";
import TryScreen from "../screens/TryScreen";
const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="TryScreen" component={TryScreen} /> */}
      <Stack.Screen
        name="Todo"
        component={Todo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit Todo"
        component={EditTodo}
        options={{
          headerStyle: { backgroundColor: "#FBFDFF" },
          headerTitleStyle: {
            fontFamily: "Poppins-SemiBold",
            textAlignVertical: "bottom",
          },
        }}
      />
    </Stack.Navigator>
  );
}
