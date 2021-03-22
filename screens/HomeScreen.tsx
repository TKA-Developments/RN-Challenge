import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Greeting from "../components/Greeting";

const HomeScreen = ({navigation}: {navigation: any}) => {
    return (
    <View>
        <Greeting/>
        <TouchableOpacity
        onPress={() => navigation.navigate("To Do List")}>
            <Text>Start Planning</Text>
        </TouchableOpacity>
    </View>
    )
};

const styles = StyleSheet.create({});

export default HomeScreen;