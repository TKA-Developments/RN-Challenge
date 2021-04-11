import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity } from '../Themed';
import { StyleSheet, TouchableHighlight } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Todo } from '../../types';
import { TodoContext } from '../../context/todoContexts';
import { TodoActions } from '../../context/todoReducer';

export default function TodoCard({todo} : {todo: Todo}){
    const [isDone, setDone] = React.useState(todo.done)
    const [cbColor, setcbColor] = React.useState('#40C4FF')
    const { state, dispatch } = React.useContext(TodoContext)

    // const handleTodo = (type: string, value: any) => {
    //     setTodo(cTodo[type],)
    // }

    // const setDone = () => {

    // }

    const updateDone = () => {
        dispatch({
            type: TodoActions.UpdateDone,
            payload: {
                id: todo.id,
            }
        })        
    }

    return(
        // <Pressable style={({ pressed }) => [
        //     {
        //         backgroundColor: pressed
        //             ? '#0277BD'
        //             : '#01579B'
        //     },
        //     styles.pressable
        // ]}>
        <TouchableHighlight 
            onPress={() => null} 
            style={styles.button} 
            onPressIn={() => setcbColor('#01579B')}
            onPressOut={() => setcbColor('#40C4FF')}
            underlayColor='#03A9F4'>
            <View style={styles.buttonContainer}>
                <View style = {styles.container}>
                    <Text style={styles.titleStyle}>{todo.title}</Text>
                    <Text style={styles.descStyle}>{todo.description}</Text>
                </View>
                <CheckBox 
                    style={styles.checkbox}
                    value={isDone}
                    onValueChange={(e) => { setDone(e); updateDone(); }}                                
                    color={isDone ? cbColor : 'white'}
                    />
            </View>
        </TouchableHighlight >
        // </Pressable>
    );
}
const styles = StyleSheet.create({
    button: {  
        flex: 1,      
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
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