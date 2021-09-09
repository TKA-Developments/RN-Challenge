import React, { useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Keyboard } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'

import Todos from './components/Todos'

export default App = () => {
    const [todo, setTodo] = useState();
    const [todoItems, setTodoItems] = useState([]);

    const addTodoHandler = () => {
        Keyboard.dismiss;
        // dunno why keyboard.dimsiss doesn't work
        setTodoItems([...todoItems, todo])
        setTodo(null);
    }

    const completeTodo = (index) => {
        let itemsCopy = [...todoItems]
        itemsCopy.splice(index, 1)
        setTodoItems(itemsCopy)
    }

    return (
        <View style={styles.container}>
            {/* To Do List */}
            <View style={styles.todoWrapper}>
                <Text style={styles.title}>To-Do List</Text>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                <View style={styles.items}>
                    {/* Todo Items */}
                    {
                        todoItems.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => completeTodo(index)}>
                                    <Todos text={item} />
                                </TouchableOpacity>
                            )
                        })
                    }
                    {/* <Todos text={'Task 1'} /> */}
                </View>
            </View>
            {/* write a todo */}
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.writeTodoWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Write a new task'} 
                        value={todo}
                        onChangeText={text => setTodo(text)}
                    />
                    <TouchableOpacity onPress={() => addTodoHandler()}>
                        <View style={styles.addWrapper}>
                            <Text style={styles.addText}>+</Text>
                        </View>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
        </View>
    )}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: 'rgb(231,245,255)',
    }, 
    todoWrapper : {
        paddingTop: 80,
        paddingHorizontal: 20,
    }, 
    title : {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'rgb(0,65,129)'
    }, 
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
      },
    items : {
        marginTop: 30,
    },
    writeTodoWrapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        paddingLeft: 20,
        width: 250,
        backgroundColor: '#fff',
        borderRadius: 60,
        borderColor: 'rgb(0,65,129)',
        borderWidth: 1
    },
    addWrapper: {
        width: 60,
        height: 60,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(0,65,129)',
        // borderColor: '#C0C0C0',
        // borderWidth: 1
    },
    addText : {
        fontWeight: 'bold',        
        color: '#fff',
    },
})