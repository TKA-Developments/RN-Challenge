import React, {useState} from 'react';
import { StyleSheet, TextInput, ScrollView, SafeAreaView  } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import FilterAndSearch from '../components/FilterAndSearch';
import { Text, View } from '../components/Themed';
import TodoInsert from '../components/TodoInsert';
import TodoList from '../components/TodoList';

export default function TabOneScreen() {
  const [todos, setTodos] = useState([] as any);
  const [filterCode, setFilterCode] = useState(0);
  const [showOnlyCompleted, setShowOnlyCompleted] = useState(false);
  const [showAll, setShowAll] = useState(true);

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

  const onSetShowCompleted = (status: boolean) => {
    setShowOnlyCompleted(status);
  };

  const onSetShowAll = (status: boolean) => {
    setShowAll(status);
  };

  const getFilteredList = () => {
    if (showAll){
      return todos;
    } else {
      if(showOnlyCompleted){
        return todos.filter((todo: any) => todo.completedStatus === true);
      } else {
        return todos.filter((todo: any) => todo.completedStatus === false);
      }
    }
  };

  const emptyOrNot = () =>{
    if (todos && todos.length > 0){
      let fitleredList = getFilteredList();
      return <TodoList 
          data={fitleredList} 
          onToggle={onToggle} 
          onRemove={onRemove} 
          onEdit={onEdit}/>;
    } else {
      return <View style={styles.containerEmptyMessage}>
          <Text style={styles.emptyMessageText}>
            There's no task to do.
          </Text>
        </View>;
    }
  };

  return (
    <SafeAreaView  style={styles.container}>
      {/* <Text style={styles.title}>What to do today?</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
      {/* <TodoInsert onAddTodo={addTodo}/> */}
      <FilterAndSearch onSetShowCompleted={onSetShowCompleted} onSetShowAll={onSetShowAll}/>
      <View style={styles.card}>
        {emptyOrNot()}
      </View>
      <View style={styles.bottom}>
        <TodoInsert onAddTodo={addTodo}/>
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
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15, 
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
  bottom: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 25,
    marginHorizontal: 20,
    backgroundColor: '#ddd'
  },
  emptyMessageText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    color: '#bbb'
  },
  containerEmptyMessage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15, 
  }
});
