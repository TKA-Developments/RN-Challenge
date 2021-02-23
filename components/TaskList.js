import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import TaskItem from "./TaskItem.js";

export default function TaskList({
    taskList,
    checkHandler,
    deleteTaskHandler,
    editTaskHandler,
    categories,
}) {
    const completed = taskList.filter((item) => item.completed);
    const tasks = taskList.filter((item) => !item.completed);
    tasks.push(...completed);

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskItem
                        task={item}
                        checkHandler={checkHandler}
                        deleteTaskHandler={deleteTaskHandler}
                        editTaskHandler={editTaskHandler}
                        categories={categories}
                    />
                )}
                showsVerticalScrollIndicator={false}
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
