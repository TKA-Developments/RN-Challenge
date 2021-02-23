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
    const [tasks, setTasks] = useState(taskList);

    useEffect(() => {
        setTasks([...taskList]);
    }, [taskList]);

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
                scrollEnabled={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#292c36",
    },
    text: {
        color: "#FF2225",
        fontWeight: "bold",
    },
});
