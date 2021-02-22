import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function TabTwoScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}></View>
            <View style={styles.bottomContainer}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
    },
    topContainer: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginLeft: 20,
        marginTop: 80,
        marginBottom: 20,
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
});
