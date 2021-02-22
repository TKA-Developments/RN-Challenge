import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RoundedCheckbox from "react-native-rounded-checkbox";
import { Feather } from "@expo/vector-icons";

export default function TaskItem({ task, checkHandler }) {
    return (
        <View>
            <View style={styles.container}>
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
            <View style={styles.separator} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F4F5F9",
        flexDirection: "row",
        alignItems: "center",
        margin: 5,
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
