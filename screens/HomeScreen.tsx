import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';

import { Text, View } from '../components/Themed';
import Todos from '../components/homeScreen/Todos';
import TodoProvider from '../contexts/TodoContext';

const HomeScreen = () => {
    return (
        <TodoProvider>
            <View style={styles.container}>
                <Text>Hello, Nanda!</Text>
                <Text>You have 3 tasks today!</Text>
                <Todos />
            </View>
        </TodoProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    }
});

export default HomeScreen;