import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";

export default function CategoryPicker({
    category,
    handlePickCategories,
    handleUnpickCategories,
}) {
    const [isPicked, setIsPicked] = useState(false);

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
            <Text style={styles.text}>{category}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonOff: {
        minWidth: 90,
        marginRight: 10,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "black",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
    },
    buttonOn: {
        minWidth: 90,
        marginRight: 10,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "red",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
    },
    text: {
        color: "#fff",
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10,
    },
});
