import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./screens/HomeScreen";
import TodoList from "./screens/ToDoListScreen";
import EditList from "./screens/EditListScreen";
import Login from "./screens/LoginScreen";
import Settings from "./screens/SettingsScreen";
import Colors from "./constants/Colors";
import * as firebase from "firebase";
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const AuthScreens = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  );
};

const Screens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Todo App" component={Home} />
      <Stack.Screen name="Settings" component={Settings} />
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
  );
};
export default function App() {
  const [isAutenticated, setIsAutenticated] = useState(false);

  useEffect(() => {
    if (firebase.auth().currentUser) {
      setIsAutenticated(true);
    }
    firebase.auth().onAuthStateChanged((user) => {
      console.log("check auth state");
      if (user) {
        setIsAutenticated(true);
      } else {
        setIsAutenticated(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {isAutenticated ? <Screens /> : <AuthScreens />}
    </NavigationContainer>
  );
}

const firebaseConfig = {
  apiKey: "AIzaSyCwIBvX3IwnexNgByBN371Ntm9ZdlmUZBI",
  authDomain: "todoappibx.firebaseapp.com",
  projectId: "todoappibx",
  storageBucket: "todoappibx.appspot.com",
  messagingSenderId: "303742558665",
  appId: "1:303742558665:web:04883a1375fdf87a078818",
};
firebase.initializeApp(firebaseConfig);
