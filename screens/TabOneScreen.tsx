import React, {useState} from 'react';
import { StyleSheet, TextInput, ScrollView, SafeAreaView  } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import TodoFilter from '../components/TodoFilter';
import { Text, View } from '../components/Themed';
import TodoInsert from '../components/TodoInsert';
import TodoList from '../components/TodoList';
import TodoSearch from '../components/TodoSearch';

export default function TabOneScreen() {
  const [todos, setTodos] = useState([] as any);
  const [filterCode, setFilterCode] = useState(0);
  const [keywords, setKeywords] = useState('');
  // const [showOnlyCompleted, setShowOnlyCompleted] = useState(false);
  // const [showAll, setShowAll] = useState(true);

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

  const onSetFilterCode = (code: number) =>{
    setFilterCode(code);
  };

  const onSetKeywords = (taskName: string) => {
    setKeywords(taskName);
  }

  const getFilteredList = () => {
    switch(filterCode){
      case 0:
        return todos;
      case 1:
        return todos.filter((todo: any) => todo.completedStatus === false);
      case 2:
        return todos.filter((todo: any) => todo.completedStatus === true);
      default:
        return todos;
    }
  };

  const showEmptyMessage = (message: string) => {
    return <View style={styles.containerEmptyMessage}>
          <Text style={styles.emptyMessageText}>
            {message}
          </Text>
        </View>;
  };

  const emptyOrNot = () =>{
    console.log(keywords);
    if (todos && todos.length > 0){
      let filteredList = getFilteredList();
      if(keywords || keywords !== ''){
        filteredList = filteredList.filter((todo: any) => todo.taskName.toLowerCase().match(keywords.toLowerCase()));
        if(filteredList.length <= 0){
          console.log("kosong");
          return showEmptyMessage("There isn't any task name that match with \"" + keywords + "\" in here.");
        }
      } 
      if (filteredList && filteredList.length > 0){
        return <TodoList 
          data={filteredList} 
          onToggle={onToggle} 
          onRemove={onRemove} 
          onEdit={onEdit}/>;
      } else {
        if(filterCode === 1){
          return showEmptyMessage("There isn't any task to do.");
        } else if (filterCode === 2){
          return showEmptyMessage("There isn't any completed task.");
        } else {
          return showEmptyMessage("There isn't any task for today.");
        }
      }
    } else {
      return showEmptyMessage("There isn't any task for today.");
    }
  };

  return (
    <SafeAreaView  style={styles.container}>
      <TodoSearch 
        onSetKeywords={onSetKeywords}/>
      <View style={styles.card}>
        <TodoFilter 
          onSetFilterCode={onSetFilterCode}/>
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
    paddingTop: 5,
    paddingBottom: 110
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
    backgroundColor: '#eee'
  },
  emptyMessageText: {
    fontSize: 14,
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
    paddingHorizontal: 10
  }
});
