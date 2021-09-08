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

const TaskList = ({task}) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity style={styles.square}>
        </TouchableOpacity>
        <Text style={styles.itemText}>
          {task}
        </Text>
      </View>
      <View style={styles.circular}>
      </View>
    </View>
  );
};

const TabTitle = ({itemsLength, tabScreen}) => {
  return (
    <View style={styles.title}>
      { tabScreen === 'TabOne' && itemsLength === 0 ?
        <Text style={styles.title}>
          Nothing to do, relax!
        </Text> :
        tabScreen === 'TabOne' && itemsLength !== 0 ?
        <Text style={styles.title}>
          Here we go, your task is ready!
        </Text> :
        tabScreen === 'TabTwo' && itemsLength === 0 ?
        <Text style={styles.title}>
          Nothing completed, what are you doing?!!
        </Text> :
        tabScreen === 'TabTwo' && itemsLength !== 0 ?
        <Text style={styles.title}>
          Here's your completed tasks, good job!
        </Text> :
        null
      }
    </View>
  );
};

export default function TaskItems({containerStyle, tabScreenSelect}) {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [completed, setCompleted] = useState([]);

  const handleAddTask = () => {
    // Note: not sure if dismiss the keyboard after adding a task a good thing
    // Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    setCompleted([...completed, itemsCopy.splice(index, 1)]);
    setTaskItems(itemsCopy);
  };

  console.log(completed)
  return (
    <View style={containerStyle}>
      <TabTitle
        tabScreen={tabScreenSelect}
        itemsLength={taskItems.length}
      />
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
      { tabScreenSelect === 'TabOne' ?
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
        </KeyboardAvoidingView> :
        null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    backgroundColor: '#e8eaed',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
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
  item: {
    backgroundColor: '#ffffff',
    margin: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  itemText: {
    maxWidth: '80%',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55bcf6',
    borderRadius: 5,
    marginRight: 15,
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55bcf6',
    borderWidth: 2,
    borderRadius: 5,
  },
});