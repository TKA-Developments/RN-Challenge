import * as React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import AddItem from '../components/addItems';
import { TextInput } from 'react-native-gesture-handler';

export default function TabOneScreen() {
  const [tasks, setTask] = React.useState([
    {text: 'Task 1', key: '1'},
    {text: 'Task 2', key: '2'},
    {text: 'Task 3', key: '3'}
  ]);

  const submitHandler = (text: any) => {
    setTask((prevTasks) => {
      return [
        {text: text, key: Math.random().toString() },
        ...prevTasks
      ]
    })
  }

   const deleteTask = (key: string) => {
    setTask((prevTasks) => {
      return prevTasks.filter(tasks => tasks.key != key);
    });
  }

  

  const pushTask = (key) => {


  }

  const editTask = (key) => {

  }

  return (
    <View style={styles.container}>

      <View style={styles.content}>
      <AddItem submitHandler = {submitHandler} />
        <FlatList 
        data={tasks}
        renderItem={({item}) => (
          <View style={styles.task}> 
          <TextInput style={styles.txt}
           
            value={item.text}
           
          />
          {/* <Text>
            {item.text}
          </Text> */}
          <View>
            <Button onPress={() => deleteTask(item.key)} title='delete' />
            <Button onPress={() => pushTask(item.key)} title="Done" />
            {/* <Button onPress={() => editTask(item.key)} title="Edit"/>  */}
          </View>
          
          </View>
         
        )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  content: {
    padding: 30,
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
  task: {
    padding: 16,
    marginTop: 16,
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10
  },
  txt: {
    color: 'white'
  }

});
