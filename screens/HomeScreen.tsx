import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

import Greeting from "../components/Greeting";
import Quote from "../components/Quote";

const HomeScreen = ({navigation}: {navigation: any}) => {
    return (
    <View style={styles.container}>
        <Greeting/>
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("To Do List")}
        >
            <Text style={styles.buttonText}>Let's Start Planning</Text>
        </TouchableOpacity>
        <Quote/>
    </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
        paddingHorizontal: 50
    },
    button: {
        borderWidth: 3,
        marginTop: 50,
        marginBottom: 80
    },
    buttonText: {
        fontSize: 25,
        textAlign: "center"
    }
});

export default HomeScreen;