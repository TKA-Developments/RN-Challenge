import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";
import {CheckBox} from "react-native-elements";

const ItemCard = ({array, deleteItem, checkItem}) => {

    return <FlatList 
    keyExtractor={(item) => item.title}
    data={array} 
    renderItem={({item}) => {
        return (
            <View style={styles.container}>
                <CheckBox 
                title={item.title}
                checked={item.isChecked}
                onIconPress={() => checkItem(item)}
                />
                <Text onPress={() => deleteItem(item.title)}>DELETE</Text>
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