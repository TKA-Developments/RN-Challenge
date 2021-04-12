import React, { useContext, useState, useEffect} from 'react';
import { useNavigation, } from '@react-navigation/native';
import { Dimensions, StyleSheet, TouchableHighlight } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CheckBox from 'expo-checkbox';

import { Text, View, IconButton } from '../Themed';

import { Todo } from '../../types';
import { TodoContext } from '../../context/todoContexts';
import { isEmpty, TodoActions } from '../../context/todoReducer';

type TodoCardProps = {
    item: Todo
}

export default function TodoCard(props: TodoCardProps){
    const [todoState, setTodoState] = useState<Todo>(props.item)
    const [isDone, setDone] = useState(todoState.done)
    useEffect(()=>{
        setTodoState(props.item)
        setDone(props.item.done)
    })

    
    const checkboxColor1 = '#40C4FF'
    const checkboxColor2 = '#01579B'
    const [cbColor, setcbColor] = useState(checkboxColor1)
    const buttonActiveColor = '#01579B'
    const buttonDisabledColor = '#B3E5FC'
    const [bColor, setbColor] = useState(buttonActiveColor)
    const [bDisabled, setbDisabled] = useState(false)

    const {state, dispatch} = useContext(TodoContext)
    const navigation = useNavigation()

    const editTodo = () => {
        navigation.navigate('TodoDetail', {
            id: todoState.id,
            titl: todoState.title,
            descr: todoState.description,
        })
    }

    const updateDone = () => {
        dispatch({
            type: TodoActions.UpdateDone,
            payload: {
                id: todoState.id,
            }
        })        
    }
   
    const confirmRemove = () => {
        setbDisabled(true)
        setbColor(buttonDisabledColor)
    }

    const cancelRemove = () => {
        setbDisabled(false)
        setbColor(buttonActiveColor)
    }

    const removeThisTodo = () => {
        dispatch({
            type: TodoActions.Remove,
            payload: {
                id: todoState.id
            }
        })
        cancelRemove()
    }

    return(       
        <TouchableHighlight 
            onPress={() => editTodo()} 
            style={[{backgroundColor: bColor},  styles.button]}
            onPressIn={() => setcbColor(checkboxColor2)}
            onPressOut={() => setcbColor(checkboxColor1)}
            onLongPress={()=>confirmRemove()}
            disabled={bDisabled}     
            underlayColor='#03A9F4'>
            <View style={styles.buttonContainer}>                
                <View style = {styles.container}>
                    {!isEmpty(todoState.title) ? 
                    <Text style={styles.titleStyle} numberOfLines={!isEmpty(todoState.description) ? 1 : 3}>
                        {todoState.title}
                    </Text>
                    : undefined}
                    {!isEmpty(todoState.description) ? 
                    <Text style={styles.descStyle} numberOfLines={!isEmpty(todoState.title) ? 2 : 3}>
                        {todoState.description}
                    </Text>
                    : undefined}
                </View>
                <CheckBox 
                    style={styles.checkbox}
                    value={isDone}
                    onValueChange={(e) => { setDone(e); updateDone(); }}                                
                    color={isDone ? cbColor : 'white'}
                    />
                {bDisabled ? <View style={styles.confirmStyle}>
                    <IconButton onPress={() => removeThisTodo()}
                        style={{
                            margin: 10,                            
                        }}
                        iconRadius={18}
                        iconPadding={5}
                        iconBackColor='white'>
                        <Feather name='trash'
                            color='#D50000'
                            size={24} />
                    </IconButton>
                    <IconButton onPress={()=>cancelRemove()}
                        style={{
                            margin: 10,
                        }}
                        iconRadius={18}
                        iconPadding={5}
                        iconBackColor='#D50000'>
                        <Feather name='x'
                                color='white'
                                size={24}/>
                    </IconButton>
                </View> : undefined}
            </View>
        </TouchableHighlight >
    );
}
const styles = StyleSheet.create({
    button: {
        minWidth: Dimensions.get('window').width / 2 - 12.5,
        borderRadius: 8,
        marginBottom: 5,           
        height: 80,             
    },
    buttonContainer:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    checkbox: {
        marginRight: 10,
        alignSelf: 'center',
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#FFFFFF',        
    },
    descStyle:{
        fontSize: 14,
        color: '#F5F5F5',
    },
    confirmStyle:{
        position: 'absolute',
        height: '100%',
        width:'100%',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems:'center',
        justifyContent: 'center',        
    },
})