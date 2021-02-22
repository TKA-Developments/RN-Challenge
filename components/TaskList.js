import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import TaskItem from "./TaskItem.js";

export default function TaskList({ taskList, checkHandler }) {
    return (
        <View style={styles.container}>
            <FlatList
                data={taskList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskItem task={item} checkHandler={checkHandler} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F4F5F9",
    },
    text: {
        color: "#FF2225",
        fontWeight: "bold",
    },
});
