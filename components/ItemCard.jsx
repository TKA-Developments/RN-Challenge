import { red } from "@material-ui/core/colors";
import React, { useState } from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";

const ItemCard = ({array, deleteItem, checkedItem, lineThrough}) => {

    return <FlatList 
    keyExtractor={(item) => item.title}
    data={array} 
    renderItem={({item}) => {
        return (
            <View style={lineThrough ? styles.containerIncomplete : styles.containerComplete}>
                <Text >{item.title}</Text>
                <Text >{item.note}</Text>
                <Text>EDIT</Text>
                <Text onPress={() => checkedItem(item.title, item.note)}>DONE</Text>
                <Text onPress={() => deleteItem(item.title)}>DELETE</Text>
            </View>
        )
    }}
    />
};

const styles = StyleSheet.create({
    containerIncomplete:{
        borderWidth: 3,
        borderColor: "red"
    },
    containerComplete: {
        borderWidth: 3,
        borderColor: "black"
    },
    text: {
    }

});

export default ItemCard;