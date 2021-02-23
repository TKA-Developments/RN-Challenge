import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import TaskItem from "./TaskItem.js";

export default function TaskList({
    taskList,
    checkHandler,
    deleteTaskHandler,
}) {
    const [refresh, setRefresh] = useState(false);
    const [tasks, setTasks] = useState(taskList);

    useEffect(() => {
        setTasks([...taskList]);
    }, [taskList]);

    console.log("re render");
    console.log(tasks);

    return (
        <View style={styles.container}>
            {/* <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                key={tasks}
                renderItem={({ item }) => (
                    <TaskItem
                        task={item}
                        checkHandler={checkHandler}
                        deleteTaskHandler={deleteTaskHandler}
                        handleRefresh={handleRefresh}
                    />
                )}
                extraData={taskList}
            /> */}
            {tasks.map((item) => {
                return (
                    <TaskItem
                        task={item}
                        checkHandler={checkHandler}
                        deleteTaskHandler={deleteTaskHandler}
                    />
                );
            })}
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
