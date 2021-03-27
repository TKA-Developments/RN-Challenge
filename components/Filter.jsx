import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

const Filter = ({filterCard}) => {
    return (
    <View style={styles.container}>
        <TouchableOpacity
        style={styles.button}
        onPress={() => filterCard("completed")}>
            <Text style={styles.text}>COMPLETED</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        onPress={() => filterCard("incomplete")}>
            <Text style={styles.text}>INCOMPLETED</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        onPress={() => filterCard("all")}>
        <Text style={styles.text}>ALL</Text>
        </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 10,
        height: 30,
        alignItems: "center",
    },
    button: {
        elevation: 5,
        shadowColor: '#282846',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 2,
        backgroundColor: "#fed049",
        width: 115,
        borderWidth: 3,
        borderColor: "#fed049",
        justifyContent: "center",
        paddingTop: 3
    },
    text: {
        color: "#007580",
        flex: 1,
        textAlign: "center",
        fontSize: 13
    }
});

export default Filter;