import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { Modalize } from "react-native-modalize";
import { Host, Portal } from "react-native-portalize";

import { Text, View } from "../components/Themed";
import TaskList from "../components/TaskList.js";
import Modal from "../components/Modal.js";

export default function TabTwoScreen({
    navigation,
    tasks,
    categories,
    checkHandler,
    addTaskHandler,
    deleteTaskHandler,
}) {
    const modalizeRef = useRef<Modalize>(null);

    const handleOpen = () => {
        modalizeRef.current?.open();
    };

    const handleClose = () => {
        if (modalizeRef.current) {
            modalizeRef.current.close();
        }
    };

    console.log(tasks);

    const [tasksList, setTasksList] = useState(
        tasks.filter(
            (task) =>
                task != undefined &&
                task.date.toDateString() == new Date().toDateString()
        )
    );

    // s

    // const mainAddHandler = (task, date, categories) => {
    //     addTaskHandler(task, date, categories);
    //     setTasksList(
    //         tasks.filter(
    //             (task) =>
    //                 task != undefined &&
    //                 task.date.toDateString() == new Date().toDateString()
    //         )
    //     );
    // };

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
                    calendarColor={"#ff5154"}
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
                        setTasksList(
                            tasks.filter(
                                (task) =>
                                    task != undefined &&
                                    task.date.toDateString() ==
                                        new Date(date).toDateString()
                            )
                        )
                    }
                />
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.altTitle}>Today's Tasks</Text>
                <View style={styles.tasks}>
                    <TaskList
                        taskList={tasksList.sort((a, b) => {
                            if (a.date - b.date > 0) return 1;
                            else if (a.date - b.date < 0) return -1;
                            else {
                                return a.id - b.id;
                            }
                        })}
                        checkHandler={checkHandler}
                        deleteTaskHandler={deleteTaskHandler}
                        key={tasks}
                    />
                    <TouchableOpacity onPress={handleOpen}>
                        <Text>Open the modal</Text>
                    </TouchableOpacity>

                    <Portal>
                        <Modalize ref={modalizeRef} modalHeight={500}>
                            <Modal
                                categories={categories}
                                handleClose={handleClose}
                                addTaskHandler={addTaskHandler}
                            />
                        </Modalize>
                    </Portal>
                </View>
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
        color: "#333333",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    tasks: {
        backgroundColor: "black",
        width: "95%",
    },
});
