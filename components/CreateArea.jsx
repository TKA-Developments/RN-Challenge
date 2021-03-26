import React, {useState} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";

import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

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
            onSubmitEditing={() => handleAdd()}
            placeholder="Add Task" 
            />
        </View>
        
    )
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 3,
        borderColor: "#282846",
        borderRadius: 5,
        height: 50,
        marginTop: 30,
        marginBottom: 10,
        backgroundColor: "#d8ebe4",
        paddingHorizontal: 5
    },
    text: {
        fontSize: 18,
        flex: 1,
        color: "#282846"
    }
});

export default CreateArea;


