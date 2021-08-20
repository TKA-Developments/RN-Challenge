import { Entypo, AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import firebase from "firebase";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ScheduleDetails from "../screens/ScheduleDetails";
import Schedule from "../screens/Schedule";
import {
  BottomTabParamList,
  ProductivityParamList,
  ScheduleParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Schedule"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Schedule"
        component={ScheduleNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="profile" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Productivity"
        component={ProductivityNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="progress-one" size={24} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const ScheduleStack = createStackNavigator<ScheduleParamList>();

function ScheduleNavigator() {
  return (
    <ScheduleStack.Navigator>
      <ScheduleStack.Screen
        name="Schedule"
        component={Schedule}
        options={{
          title: "Schedule",
          headerStyle: {
            backgroundColor: "#fff",
            elevation: 0,
          },
        }}
      />
    </ScheduleStack.Navigator>
  );
}

const ProductivityStack = createStackNavigator<ProductivityParamList>();

function ProductivityNavigator() {
  return (
    <ProductivityStack.Navigator>
      <ProductivityStack.Screen
        name="Productivity"
        component={ScheduleDetails}
        options={{ headerTitle: "Productivity" }}
      />
    </ProductivityStack.Navigator>
  );
}
