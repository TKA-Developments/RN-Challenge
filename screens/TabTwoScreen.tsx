import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";

import { Text, View } from "../components/Themed";
import TaskList from "../components/TaskList.js";
import Modal from "../components/Modal.js";
import { Ionicons } from "@expo/vector-icons";

export default function TabTwoScreen({
    navigation,
    tasks,
    categories,
    checkHandler,
    addTaskHandler,
    deleteTaskHandler,
    editTaskHandler,
}) {
    const modalizeRef = useRef<Modalize>(null);
    const [date, setDate] = useState(new Date().toDateString());
    const [showCompleted, setShowCompleted] = useState(true);

    let tasksToday = tasks.filter(
        (task) => task != undefined && task.date.toDateString() == date
    );

    if (!showCompleted) {
        tasksToday = tasksToday.filter((item) => !item.completed);
    }

    const handleOpen = () => {
        modalizeRef.current?.open();
    };

    const handleClose = () => {
        if (modalizeRef.current) {
            modalizeRef.current.close();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <CalendarStrip
                    scrollable
                    style={{ height: 120, paddingTop: 20, paddingBottom: 10 }}
                    selectedDate={new Date()}
                    daySelectionAnimation={{
                        type: "background",
                        duration: 200,
                        highlightColor: "white",
                    }}
                    calendarColor={"#1688F3"}
                    calendarHeaderStyle={{ color: "white" }}
                    dateNumberStyle={{ color: "white", fontSize: 18 }}
                    highlightDateNumberStyle={{ fontSize: 18 }}
                    dateNameStyle={{
                        color: "white",
                        fontSize: 12,
                    }}
                    highlightDateNameStyle={{
                        fontWeight: "bold",
                        fontSize: 12,
                    }}
                    iconContainer={{ flex: 0.1 }}
                    startingDate={new Date()}
                    startDate={true}
                    calendarHeaderStyle={{ fontSize: 20, color: "white" }}
                    onDateSelected={(date) =>
                        setDate(new Date(date).toDateString())
                    }
                />
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.altTitle}>Today's Tasks</Text>
                    <TouchableOpacity
                        onPress={() => setShowCompleted(!showCompleted)}
                    >
                        {showCompleted ? (
                            <Text style={styles.link}>
                                Hide Completed Tasks
                            </Text>
                        ) : (
                            <Text style={styles.link}>
                                Show Completed Tasks
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
                <View style={styles.tasks}>
                    <TaskList
                        taskList={tasksToday.sort((a, b) => {
                            a.id - b.id;
                        })}
                        checkHandler={checkHandler}
                        deleteTaskHandler={deleteTaskHandler}
                        editTaskHandler={editTaskHandler}
                        categories={categories}
                        key={tasks}
                    />

                    <Portal>
                        <Modalize ref={modalizeRef} modalHeight={450}>
                            <Modal
                                categories={categories}
                                handleClose={handleClose}
                                addTaskHandler={addTaskHandler}
                                type="add"
                                initTask=""
                                initDate={new Date()}
                                initCategory={[]}
                            />
                        </Modalize>
                    </Portal>
                </View>
            </View>
            <View style={styles.icon}>
                <TouchableOpacity onPress={handleOpen}>
                    <Ionicons
                        name="ios-add-circle-outline"
                        size={70}
                        color="#1688F3"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
    },
    topContainer: {
        flex: 1,
        marginTop: "10%",
        marginBottom: "30%",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    bottomContainer: {
        backgroundColor: "#F4F5F9",
        width: "100%",
        height: "100%",
        borderRadius: 30,
        padding: 20,
    },
    altTitle: {
        color: "#3F4972",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    tasks: {
        backgroundColor: "#F4F5F9",
        width: "95%",
    },
    icon: {
        position: "absolute",
        right: 30,
        bottom: 175,
        backgroundColor: "#F4F5F9",
    },
    textContainer: {
        backgroundColor: "#F4F5F9",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "94.5s%",
        marginTop: 20,
    },
    link: {
        color: "#6C7AAE",
        marginTop: 7,
    },
});
