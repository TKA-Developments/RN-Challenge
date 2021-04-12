import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Alert,  } from 'react-native';
import {  View, TextInput, ToggleButton, Text  } from '../components/Themed';
import { TodoContext,  } from '../context/todoContexts';
import { isEmpty, TodoActions } from '../context/todoReducer';
import { useNavigation, } from '@react-navigation/native';
import { Todo, TodoThemeNames } from '../types';
import { GetThemeColor } from '../components/one/TodoCard';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

export default function TodoDetailScreen({route, navigation}: {route?: any, navigation?:any}){

    const {id, titl, descr, them} = route.params == undefined ?
     {id: undefined, titl: undefined, descr: undefined, them: undefined} 
     : 
     route.params
    var initTitle = titl == undefined ? '' : titl
    var initDesc = descr == undefined ? '' : descr
    var initTheme = them == undefined ? 'default' : them
    const themeSel: TodoThemeNames[] = [
        'default',
        'amber',
        'cyan',
        'deeppurple',
        'lightgreen',
        'lime',
        'teal',
        'yellow',
        'blue',
    ]

    const [ title, _setTitle ] = useState(initTitle)
    const [ desc, _setDesc] = useState(initDesc)
    const [ theme, setTheme ] = useState(initTheme)

    const { state, dispatch } = useContext(TodoContext)

    const saveTodo = () => {
        
        id == undefined ?
        dispatch({
            type: TodoActions.Add,
            payload: {
                title: title,
                description: desc,
                theme: theme,
            }
        })
        :
        dispatch({
            type: TodoActions.Update,
            payload: {
                id: id,
                title: title,
                description: desc,
                theme: theme,
            }
        })
    }
    useEffect(()=> { 
        const unsub = navigation.addListener('beforeRemove',() => {
            (!isEmpty(title) || !isEmpty(desc)) ? saveTodo() : null
            
        }, )
        return unsub
    })

    const colorChoices = () => {
        let colors: any[] = []
        themeSel.map((e) => {
            colors = [
                ...colors,
                <ToggleButton
                    key={e}
                    style={styles.tButtonStyle}
                    checked={theme == e}
                    checkedColor={GetThemeColor(1, e)}
                    onPress={() => setTheme(e)}
                >
                    {
                        theme == e ?
                            <AntDesign
                                name='check'
                                color={GetThemeColor(3, e)}
                                size={12}
                            />
                            :
                            undefined
                    }
                </ToggleButton>
            ]
        });
        return colors;
    }

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
            <View style={styles.colorContainer}>
                <ScrollView contentContainerStyle={{ padding: 10,}} showsHorizontalScrollIndicator={false} horizontal>
                    {
                        colorChoices()
                    }                
            </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        alignItems: 'stretch',
        paddingTop: 15,
        
    },
    titleInputStyle: {
        fontSize: 24,
        paddingHorizontal: 10,
    },
    descrInputStyle: {
        flex: 1,
        alignSelf: 'stretch',
        textAlignVertical: 'top',
        marginTop: 5,
        fontSize: 16,
        paddingHorizontal: 10,
    },
    separator: {
        height: StyleSheet.hairlineWidth,        
    },
    colorContainer: {
        minHeight: 45,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',        
    },
    tButtonStyle: {
        minWidth: 36,   
        minHeight: 36,         
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        marginRight: 10,
    },
})