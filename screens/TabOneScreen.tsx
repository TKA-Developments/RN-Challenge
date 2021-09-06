import * as React from 'react';
import { StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import TaskList from '../components/TaskList';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Here we go, your task is ready!
      </Text>
      <View style={styles.tasks}>
        <TaskList task='Task 1'/>
        <TaskList task='Task 2'/>
        <TaskList task='Task 3'/>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTask}
      >
        <TextInput
          style={styles.input}
          placeholder='Write a task'
        />
        <TouchableOpacity >
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
    justifyContent: 'space-between',
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
    //
  },
  addTaskIcon: {
    //
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
