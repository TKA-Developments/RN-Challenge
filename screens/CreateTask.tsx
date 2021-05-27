import React from 'react';
import { View, StyleSheet } from 'react-native';

import Input from '../components/Input';

function CreateTask() {
    return (
        <View style={ styles.CreateTaskScreen }>
            <View style={ styles.TitleStyle }>
                <Input placeholder="Title" />
            </View>
            <View style={ styles.DescriptionStyle }>
                <Input placeholder="Description" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    CreateTaskScreen: {
        padding: 10
    },
    TitleStyle: {
        height: 50,
        elevation: 1,
        margin: 10,
        borderRadius: 15,
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 1
    },
    DescriptionStyle: {
        height: 100,
        elevation: 1,
        margin: 10,
        borderRadius: 15,
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 1
    }
});

export default CreateTask;