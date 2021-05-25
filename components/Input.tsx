import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface props {
    placeholder: string;
}

const Input:React.FC<props> = ({placeholder}) => {
    return (
        <View>
            <TextInput 
                style={ styles.InputStyle }
                placeholder={ placeholder }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    InputStyle: {
        backgroundColor: '#ffffff',
        height: '100%',
        fontSize: 20
    }
})

export default Input;