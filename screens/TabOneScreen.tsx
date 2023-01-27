import React, { useState } from 'react';
import { StyleSheet, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, View } from '../components/Themed';
import TodoItem from '../components/todo-item';

let id = '5'

export default function TabOneScreen() {

  const [titleList, setTitleList] = useState('');

  const [todos, setTodos] = useState([
    {
      id: '1',
      content: 'learn math',
      isDone: false,
    }, {
      id: '2',
      content: 'do homework',
      isDone: false,
    }, {
      id: '3',
      content: 'dinner with emma',
      isDone: false,
    }, {
      id: '4',
      content: 'pay bills',
      isDone: false,
    }
  ])

  const addTodo = (atIndex: number) => {
    const newTodos = [...todos]
    newTodos.splice(atIndex, 0, {
      id:  id,
      content: '',
      isDone: false,
    })
    setTodos(newTodos)
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'height' : 'height'}
    >
      <TextInput
        style={styles.title}
        value={titleList}
        onChangeText={setTitleList}
        placeholder={'New List'}
      />

      <FlatList
        data={todos}
        renderItem={({ item, index }) => (
          <TodoItem 
            todo={item} 
            onSubmit={() => (addTodo(index + 1))} 
          />
        )}
        style={{ width:'100%' }}
      />

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  title: {
    width: '100%',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});
