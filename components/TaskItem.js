import React, { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import RoundedCheckbox from "react-native-rounded-checkbox";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import Modal from "../components/Modal.js";

export default function TaskItem({
    task,
    checkHandler,
    deleteTaskHandler,
    editTaskHandler,
    categories,
}) {
    const modalizeRef = useRef(null);

    const handleOpen = () => {
        modalizeRef.current?.open();
    };

    const handleClose = () => {
        if (modalizeRef.current) {
            modalizeRef.current.close();
        }
    };
    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.leftCont}>
                    <RoundedCheckbox
                        onPress={() => checkHandler(task.id)}
                        uncheckedColor={task.completed ? "#1db954" : "#b3b3b3"}
                        checkedColor={task.completed ? "#1db954" : "#b3b3b3"}
                        text=""
                        component={
                            task.completed ? (
                                <Feather name="check" size={20} color="white" />
                            ) : null
                        }
                        innerSize={30}
                        outerSize={35}
                    />
                    <TouchableOpacity onPress={handleOpen}>
                        <Text
                            style={
                                task.completed
                                    ? styles.strikethrough
                                    : task.date.toDateString() ==
                                      new Date().toDateString()
                                    ? styles.text
                                    : task.date < new Date()
                                    ? styles.overdue
                                    : styles.text
                            }
                        >
                            {task.task}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Feather
                    name="x"
                    size={24}
                    color="#1688F3"
                    onPress={() => {
                        deleteTaskHandler(task.id);
                    }}
                />
            </View>

            <Portal>
                <Modalize ref={modalizeRef} modalHeight={450}>
                    <Modal
                        categories={categories}
                        handleClose={handleClose}
                        editTaskHandler={editTaskHandler}
                        id={task.id}
                        type="edit"
                        initTask={task.task}
                        initDate={task.date}
                        initCategory={task.categories}
                    />
                </Modalize>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 5,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "white",
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 1,
        shadowColor: "#DEE1ED",
        elevation: 2,
    },
    leftCont: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        color: "#02111E",
        fontWeight: "bold",
        marginLeft: 15,
        fontSize: 18,
    },
    strikethrough: {
        textDecorationLine: "line-through",
        textDecorationStyle: "solid",
        textDecorationColor: "#B6B6B6",
        color: "#DBDBDB",
        fontWeight: "bold",
        marginLeft: 15,
        fontSize: 18,
    },
    overdue: {
        color: "#ff5154",
        fontWeight: "bold",
        marginLeft: 15,
        fontSize: 18,
    },
});
