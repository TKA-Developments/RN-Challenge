import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import TaskList from '../components/TaskList';

export default function TabOneScreen() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    // Note: not sure if dismiss the keyboard after adding a task a good thing
    // Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      { taskItems.length === 0 ?
        <Text style={styles.title}>
          Nothing to do, relax!
        </Text> :
        <Text style={styles.title}>
          Here we go, your task is ready!
        </Text>
      }
      <View style={styles.tasks}>
        {
          taskItems.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => completeTask(index)}
              >
                  <TaskList task={item} />
              </TouchableOpacity>
            )
          })
        }
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTask}
      >
        <TextInput
          style={styles.input}
          placeholder='Write a task'
          value={task}
          onChangeText={(newTask) => setTask(newTask)}
        />
        <TouchableOpacity onPress={() => handleAddTask()} >
          <View style={styles.addTask}>
            <AntDesign
              name='plus'
              style={styles.addTaskIcon}
            />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  tasks: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  writeTask: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    width: 250,
    marginVertical: -20,
    marginHorizontal: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    borderRadius: 60,
    borderColor: '#c0c0c0',
    borderWidth: 1,
  },
  addTask: {
    width: 60,
    height: 60,
    backgroundColor: '#ffffff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c0c0c0',
    borderWidth: 1,
  },
  addTaskIcon: {
    fontSize: 20,
  },
});

// unused default component
// import EditScreenInfo from '../components/EditScreenInfo';
      // <View
      //   style={styles.separator}
      //   lightColor="#eee"
      //   darkColor="rgba(255,255,255,0.1)"
      // />
      // <EditScreenInfo path="/screens/TabOneScreen.tsx" />
