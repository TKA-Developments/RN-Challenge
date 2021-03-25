import React from "react";
import {View, Text, StyleSheet} from "react-native";

const Filter = ({filterCard}) => {
    return (
    <View style={styles.container}>
            <Text onPress={() => filterCard("completed")}style={styles.text}>Completed</Text>
            <Text onPress={() => filterCard("incomplete")}style={styles.text}>Incomplete</Text>
            <Text onPress={() => filterCard("all")}style={styles.text}>All</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 10
    },
    text: {
        borderWidth: 3,
        width: 100,
        textAlign: "center",
    }
});

export default Filter;