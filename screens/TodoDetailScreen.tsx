import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { TodoContext } from '../contexts/TodoContext';
import { AntDesign } from '@expo/vector-icons';
import useColorScheme from '../hooks/useColorScheme';

import { Text, View } from '../components/Themed';

const TodoDetailScreen = ({ navigation, route }: StackScreenProps<RootStackParamList, 'TodoDetail'>) => {
    const props = route.params;
    const colorScheme = useColorScheme();
    const { deleteTodo } = useContext(TodoContext);

    const onPressDelete = () => {
        Alert.alert(
            'Delete this task?',
            'Deleted task cannot be recovered',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        deleteTodo(props.id);
                        navigation.navigate('Home');
                    }
                }
            ]
        )
    }

    const onPressEdit = () => {
        navigation.push('AddTodo', { ...props });
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.leftHeaderContainer}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <AntDesign name='close' size={28} color={colorScheme == 'dark' ? 'white' : 'black'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.rightHeaderContainer}>
                    <TouchableOpacity onPress={onPressEdit}>
                        <AntDesign name='edit' size={28} color={colorScheme == 'dark' ? 'white' : 'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressDelete} style={styles.buttonContainer}>
                        <AntDesign name='delete' size={28} color={colorScheme == 'dark' ? 'white' : 'black'} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Text>{props.title}</Text>
                <Text>{props.date}</Text>
                <Text>{props.category}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftHeaderContainer: {

    },
    rightHeaderContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        marginLeft: 10,
    },
    contentContainer: {

    }
});

export default TodoDetailScreen;