import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';

import { Text, View } from '../components/Themed';
import Todos from '../components/homeScreen/Todos';
import { TodoItemProps } from '../components/homeScreen/TodoItem';

import firebase from '../config/firebase';

const HomeScreen: React.FC = () => {
    const [todos, setTodos] = useState<TodoItemProps[]>([]);

    useEffect(() => {
        let tempTodos: TodoItemProps[] = [];
        const todosRef = firebase.firestore().collection('todos');
        todosRef.get()
            .then((snapshot) => {
                snapshot.forEach(doc => {
                    tempTodos.push({
                        id: doc.id,
                        date: doc.data().date,
                        checked: doc.data().checked,
                        title: doc.data().title,
                        category: doc.data().category,
                    });
                });
                setTodos(tempTodos);
            }).catch(() => {
                console.log('Error detected');
            });
    }, []);

    return (
        <View style={styles.container}>
            <Text>Hello, Nanda!</Text>
            <Text>You have 3 tasks today!</Text>
            <Todos todos={todos} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    }
});

export default HomeScreen;