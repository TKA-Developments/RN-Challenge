import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RoundedCheckbox from "react-native-rounded-checkbox";
import { Feather } from "@expo/vector-icons";

export default function TaskItem({ task, checkHandler, deleteTaskHandler }) {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.leftCont}>
                    <RoundedCheckbox
                        onPress={() => checkHandler(task.id)}
                        uncheckedColor="#3294fc"
                        checkedColor="#3294fc"
                        text=""
                        component={
                            task.completed ? (
                                <Feather name="check" size={20} color="white" />
                            ) : null
                        }
                        innerSize={30}
                        outerSize={35}
                    />
                    <Text style={styles.text}>{task.task}</Text>
                </View>
                <Feather
                    name="x"
                    size={24}
                    color="black"
                    onPress={() => {
                        deleteTaskHandler(task.id);
                    }}
                />
            </View>
            <View style={styles.separator} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F4F5F9",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 5,
    },
    leftCont: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        color: "#FF2225",
        fontWeight: "bold",
        marginLeft: 15,
        fontSize: 18,
    },
    separator: {
        height: 1,
        width: "100%",
        backgroundColor: "#656566",
        opacity: 10,
        marginTop: 5,
    },
});
