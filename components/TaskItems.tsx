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
  const [data, setData] = useState([]);

  const handleAddTask = (value) => {
    setData((prevTask) => {
      return [
        {
          value: value,
          key: Math.random().toString(),
        },
        ...prevTask,
      ];
    });
  };

  const handleDeleteTask = (key) => {
    setData((prevTask) => {
      return prevTask.filter((task) => task.key != key);
    });
  };

  return (
    <View style={containerStyle}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TaskList
            item={item}
            handleDeleteTask={handleDeleteTask}
          />
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
