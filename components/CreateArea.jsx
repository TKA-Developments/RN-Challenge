import React, {useState} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";

import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

const CreateArea = (props) => {
    const [newItem, setNewItem] = useState({
        title: "",
        isChecked: false
    })

    function handleChange(event){
        setNewItem ({
            title: event
        });
    }
    
    function handlePress(event) {
        props.onAdd(newItem);
        setNewItem({
            title:"",
            isChecked: false
        });
}
    return (
        <View style={styles.container}>
            <TextInput 
            autoCorrect={false}
            value={newItem.title} 
            onChangeText={event => handleChange(event)} 
            placeholder="New To Do" 
            />
        <TouchableOpacity onPress={handlePress}>
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


