import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Button} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function addItems({submitHandler}) {
    const [text, setText] = useState('')

    const changeHandler = (val: React.SetStateAction<string>) => {
        setText(val);
    }
    return (
        <View>
            <TextInput
            style = {styles.input}
            placeholder = "Add New Task"
            onChangeText={changeHandler} 
            
            />

            <Button onPress={() => submitHandler(text)} title='Add' color='coral' />
        </View>
    )
 
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        color: 'white'
    }
})