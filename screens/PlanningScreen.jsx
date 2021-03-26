import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";

import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import CreateArea from "../components/CreateArea";
import ItemCard from "../components/ItemCard";

const PlanningScreen = () => {
    const [listArray, setListArray] = useState([]);
    const [filterArray, setFilterArray] = useState([]);

    const [filterOn, setFilterOn] = useState(false);
    const [editI, setEditI] = useState(0);

    //ADD
    function addItem(newItem) {
        setListArray(prevValue => [newItem, ...prevValue]);
    }

    //EDIT
    function handleEdit(item) {
        const newArray =  listArray.map((eachItem, index) => {
            if (eachItem.title === item.title) {
                setEditI(index);
                return {
                        ...eachItem,
                        isModalVisible: true
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

    function handleEdit2(input, action) {
        if (action === "save") {
            const newArray =  listArray.map((eachItem, index) => {
                if (index === editI) {
                    return {
                            ...eachItem,
                            title: input,
                            isModalVisible: false
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
        else if (action === "discard") {
            const newArray =  listArray.map((eachItem, index) => {
                if (index === editI) {
                    return {
                            ...eachItem,
                            isModalVisible: false
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
    }

    //CHECK OFF
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

    //DELETE
    function handleDelete(key) {
        setListArray(prevValue => {
            return prevValue.filter((item) => {
                 return item.title !== key
            }
        )
    })   
    }


    //SEARCH
    function handleSearch(searchItem) {
        const newArray = listArray.filter((item) => {
            return item.title.toLowerCase().includes(searchItem.toLowerCase())
        });

        setFilterArray(newArray);
        setFilterOn(true);  
    }
    
    //FILTER
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
            checkItem={handleIconCheck}
            editItem={handleEdit}
            saveEdit={handleEdit2}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        paddingTop: 100,
        flex: 1,
        backgroundColor: "#007580"
    }
});

export default PlanningScreen;