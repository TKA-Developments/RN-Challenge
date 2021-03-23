import React, { useState } from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";

const ItemCard = ({array, deleteItem}) => {
    // const [isDone, setIsDone] = useState(false);

    return <FlatList 
    keyExtractor={(item) => item.title}
    data={array} 
    renderItem={({item}) => {
        return (
            <View style={styles.container}>
                <Text >{item.title}</Text>
                <Text >{item.note}</Text>
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