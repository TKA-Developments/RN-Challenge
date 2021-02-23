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
                        uncheckedColor="#b3b3b3"
                        checkedColor="#1db954"
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
                        <Text style={styles.text}>{task.task}</Text>
                    </TouchableOpacity>
                </View>
                <Feather
                    name="x"
                    size={24}
                    color="#1db954"
                    onPress={() => {
                        deleteTaskHandler(task.id);
                    }}
                />
            </View>

            <Portal>
                <Modalize ref={modalizeRef} modalHeight={500}>
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
        backgroundColor: "#121212",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 5,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#121212",
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 1,
        shadowColor: "#24262F",
        elevation: 2,
    },
    leftCont: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        color: "white",
        fontWeight: "bold",
        marginLeft: 15,
        fontSize: 18,
    },
});
