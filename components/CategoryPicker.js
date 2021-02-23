import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";

export default function CategoryPicker({
    category,
    handlePickCategories,
    handleUnpickCategories,
    status,
}) {
    const [isPicked, setIsPicked] = useState(status);
    console.log(isPicked);

    return (
        <TouchableOpacity
            style={isPicked ? styles.buttonOn : styles.buttonOff}
            onPress={
                isPicked
                    ? () => {
                          handleUnpickCategories(category);
                          setIsPicked(!isPicked);
                      }
                    : () => {
                          handlePickCategories(category);
                          setIsPicked(!isPicked);
                      }
            }
        >
            <Text style={isPicked ? styles.textOn : styles.textOff}>
                {category}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonOff: {
        minWidth: 90,
        marginRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#DEE1ED",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
    },
    buttonOn: {
        minWidth: 90,
        marginRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#1688F3",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
    },
    textOff: {
        color: "#0C7EE9",
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10,
    },
    textOn: {
        color: "#DEE1ED",
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10,
    },
});
