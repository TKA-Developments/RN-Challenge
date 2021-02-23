import React, { useState } from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";

import SearchBar from "../components/SearchBar.js";
import CategoryCard from "../components/CategoryCard.js";
import TaskList from "../components/TaskList.js";

export default function TabOneScreen({
    navigation,
    tasks,
    categories,
    checkHandler,
    deleteTaskHandler,
    editTaskHandler,
}) {
    console.log(tasks);
    const [search, setSearch] = useState("");

    const currDate = new Date().toDateString();
    const tasksToday = tasks.filter(
        (task) => task != undefined && task.date.toDateString() == currDate
    );

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.title}>Hello, User!</Text>
                <Text style={styles.title}>
                    You've got {tasksToday.length} tasks today
                </Text>
                <SearchBar term={search} onTermChange={setSearch} />
            </View>
            <View>
                {/* If search bar not empty, display queried result, else display categories etc */}
                {search == "" ? (
                    <View style={styles.bottomContainer}>
                        <Text style={styles.altTitle}>Categories</Text>
                        <View style={styles.categories}>
                            <FlatList
                                data={categories}
                                scrollEnabled={false}
                                numColumns={2}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <CategoryCard
                                        category={item.category}
                                        tasks={tasks}
                                    />
                                )}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.altTitle}>Today's Tasks</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Tasks")}
                            >
                                <Text style={styles.link}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.tasks}>
                            <TaskList
                                taskList={tasksToday.sort((a, b) => {
                                    if (a.date - b.date > 0) return 1;
                                    else if (a.date - b.date < 0) return -1;
                                    else {
                                        return a.id - b.id;
                                    }
                                })}
                                checkHandler={checkHandler}
                                deleteTaskHandler={deleteTaskHandler}
                                editTaskHandler={editTaskHandler}
                                categories={categories}
                            />
                        </View>
                    </View>
                ) : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
    },
    topContainer: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginLeft: 20,
        marginTop: 80,
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    bottomContainer: {
        backgroundColor: "#292c36",
        width: "100%",
        height: "100%",
        borderRadius: 30,
        padding: 20,
    },
    altTitle: {
        color: "#1db954",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    categories: {
        backgroundColor: "#292c36",
        alignItems: "flex-start",
        width: "96%",
    },
    textContainer: {
        backgroundColor: "#292c36",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "95%",
        marginTop: 20,
    },
    link: {
        color: "#1db954",
    },
    tasks: {
        backgroundColor: "#292c36",
        width: "95%",
    },
});
