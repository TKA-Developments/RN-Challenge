import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Alert,  } from 'react-native';
import {  View, TextInput,  } from '../components/Themed';
import { TodoContext,  } from '../context/todoContexts';
import { isEmpty, TodoActions } from '../context/todoReducer';
import { useNavigation, } from '@react-navigation/native';
import { Todo } from '../types';

export default function TodoDetailScreen({route, navigation}: {route?: any, navigation?:any}){

    const {id, titl, descr} = route.params == undefined ?
     {id: undefined, titl: undefined, descr: undefined} 
     : 
     route.params
    var initTitle = titl == undefined ? '' : titl
    var initDesc = descr == undefined ? '' : descr
    //var id = route.params == undefined ? undefined : route.params.id
    //Alert.alert(`${initTitle}`)
    const [ title, _setTitle ] = useState(initTitle)
    const [ desc, _setDesc] = useState(initDesc)

    //const navigation = useNavigation()

    const { state, dispatch } = useContext(TodoContext)

    const saveTodo = () => {
        
        id == undefined ?
        dispatch({
            type: TodoActions.Add,
            payload: {
                title: title,
                description: desc,
            }
        })
        :
        dispatch({
            type: TodoActions.Update,
            payload: {
                id: id,
                title: title,
                description: desc,
            }
        })
    }
    useEffect(()=> { 
        const unsub = navigation.addListener('beforeRemove',() => {
            (!isEmpty(title) || !isEmpty(desc)) ? saveTodo() : null
            
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
                value={desc}                
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