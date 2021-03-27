import React from "react";
import {View, Text, StyleSheet, TouchableHighlight} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Greeting from "../components/Greeting";
import Quote from "../components/Quote";

const HomeScreen = ({navigation}: {navigation: any}) => {
    return (
    <View style={styles.container}>
        <Greeting/>
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TASK LIST")}
        >
            <Text style={styles.buttonText}>LET'S START PLANNING</Text>
        </TouchableOpacity>
        <Quote/>
    </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
        paddingHorizontal: 50,
        backgroundColor: "#007580",
    },
    button: {
        backgroundColor: "#fed049",
        height: 50,
        borderRadius: 5,
        marginTop: 50,
        marginBottom: 80,
        justifyContent: "center",
        elevation: 5,
        shadowColor: '#282846',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 5,  
    },
    buttonText: {
        fontSize: 20,
        textAlign: "center",
        color: "#007580",
    }
});

export default HomeScreen;