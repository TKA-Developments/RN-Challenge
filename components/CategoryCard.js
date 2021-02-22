import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CategoryCard(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.category}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        margin: 15,
        marginTop: 0,
        marginLeft: 0,
        height: 90,
        width: "46.9%",
        padding: 10,
        borderRadius: 12.5,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowColor: "#9AAACF",
        elevation: 1,
    },
    text: {
        color: "#FF2225",
        fontWeight: "bold",
    },
});
