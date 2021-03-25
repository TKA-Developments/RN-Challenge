import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TextInput, FlatList, ScrollView} from "react-native";

import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import CreateArea from "../components/CreateArea";
import ItemCard from "../components/ItemCard";


const PlanningScreen = () => {
    const [listArray, setListArray] = useState([]);
    const [filterArray, setFilterArray] = useState([]);

    const [filterOn, setFilterOn] = useState(false);

    function addItem(newItem) {
        setListArray(prevValue => [newItem, ...prevValue]);
    }

    function handleDelete(key) {
        setListArray(prevValue => {
            return prevValue.filter((item) => {
                 return item.title !== key
            }
        )
    })   
    }

    function handleIconCheck(item) {
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
    
    function handleSearch(searchItem) {
        const newArray = listArray.filter((item) => {
            return item.title.toLowerCase().includes(searchItem.toLowerCase())
        });

        setFilterArray(newArray);
        setFilterOn(true);  
    }
    
    const handleFilter = (filterOpt) => {
        if (filterOpt === "completed") {
            const newArray = listArray.filter((eachItem) => {
                return eachItem.isChecked === true
            });
            setFilterArray(newArray);
            setFilterOn(true);
        }
        else if (filterOpt === "incomplete") {
            const newArray = listArray.filter((eachItem) => {
                return eachItem.isChecked === false
            });
            setFilterArray(newArray);
            setFilterOn(true);
        }
        else {
            setFilterOn(false);
        }
    }

    return (
        <View style={styles.container}>
        <SearchBar onSearch={handleSearch}/>
        <Filter filterCard={handleFilter}/>
        <CreateArea onAdd={addItem}/>
            <ItemCard 
                array={filterOn ? filterArray : listArray} 
                deleteItem={handleDelete} 
                checkItem={handleIconCheck}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        flex: 1
    }
});

export default PlanningScreen;