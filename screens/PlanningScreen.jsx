import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TextInput, FlatList} from "react-native";

import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import CreateArea from "../components/CreateArea";
import ItemCard from "../components/ItemCard";


const PlanningScreen = () => {
    const [incompleteArray, setIncompleteArray] = useState([]);
    const [completedArray, setCompletedArray] = useState([]);

    const [completedItem, setCompletedItem] = useState({
        title:"",
        note:""
    });
    const [isDone, setIsDone] = useState(false)

    function toCompletedArray(itemTitle, itemNote) {
            setCompletedItem({
                title: itemTitle,
                note: itemNote
            });
            setCompletedArray(prevValue => [completedItem, ...prevValue]);
            setIncompleteArray(prevValue => {
                return prevValue.filter((item) => {
                        return item.title !== itemTitle
                    }
                )
            });
            setIsDone(true);
    };

    function generateCard(newArray) {
        return isDone ? <ItemCard 
    array={newArray} 
    deleteItem={handlePress2} 
    checkedItem={toCompletedArray} 
    lineThrough={true}/> : null
    }

    function addItem(newItem) {
        setIncompleteArray(prevValue => [newItem, ...prevValue]);
    }

    function handlePress1(key) {
        setIncompleteArray(prevValue => {
            return prevValue.filter((item) => {
                    return item.title !== key
                }
            )
        });
    }
    function handlePress2(key) {
        setCompletedArray(prevValue => {
            return prevValue.filter((item) => {
                    return item.title !== key
                }
            )
        });   
    }

    return (
        <View style={styles.container}>
        <SearchBar/>
        <CreateArea onAdd={addItem}/>
        <ItemCard 
        array={incompleteArray} 
        deleteItem={handlePress1} 
        checkedItem={toCompletedArray} 
        lineThrough={false}/>
        {generateCard(completedArray)}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25
    }
});

export default PlanningScreen;