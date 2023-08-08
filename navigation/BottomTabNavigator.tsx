import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ToDoScreen from "../screens/ToDoScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";
import { SvgXml } from "react-native-svg";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="To do"
      tabBarOptions={{
        showLabel: true,
        activeTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="To do"
        component={TabOneNavigator}
        options={{
          tabBarLabel: "To do list",
          tabBarIcon: ({ color }) => (
            <SvgXml
              xml={`<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path fill=${color} d="M222-214 80-356l42-42 100 99 179-179 42 43-221 221Zm0-320L80-676l42-42 100 99 179-179 42 43-221 221Zm298 244v-60h360v60H520Zm0-320v-60h360v60H520Z"/></svg>`}
              width="40"
              height="40"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={TabTwoNavigator}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <SvgXml
              xml={`<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path fill=${color} d="M222-214 80-356l42-42 100 99 179-179 42 43-221 221Zm0-320L80-676l42-42 100 99 179-179 42 43-221 221Zm298 244v-60h360v60H520Zm0-320v-60h360v60H520Z"/></svg>`}
              width="40"
              height="40"
            />
          ),
          // tabBarIcon: ({ color }) =>
          // (<SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M222-214 80-356l42-42 100 99 179-179 42 43-221 221Zm0-320L80-676l42-42 100 99 179-179 42 43-221 221Zm298 244v-60h360v60H520Zm0-320v-60h360v60H520Z"/></svg>`} width="100%" height="100%" />)
          // ,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="ToDoScreen"
        component={ToDoScreen}
        options={{ headerTitle: "Simple ToDo" }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: "Profile" }}
      />
    </TabTwoStack.Navigator>
  );
}
