import React from 'react';
import { View, StyleSheet } from 'react-native';

import Input from '../components/Input';

function CreateTask() {
    return (
        <View style={ styles.CreateTaskScreen }>
            <Input placeholder="Title" />
        </View>
    );
}

const styles = StyleSheet.create({
    CreateTaskScreen: {
        padding: 10
    }
});

export default CreateTask;