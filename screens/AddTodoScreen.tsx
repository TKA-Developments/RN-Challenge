import React, {Component, useState } from 'react';
import NavigationProp, { StyleSheet, ScrollView, BackHandler, Alert,  } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import SearchBar from '../components/one/SearchBar';
import { Text, View, TextInput, SaveButton } from '../components/Themed';

import TodoLists from '../components/one/TodoLists';
import { TodoContext, TodoProvider } from '../context/todoContexts';
import { isEmpty, TodoActions } from '../context/todoReducer';
import { Props } from '../navigation';
import { Todo } from '../types';
import { useNavigation, } from '@react-navigation/native';




export default function AddTodoScreen(){
    
    // constructor(props: Props & Todo){
    //     super(props)        
    //     this.state = {
    //         id: 0,
    //         title: '',
    //         description: '',
    //     }
    //     //const navigation = useNavigation()
        
    // }
    // static navigationOptions = ({ state }: {state: any}, { navigation }: {navigation: any}) => {
    //     //const { navigation } = AddTodoScreen.props
    //     return {
    //         headerRight: () => (
    //             <SaveButton
    //                 onPress={() => {
    //                     saveTodo(state.title, state.description)
    //                     Alert.alert(`Todo Added !\nTitle: ${state.title}\nDescription: ${state.description}`)
    //                     navigation.goBack()
    //                 }}
    //                 iconPadding={15}
    //                 iconSize={24} />
    //         ),
    //     }
    // }
    
    // componentDidMount(){
    //     const { navigation } = this.props
    //     // navigation.setParams({
    //     //     handleSave: 
    //     // })
    //     navigation.setOptions(() => ({
    //         title: 'anjay',
    //         headerRight: () => (
    //             <SaveButton
    //                 onPress={() => {
    //                     saveTodo(this.state.title, this.state.description)
    //                     Alert.alert(`Todo Added !\nTitle: ${this.state.title}\nDescription: ${this.state.description}`)
    //                     navigation.goBack()
    //                 }}
    //                 iconPadding={15}
    //                 iconSize={24} />
    //         ),
    //     }))
    // }
    //render(){
        //const [title, setTitle] = useState('')
    
        // })
    
    const [ title, _setTitle ] = React.useState('')
    const [ descr, _setDesc] = React.useState('')
    let t: string, d: string
    const setTitle = (value: string) => {
        t = value
        _setTitle(value)
    }
    const setDesc = (value: string) => {
        d = value
        _setDesc(value)
    }
    const navigation = useNavigation()
    // useLayoutEffect(() =>{
        // navigation.addListener('state', (e)=> {
            
        // })
    // navigation.setOptions(() => ({
    //     title: 'anjay',
    //     headerRight: () => (
    //         <SaveButton
    //             onPress={() => {
    //                 saveTodo(t, d)
    //                 Alert.alert(`Todo Added !\nTitle: ${t}\nDescription: ${d}`)
    //                 navigation.goBack()
    //             }}
    //             iconPadding={15}
    //             iconSize={24} />
    //     ),
    // }))
    // const titleRef = React.useRef()
    // const descrRef = React.useRef()
    const { state, dispatch } = React.useContext(TodoContext)
    // const initState = {
    //     title: '',
    //     description: '',
    // }
    // const [data, setData] = useState(initState)
    const saveTodo = () => {
        
        dispatch({
            type: TodoActions.Add,
            payload: {
                title: title,
                description: descr,
            }
        })
    }
    React.useEffect(()=> { 
        const unsub = navigation.addListener('beforeRemove',() => {
            (!isEmpty(title) || !isEmpty(descr)) ? saveTodo() : null
            
        }, )
        return unsub
    })

    // const handleChange = (event: any) => {
    //     setData({
    //         ...data,
    //         [event.target.name]: event.target.value
    //     })
    // }
    // const setRouteTitle = (value: string) => {
    //     navigation.setOptions({
    //         title: value
    //     })
    //     setTitle(value)
    // }
    // const setTitle = (value: string) =>{
    //     this.setState({ title: value })
    // }
    // const setDesc = (value: string) =>{
    //     this.setState({ description: value })
    // }

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
    //}
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