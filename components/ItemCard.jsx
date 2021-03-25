import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, FlatList, Animated} from "react-native";
import {CheckBox} from "react-native-elements";
import {MaterialIcons} from '@expo/vector-icons';
import Swipeable from "react-native-gesture-handler/Swipeable";

const ItemCard = ({array, deleteItem, checkItem}) => {

    const rightSwipe = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: "clamp"
        });

        return (
            <View style={styles.delete}>
                <Animated.Text style={[styles.deleteText, {transform: [{scale}]}]}>DELETE</Animated.Text>
            </View>
        )
    }

    return <FlatList 
    keyExtractor={(item) => item.title}
    data={array} 
    renderItem={({item}) => {
        return (
            <Swipeable
            renderRightActions={rightSwipe}
            onSwipeableRightOpen={() => deleteItem(item.title)}>
            <View style={styles.container}>
                <CheckBox 
                containerStyle={styles.cb}
                title={item.title}
                checked={item.isChecked}
                onIconPress={() => checkItem(item)}
                />
            </View>
        </Swipeable>
        )
    }}
    />
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 3,
        flexDirection: "row",
        backgroundColor: "white"
    },
    text: {
        alignSelf: "center",
        borderWidth: 3,
    },
    cb: {
        flex: 1,
        borderWidth: 0,
        backgroundColor: "transparent"
    },
    delete: {
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "flex-end",
        flex: 1,
        paddingRight: 5
    },
    deleteText: {
        fontWeight: "bold",
        color: "white"
    }
});

export default ItemCard;