import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { Host } from "react-native-portalize";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import tasksData from "../tmpData/Tasks.js";
import categoriesData from "../tmpData/Categories.js";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();
    const [tasks, setTasks] = useState(tasksData);
    const [categories, setCategories] = useState(categoriesData);

    const checkHandler = (id) => {
        let modifiedTask = tasks.filter((task) => task.id == id)[0];
        modifiedTask.completed = !modifiedTask.completed;

        setTasks([...tasks.filter((task) => task.id != id), modifiedTask]);
    };

    const addTaskHandler = (task, date, categories) => {
        var num = tasks.length + 1;

        const newObj = {
            id: num.toString(),
            task: task,
            date: date,
            categories: categories,
            completed: false,
        };

        setTasks([...tasks, newObj]);
    };

    const editTaskHandler = (id, newTask, newDate, newCategories) => {
        let modifiedTask = tasks.filter((task) => task.id == id)[0];
        modifiedTask.task = newTask;
        modifiedTask.date = newDate;
        modifiedTask.categories = newCategories;

        setTasks([...tasks.filter((task) => task.id != id), modifiedTask]);
    };

    const deleteTaskHandler = (id) => {
        setTasks(tasks.filter((task) => task.id != id));
    };

    return (
        <Host>
            <BottomTab.Navigator
                initialRouteName="TabOne"
                tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
            >
                <BottomTab.Screen
                    name="Home"
                    children={({ navigation }) => (
                        <TabOneNavigator
                            tasks={tasks}
                            checkHandler={checkHandler}
                            categories={categories}
                            navigation={navigation}
                            deleteTaskHandler={deleteTaskHandler}
                            editTaskHandler={editTaskHandler}
                        />
                    )}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Feather name="home" size={24} color={color} />
                        ),
                    }}
                />
                <BottomTab.Screen
                    name="Tasks"
                    children={({ navigation }) => (
                        <TabTwoNavigator
                            tasks={tasks}
                            checkHandler={checkHandler}
                            categories={categories}
                            navigation={navigation}
                            addTaskHandler={addTaskHandler}
                            deleteTaskHandler={deleteTaskHandler}
                            editTaskHandler={editTaskHandler}
                        />
                    )}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <FontAwesome5
                                name="tasks"
                                size={24}
                                color={color}
                            />
                        ),
                    }}
                />
            </BottomTab.Navigator>
        </Host>
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

function TabOneNavigator(props) {
    return (
        <TabOneStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <TabOneStack.Screen
                name="TabOneScreen"
                children={() => (
                    <TabOneScreen
                        navigation={props.navigation}
                        tasks={props.tasks}
                        categories={props.categories}
                        checkHandler={props.checkHandler}
                        deleteTaskHandler={props.deleteTaskHandler}
                        editTaskHandler={props.editTaskHandler}
                    />
                )}
                options={{ headerTitle: "Tab One Title" }}
            />
        </TabOneStack.Navigator>
    );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator(props) {
    return (
        <TabTwoStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <TabTwoStack.Screen
                name="TabTwoScreen"
                children={() => (
                    <TabTwoScreen
                        tasks={props.tasks}
                        categories={props.categories}
                        checkHandler={props.checkHandler}
                        addTaskHandler={props.addTaskHandler}
                        deleteTaskHandler={props.deleteTaskHandler}
                        editTaskHandler={props.editTaskHandler}
                    />
                )}
                options={{ headerTitle: "Tab Two Title" }}
            />
        </TabTwoStack.Navigator>
    );
}
