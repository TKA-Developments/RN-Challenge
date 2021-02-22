import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CategoryPicker({ category }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{category}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "gray",
        margin: 15,
        marginTop: 0,
        marginLeft: 0,
        width: 100,
        padding: 10,
    },
    text: {
        color: "#FF2225",
        fontWeight: "bold",
    },
});
