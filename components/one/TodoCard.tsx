import React, { useContext, useState, useEffect} from 'react';
import { useNavigation, } from '@react-navigation/native';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CheckBox from 'expo-checkbox';

import { Text, View, IconButton } from '../Themed';

import { Todo, TodoColors, TodoThemeNames } from '../../types';
import { TodoContext } from '../../context/todoContexts';
import { isEmpty, TodoActions,  } from '../../context/todoReducer';

type TodoCardProps = {
    item: Todo
}

export function GetThemeColor(which: number /*1: card | 2: cb | 3: text*/, theme?: TodoThemeNames){
    if (theme == undefined || theme == 'default') return which == 1 ? TodoColors.DefaultCardColor.toString() : which == 2 ? TodoColors.DefaultCBColor.toString() : TodoColors.DefaultTextColor.toString()
    switch(theme){
        case 'cyan':
            return which == 1 ? TodoColors.CyanCardColor.toString() : which == 2 ? TodoColors.CyanCBColor.toString() : TodoColors.CyanTextColor.toString()
        case 'amber':
            return which == 1 ? TodoColors.AmberCardColor.toString() : which == 2 ? TodoColors.AmberCBColor.toString() : TodoColors.AmberTextColor.toString()
        case 'deeppurple':
            return which == 1 ? TodoColors.DeepPurpleCardColor.toString() : which == 2 ? TodoColors.DeepPurpleCBColor.toString() : TodoColors.DeepPurpleTextColor.toString()
        case 'lightgreen':
            return which == 1 ? TodoColors.LightGreenCardColor.toString() : which == 2 ? TodoColors.LightGreenCBColor.toString() : TodoColors.LightGreenTextColor.toString()
        case 'lime':
            return which == 1 ? TodoColors.LimeCardColor.toString() : which == 2 ? TodoColors.LimeCBColor.toString() : TodoColors.LimeTextColor.toString()
        case 'yellow':
            return which == 1 ? TodoColors.YellowCardColor.toString() : which == 2 ? TodoColors.YellowCBColor.toString() : TodoColors.YellowTextColor.toString()
        case 'teal':
            return which == 1 ? TodoColors.TealCardColor.toString() : which == 2 ? TodoColors.TealCBColor.toString() : TodoColors.TealTextColor.toString()
        case 'blue':
            return which == 1 ? TodoColors.BlueCardColor.toString() : which == 2 ? TodoColors.BlueCBColor.toString() : TodoColors.BlueTextColor.toString()
    }
}

export default function TodoCard(props: TodoCardProps){
    const [todoState, setTodoState] = useState<Todo>(props.item)
    const [isDone, setDone] = useState(todoState.done)
    useEffect(()=>{
        setTodoState(props.item)
        setDone(props.item.done)
        setbColor(isDone ? buttonDisabledColor : buttonActiveColor)
    })
    
    const cbColor = GetThemeColor(2, todoState.theme)
    const buttonActiveColor = GetThemeColor(1, todoState.theme)
    const buttonDisabledColor = '#E0E0E0'
    const textColor = !isDone ? GetThemeColor(3, todoState.theme) : 'black'

    const [bColor, setbColor] = useState(buttonActiveColor)
    const [bDisabled, setbDisabled] = useState(false)

    const {state, dispatch} = useContext(TodoContext)
    const navigation = useNavigation()

    const editTodo = () => {
        navigation.navigate('TodoDetail', {
            id: todoState.id,
            titl: todoState.title,
            descr: todoState.description,
            them: todoState.theme,
        })
    }

    const updateDone = (val: boolean) => {
        setDone(val)
        dispatch({
            type: TodoActions.UpdateDone,
            payload: {
                id: todoState.id,
            }
        })
        //setbColor(val ? buttonDisabledColor : buttonActiveColor)
    }
   
    const confirmRemove = () => {
        setbDisabled(true)
    }

    const cancelRemove = () => {
        setbDisabled(false)
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
        <TouchableOpacity 
            onPress={() => editTodo()} 
            style={[{backgroundColor: bColor}, styles.button]}
            onLongPress={()=>confirmRemove()}
            disabled={bDisabled}    
            >
            <View style={styles.buttonContainer}>                
                <View style = {styles.container}>
                    {!isEmpty(todoState.title) ? 
                    <Text style={[{
                        textDecorationLine: isDone ? 'line-through' : undefined,
                        color: textColor} ,styles.titleStyle]} 
                    numberOfLines={!isEmpty(todoState.description) ? 1 : 3}>
                        {todoState.title}
                    </Text>
                    : undefined}
                    {!isEmpty(todoState.description) ? 
                    <Text style={[{ 
                        textDecorationLine: isDone ? 'line-through' : undefined,
                        color: textColor }, styles.descStyle]}
                    numberOfLines={!isEmpty(todoState.title) ? 2 : 3}>
                        {todoState.description}
                    </Text>
                    : undefined}
                </View>
                <CheckBox 
                    style={styles.checkbox}
                    value={isDone}
                    onValueChange={updateDone}                                
                    color={isDone ? cbColor : textColor}
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
        </TouchableOpacity >
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
    },
    descStyle:{
        fontSize: 14,
    },
    confirmStyle:{
        position: 'absolute',
        height: '100%',
        width:'100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        opacity: 0.9,
        alignItems:'center',
        justifyContent: 'center',        
    },
})