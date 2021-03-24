import React, {useState} from "react";
import {View, Text, StyleSheet, TextInput, FlatList} from "react-native";

import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import CreateArea from "../components/CreateArea";
import ItemCard from "../components/ItemCard";


const PlanningScreen = () => {
    const [listArray, setListArray] = useState([]);

  function addItem(newItem) {
    setListArray(prevValue => [newItem, ...prevValue]);
  }

  function handlePress(key) {
     setListArray(prevValue => {
         return prevValue.filter((item) => {
                 return item.title !== key
             }
         )
     })   
}
    function handleIconPress(item) {
        const newArray =  listArray.map((eachItem) => {
            if (eachItem.title === item.title) {
                let itemChecked = {...item};
                itemChecked.isChecked = !item.isChecked;
                return {
                        ...eachItem,
                        isChecked: itemChecked.isChecked
                    }
                }
                 else {
                    return {
                        ...eachItem,
                    }
                }
        });
        setListArray(newArray);
    }
    return (
        <View style={styles.container}>
        <SearchBar/>
        <CreateArea onAdd={addItem}/>
        <ItemCard array={listArray} deleteItem={handlePress} checkItem={handleIconPress}/>
        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25
    }
});

export default PlanningScreen;