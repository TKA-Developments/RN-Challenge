import React, {useState} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";

import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

const CreateArea = (props) => {
    const [newItem, setNewItem] = useState({
        title: "",
        note: ""
    })

    function handleChange(event, name){
        setNewItem (prevInput => {
            return { 
                ...prevInput,
                [name]: event
            };
        });
    }
    
    function handlePress(event) {
        props.onAdd(newItem);
        setNewItem({
            title:"",
            note:""
        });
}
    return (
        <View style={styles.container}>
            <TextInput 
            autoCorrect={false}
            value={newItem.title} 
            onChangeText={event => handleChange(event, "title")} 
            placeholder="Add title" 
            />
            <TextInput 
            autoCorrect={false}
            value={newItem.note} 
            onChangeText={event => handleChange(event, "note")} 
            placeholder="Add description" 
            />
        <TouchableOpacity onPress={(e) => handlePress(e)}>
            <Text>Add</Text>
        </TouchableOpacity>
        </View>
        
    )
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 3
    }
});

export default CreateArea;


