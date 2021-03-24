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
            </View>
        )
    }}
    />
};

const styles = StyleSheet.create({
    container:{
        borderWidth: 3,
    },
    text: {
    }

});

export default ItemCard;