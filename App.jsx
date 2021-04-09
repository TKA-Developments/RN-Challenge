import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./screens/HomeScreen";
import TodoList from "./screens/ToDoListScreen";
import EditList from "./screens/EditListScreen";
import Colors from "./constants/Colors";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Todo App" component={Home} />
        <Stack.Screen
          name="TodoList"
          component={TodoList}
          options={({ route }) => {
            return {
              title: route.params.title,
              headerStyle: {
                backgroundColor: route.params.color,
              },
              headerTintColor: "white",
            };
          }}
        />
        <Stack.Screen
          name="Edit"
          component={EditList}
          options={({ route }) => {
            return {
              title: route.params.title
                ? `Edit ${route.params.title} list`
                : "Create new list",
              headerStyle: {
                backgroundColor: route.params.color || Colors.blue,
              },
              headerTintColor: "white",
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
