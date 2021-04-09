import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import SearchBar from '../components/one/SearchBar';
import { Text, View, FloatingActionButton } from '../components/Themed';

import TodoLists from '../components/one/TodoLists';
import { TodoContext, TodoProvider } from '../context/todoContexts';
import { TodoActions } from '../context/todoReducer';

export default function TabOneScreen() {
  
  const [todo, setTodo] = React.useState({
    id: 0,
    title: "",
    description: "",
    date: new Date(),
    done: false,
  })

  const { state, dispatch } = React.useContext(TodoContext)

  const handleTodo = (type: string, value: string) => {
    setTodo(todo => ({
      ...todo,
      [type]: value
    }))
  }

  const addTodo = () => {
    var date = new Date()
    dispatch({
      type: TodoActions.Add,
      payload: {
        id: date.getTime() / 1000,
        title: todo.title,
        description: todo.description,
        date: date,
        done: false,
      }
    })
  }

  const removeTodo = () => {
    dispatch({
      type: TodoActions.Remove,
      payload: {
        id: todo.id,
      }
    })
  }

  const updateTodo = () => {
    dispatch({
      type: TodoActions.Update,
      payload: {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        date: todo.date,
        done: todo.done,
      }
    })
  }



  return (
    <TodoProvider>
      <View style={styles.container}>
        {/* <ScrollView removeClippedSubviews={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContentStyle}> */}
          {/* <View> */}
        <SearchBar />
          {/* </View> */}
        <TodoLists />
        {/* </ScrollView> */}
        <FloatingActionButton 
          style={styles.fabStyle}          
          />
        {/*<EditScreenInfo path="/screens/TabOneScreen.tsx" />*/}
      </View>
    </TodoProvider>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  fabStyle:{
    position:'absolute',
    marginRight:15,
    bottom:10,
    right:10,
  }
})
