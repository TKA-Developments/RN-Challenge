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
            onChangeText={(newInput) => setNewItem({title: newInput, isChecked: false})} 
            onSubmitEditing={() => handleAdd()}
            placeholder="New To Do" 
            />
        </View>
        
    )
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 3,
        height: 50,
        marginTop: 30,
        marginBottom: 10
    },
    text: {
        fontSize: 18,
        flex: 1
    }
});

export default CreateArea;


