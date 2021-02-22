import {
  MaterialIcons,
  Foundation,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import AllScreen from "../screens/AllScreen";
import CompletedScreen from "../screens/CompletedScreen";
import IncompletedScreen from "../screens/IncompletedScreen";
import {
  BottomTabParamList,
  AllParamList,
  CompletedParamList,
  IncompletedParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="All"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="All"
        component={AllNavigator}
        options={{
          tabBarIcon: ({ color }) => <AllBarIcon name="list" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Active"
        component={IncompletedNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <IncompletedBarIcon name="calendar-clock" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Completed"
        component={CompletedNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <CompletedBarIcon name="playlist-add-check" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof Ionicons>["name"];
//   color: string;
// }) {
//   return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
// }

function CompletedBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

function AllBarIcon(props: {
  name: React.ComponentProps<typeof Foundation>["name"];
  color: string;
}) {
  return <Foundation size={22} style={{ marginBottom: -3 }} {...props} />;
}

function IncompletedBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return (
    <MaterialCommunityIcons size={22} style={{ marginBottom: -3 }} {...props} />
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const AllStack = createStackNavigator<AllParamList>();

function AllNavigator() {
  return (
    <AllStack.Navigator>
      <AllStack.Screen
        name="AllScreen"
        component={AllScreen}
        options={{ headerTitle: "Just Todo It" }}
      />
    </AllStack.Navigator>
  );
}

const CompletedStack = createStackNavigator<CompletedParamList>();

function CompletedNavigator() {
  return (
    <CompletedStack.Navigator>
      <CompletedStack.Screen
        name="CompletedScreen"
        component={CompletedScreen}
        options={{ headerTitle: "Completed Todos" }}
      />
    </CompletedStack.Navigator>
  );
}

const IncompletedStack = createStackNavigator<IncompletedParamList>();

function IncompletedNavigator() {
  return (
    <IncompletedStack.Navigator>
      <IncompletedStack.Screen
        name="IncompletedScreen"
        component={IncompletedScreen}
        options={{ headerTitle: "Active Todos" }}
      />
    </IncompletedStack.Navigator>
  );
}
