import React, {useState} from 'react';
import { StyleSheet, TextInput, ScrollView, SafeAreaView  } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import TodoInsert from '../components/TodoInsert';
import TodoList from '../components/TodoList';

export default function TabOneScreen() {
  const [todos, setTodos] = useState([] as any);

  const addTodo = (text: string) => {
      let currDate = new Date();
      setTodos([
          ...todos,
          {id: Math.random().toString(), taskName: text, completedStatus: false, createdAt: currDate},
      ]);
      console.log(todos);
  };

  const onRemove = (id: string) => (e: any) => {
    setTodos(todos.filter((todo: any) => todo.id !== id));
  };

  const onToggle = (id: string) => (e: any) => {
    setTodos(
      todos.map( (todo: any) =>
        todo.id === id ? {...todo, completedStatus: !todo.completedStatus} : todo,
      ),
    );
  };

  const onEdit = (id: string, newName: string) => (e: any) => {
    console.log("masukkk");
    setTodos(
      todos.map( (todo: any) =>
        todo.id === id ? {...todo, taskName: newName} : todo,
      ),
    );
    console.log(todos);
  };

  return (
    <SafeAreaView  style={styles.container}>
      {/* <Text style={styles.title}>What to do today?</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
      <TodoInsert onAddTodo={addTodo}/>
      <View style={styles.card}>
        <TodoList 
          data={todos} 
          onToggle={onToggle} 
          onRemove={onRemove} 
          onEdit={onEdit}/>
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 10, // to provide rounded corners
    borderTopRightRadius: 10, // to provide rounded corners
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 18,
    marginLeft: 20,
  },
});
