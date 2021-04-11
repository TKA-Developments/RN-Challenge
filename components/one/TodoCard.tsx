import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity } from '../Themed';
import { Dimensions, StyleSheet, TouchableHighlight } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Todo } from '../../types';
import { TodoContext } from '../../context/todoContexts';
import { TodoActions } from '../../context/todoReducer';

export default function TodoCard({todo}:{todo: Todo}){
    //const [todo, setTodo] = React.useState(item)
    const [isDone, setDone] = React.useState(todo.done)
    const [cbColor, setcbColor] = React.useState('#40C4FF')
    const {state, dispatch} = React.useContext(TodoContext)

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