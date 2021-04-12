import React, {useContext, useState} from 'react';
import { useNavigation, } from '@react-navigation/native';

import { Text, View } from '../Themed';
import { Dimensions, StyleSheet, TouchableHighlight } from 'react-native';
import CheckBox from 'expo-checkbox';
import { RootStackParamList, Todo } from '../../types';
import { TodoContext } from '../../context/todoContexts';
import { TodoActions } from '../../context/todoReducer';
import TodoDetailScreen from '../../screens/TodoDetailScreen';

export default function TodoCard({todo}:{todo: Todo}){

    const [isDone, setDone] = useState(todo.done)
    const checkboxColor1 = '#40C4FF'
    const checkboxColor2 = '#01579B'
    const [cbColor, setcbColor] = useState(checkboxColor1)
    const {state, dispatch} = useContext(TodoContext)
    const navigation = useNavigation()

    const editTodo = () => {
        navigation.navigate('TodoDetail', {todo})
    }

    const updateDone = () => {
        dispatch({
            type: TodoActions.UpdateDone,
            payload: {
                id: todo.id,
            }
        })        
    }

    return(       
        <TouchableHighlight 
            onPress={() => editTodo()} 
            style={styles.button} 
            onPressIn={() => setcbColor(checkboxColor2)}
            onPressOut={() => setcbColor(checkboxColor1)}
            underlayColor='#03A9F4'>
            <View style={styles.buttonContainer}>
                <View style = {styles.container}>
                    <Text style={styles.titleStyle} numberOfLines={1}>{todo.title}</Text>
                    <Text style={styles.descStyle} numberOfLines={1}>{todo.description}</Text>
                </View>
                <CheckBox 
                    style={styles.checkbox}
                    value={isDone}
                    onValueChange={(e) => { setDone(e); updateDone(); }}                                
                    color={isDone ? cbColor : 'white'}
                    />
            </View>
        </TouchableHighlight >
    );
}
const styles = StyleSheet.create({
    button: {
        minWidth: Dimensions.get('window').width / 2 - 12.5,
        borderRadius: 8,
        padding: 10,
        marginBottom: 5,           
        height: 80,
        backgroundColor: '#01579B',       
    },
    buttonContainer:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    container: {
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