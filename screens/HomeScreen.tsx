import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

import { Text, View } from '../components/Themed';
import Todos from '../components/homeScreen/Todos';

const HomeScreen = ({ navigation }: StackScreenProps<RootStackParamList, 'Home'>) => {
    return (
        <View style={styles.container}>
            <Text>Hello, Nanda!</Text>
            <Text>You have 3 tasks today!</Text>
            <Todos />
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.push('AddTodo')}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,

        flex: 1,
    },
    addButton: {
        backgroundColor: 'orange',
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 70,
        height: 70,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 50,
        textAlign: 'center',
    }
});

export default HomeScreen;