import React from "react";
import {View, Text, StyleSheet, TouchableHighlight} from "react-native";

const Filter = ({filterCard}) => {
    return (
    <View style={styles.container}>
        <TouchableHighlight
        onPress={() => filterCard("completed")}
        underlayColor="#fed049">
            <Text style={styles.text}>Completed</Text>
        </TouchableHighlight>
        <TouchableHighlight
        onPress={() => filterCard("incomplete")}
        underlayColor="#fed049">
            <Text style={styles.text}>Incomplete</Text>
        </TouchableHighlight>
        <TouchableHighlight
        onPress={() => filterCard("all")}
        underlayColor="#fed049">
        <Text style={styles.text}>All</Text>
        </TouchableHighlight>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 10,
    },
    text: {
        borderWidth: 3,
        borderColor: "#fed049",
        color: "#fed049",
        width: 100,
        textAlign: "center",
        justifyContent: "center",
    }
});

export default Filter;