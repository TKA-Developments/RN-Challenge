import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import SearchBar from '../components/one/SearchBar';
import { Text, View, AddToListButton } from '../components/Themed';
import { useNavigation } from '@react-navigation/native'

import TodoLists from '../components/one/TodoLists';
import { TodoContext, TodoProvider } from '../context/todoContexts';
import { TodoActions } from '../context/todoReducer';
import { Props } from '../navigation';

export default function TabOneScreen() {


  // const [todo, setTodo] = React.useState({
  //   id: 0,
  //   title: "",
  //   description: "",
  //   date: new Date(),
  //   done: false,
  // })

  // const { state, dispatch } = React.useContext(TodoContext)

  // const handleTodo = (type: string, value: string) => {
  //   setTodo(todo => ({
  //     ...todo,
  //     [type]: value
  //   }))
  // }

  // const addTodo = () => {
  //   var date = new Date()
  //   dispatch({
  //     type: TodoActions.Add,
  //     payload: {
  //       id: date.getTime() / 1000,
  //       title: todo.title,
  //       description: todo.description,
  //       date: date,
  //       done: false,
  //     }
  //   })
  // }

  // const removeTodo = () => {
    
  //   dispatch({
  //     type: TodoActions.Remove,
  //     payload: {
  //       id: todo.id,
  //     }
  //   })
  // }

  // const updateTodo = () => {
     
  //   dispatch({
  //     type: TodoActions.Update,
  //     payload: {
  //       id: todo.id,
  //       title: todo.title,
  //       description: todo.description,
  //       date: todo.date,
  //       done: todo.done,
  //     }
  //   })
  // }

    // const navigation = useNavigation()
    // const goToAddTodo = () => {
    //   navigation.navigate('AddTodo')

    // }
    return (
      
        <View style={styles.container}>
          <SearchBar />
          <TodoLists />
          {/* <AddToListButton 
            style={styles.fabStyle}
            iconSize={30}
            iconBackColor='#40C4FF'
            iconHeight={60}
            iconWidth={60}
            iconRadius={30}
            onPress={goToAddTodo}          
            /> */}
        </View>
      
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',    
    justifyContent: 'flex-start',
    paddingTop: 15,
    paddingHorizontal:10,
  },
  scrollContentStyle:{
    paddingVertical:15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  // fabStyle:{
  //   position:'absolute',
  //   marginRight:15,
  //   marginBottom: 15,
  //   bottom:10,
  //   right:10,
  // }
})
