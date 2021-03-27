import React, {useState} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";

import { Ionicons } from '@expo/vector-icons';

const CreateArea = (props) => {
    const [newItem, setNewItem] = useState({
        title: "",
    })

    function handleAdd() {
        props.onAdd(newItem);
        setNewItem({
            title:"",
        });
    }

    return (
        <View style={styles.container}>
            <TextInput 
            style={styles.text}
            autoCorrect={false}
            value={newItem.title} 
            onChangeText={(newInput) => setNewItem({title: newInput, isChecked: false, isModalVisible: false})} 
            placeholder="Add Task" 
            />
            <TouchableOpacity
            onPress={() => handleAdd()}>
                <Ionicons name="add-circle" size={35} color="#282846" />
            </TouchableOpacity>
        </View>
        
    )
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        height: 50,
        marginTop: 30,
        marginBottom: 10,
        backgroundColor: "#98ded9",
        paddingHorizontal: 5,
        elevation: 5,
        shadowColor: '#282846',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 5,  
        flexDirection: "row",
        alignItems: "center"
    },
    text: {
        fontSize: 18,
        flex: 1,
        color: "#282846",
    }
});

export default CreateArea;


