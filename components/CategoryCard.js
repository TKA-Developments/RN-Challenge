import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

const icons = {
    Important: (
        <MaterialCommunityIcons
            name="star-box-multiple-outline"
            size={30}
            color="#1688F3"
        />
    ),
    Personal: <Ionicons name="ios-person-outline" size={30} color="#1688F3" />,
    School: <Ionicons name="ios-school-outline" size={30} color="#1688F3" />,
    Family: (
        <MaterialCommunityIcons
            name="account-group-outline"
            size={30}
            color="#1688F3"
        />
    ),
};

export default function CategoryCard({ category, tasks }) {
    var amountOfTasks = 0;
    for (var i = 0; i < tasks.length; i++) {
        const currCategories = tasks[i].categories;
        if (currCategories.includes(category)) {
            amountOfTasks++;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                {icons[category]}
                <View style={styles.textContainer}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            color: "#02111E",
                        }}
                    >
                        {amountOfTasks}
                    </Text>
                    <Text style={{ color: "#02111E" }}>Tasks</Text>
                </View>
            </View>
            <Text style={styles.text}>{category}</Text>
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
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 1.5,
        shadowColor: "#DEE1ED",
        elevation: 2,
    },
    text: {
        color: "#02111E",
        fontWeight: "bold",
        fontSize: 16,
    },
    top: {
        flexDirection: "row",
        marginBottom: 10,
        alignItems: "center",
    },
    textContainer: {
        marginLeft: 10,
    },
});
