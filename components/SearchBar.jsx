import React from "react";
import {View, Text, StyleSheet, TextInput} from "react-native";

import {Feather} from "@expo/vector-icons";

const SearchBar = () => {
    return <View style={styles.background}>
    <Feather name="search" style={styles.iconStyle}/>
    <TextInput placeholder="Search" style={styles.inputStyle}/>
</View>
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#F0EEEE",
        height: 50,
        borderRadius: 5,
        flexDirection: "row"
    },
    inputStyle: {
        flex: 1,
        fontSize: 18
    },
    iconStyle: {
        fontSize: 30,
        alignSelf: "center",
        marginHorizontal: 15
    }
});

export default SearchBar;

