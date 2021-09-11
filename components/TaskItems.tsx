import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  FlatList
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import AddInput from '../components/AddInput';
import TaskList from '../components/TaskList';

// TODO: make a header
export default function TaskItems({containerStyle, tabScreenSelect}) {
  const [data, setData] = useState([]);
  const [completed, setCompleted] = useState(false);

  const handleAddTask = (value) => {
    setData((prevTask) => {
      return [
        ...prevTask,
        {
          value: value,
          key: Math.random().toString(),
          completed: false,
        },
      ];
    });
  };

  const handleDeleteTask = (key) => {
    setData((prevTask) => {
      return prevTask.filter((task) => task.key != key);
    });
  };

  // console.log(completed)

  // TODO: need to figure out how to setCompleted back to false
  const toggleCompleteTask = (item) => {
    item.completed == completed ?
      item.completed = setCompleted(true) :
      item.completed = setCompleted(false)
  };

  return (
    <View style={containerStyle}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleCompleteTask(item)}
          >
            <TaskList
              item={item}
              completed={item.completed}
              handleDeleteTask={handleDeleteTask}
            />
          </TouchableOpacity>
        )}
      />
      <AddInput
        containerStyle={containerStyle}
        handleAddTask={handleAddTask}
      />
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
});
