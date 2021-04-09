import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from '../Themed';
import { StyleSheet, Alert } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Todo } from '../../types';
import { TodoContext } from '../../context/todoContexts';
import { TodoActions } from '../../context/todoReducer';

export default function TodoCard({todo} : {todo: Todo}){
    const [isDone, setDone] = React.useState(todo.done)

    const { state, dispatch } = React.useContext(TodoContext)

    // const handleTodo = (type: string, value: any) => {
    //     setTodo(cTodo[type],)
    // }

    // const setDone = () => {

    // }

    const updateTodo = () => {
        dispatch({
            type: TodoActions.Update,
            payload: {
                id: todo.id,
                title: todo.title,
                description: todo.description,
                date: todo.date,
                done: !isDone,
            }
        })
        Alert.alert(`updateTodo called ! value: ${todo.done}`);
    }

    return(
        <View style={[styles.container, { backgroundColor: '#01579B' }]}
            >
            <View style = {styles.container2}>
                <Text style={styles.titleStyle}>{todo.title}</Text>
                <Text style={styles.descStyle}>{todo.description}</Text>
            </View>
            <CheckBox 
                style={styles.checkbox}
                value={isDone}
                onValueChange={(e) => { setDone(e); updateTodo();}}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {  
        flex: 1,      
        opacity: 0.8,
        borderRadius: 8,
        padding: 10,
        alignItems: 'stretch',
        flexDirection: 'row',    
        marginBottom: 5,    
        height: 80,
    },
    container2: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    checkbox: {
        alignSelf: 'center',
    },
    titleStyle: {
        fontSize: 18,
        color: '#FFFFFF',        
    },
    descStyle:{
        fontSize: 14,
        color: '#F5F5F5',
    }

})