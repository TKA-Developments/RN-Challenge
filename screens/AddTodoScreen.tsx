import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Alert,  } from 'react-native';
import {  View, TextInput,  } from '../components/Themed';
import { TodoContext,  } from '../context/todoContexts';
import { isEmpty, TodoActions } from '../context/todoReducer';
import { useNavigation, } from '@react-navigation/native';

export default function AddTodoScreen(){
    
    const [ title, _setTitle ] = useState('')
    const [ descr, _setDesc] = useState('')

    const navigation = useNavigation()

    const { state, dispatch } = useContext(TodoContext)

    const saveTodo = () => {
        
        dispatch({
            type: TodoActions.Add,
            payload: {
                title: title,
                description: descr,
            }
        })
    }
    useEffect(()=> { 
        const unsub = navigation.addListener('beforeRemove',() => {
            (!isEmpty(title) || !isEmpty(descr)) ? saveTodo() : null
            
        }, )
        return unsub
    })

    return(
        <View style={styles.container}>
            <TextInput style={styles.titleInputStyle}
                placeholder='Title'
                value={title}
                onChangeText={_setTitle}
                multiline={true}
                
            />
            <View style={styles.separator} 
                    lightColor="#eee" 
                    darkColor="rgba(255,255,255,0.1)" />
            <TextInput style={styles.descrInputStyle}
                value={descr}                
                onChangeText={_setDesc}
                multiline={true}
                placeholder='Description'             
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        alignItems: 'stretch',
        paddingTop: 15,
        paddingHorizontal: 10,
    },
    titleInputStyle: {
        fontSize: 24,
    },
    descrInputStyle: {
        flex: 1,
        alignSelf: 'stretch',
        textAlignVertical: 'top',
        marginTop: 5,
        fontSize: 16,
    },
    separator: {
        height: StyleSheet.hairlineWidth,        
    },
})