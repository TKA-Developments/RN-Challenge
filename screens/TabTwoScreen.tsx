import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import Task from '../components/Task';
import { Tasks, TasksComplete } from './TabOneScreen';
import { useState } from 'react';


export default function TabTwoScreen() {
  const [show, setShow] = useState<number>();

const completeHandler = () => {
  setShow(0);
}

const incompleteHandler = () => {
  setShow(1);
}

const allHandler = () => {
  setShow(2);
}

function Options(){
  return (
    <View style={styles.optionContainer}>
      <TouchableOpacity onPress={() => completeHandler()} style={styles.option}>
          <Text style={styles.optionText}>COMPLETE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => incompleteHandler()} style={styles.option}>
          <Text style={styles.optionText}>INCOMPLETE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => allHandler()} style={styles.option}>
          <Text style={styles.optionText}>ALL</Text>
      </TouchableOpacity>
    </View>
  );
}

function AllTasks(){
  if (show == 0){
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>COMPLETE</Text>
          {
          Options()
          }
        </View>
        {
          TasksComplete.map((task: String, index: any) => {
            return(
              <View key={index} style={styles.taskContainer}>
                <View style={styles.checkboxComplete}></View>
                <Task name={task}></Task>
              </View>
            )
          })
        }
      </View>
    );
  }
  else if (show == 1){
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>INCOMPLETE</Text>
          {
          Options()
          }
        </View>
        {
          Tasks.map((task: String, index: any) => {
            return(
              <View key={index} style={styles.taskContainer}>
                <View style={styles.checkboxIncomplete}></View>
                <Task name={task}></Task>
              </View>
            )
          })
        }
      </View>
    );
  }
  else if (show == 2){
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>ALL TASKS</Text>
          {
          Options()
        }
        </View>
        {
          Tasks.map((task: String, index: any) => {
            return(
              <View key={index} style={styles.taskContainer}>
                <View style={styles.checkboxIncomplete}></View>
                <Task name={task}></Task>
              </View>
            )
          })
        }
        {
          TasksComplete.map((task: String, index: any) => {
            return(
              <View key={index} style={styles.taskContainer}>
                <View style={styles.checkboxComplete}></View>
                <Task name={task}></Task>
              </View>
            )
          })
        }
      </View>
    );
  }
  else{
    setShow(2)
  }
}

  return (
    <View style={styles.container}>
      {
        AllTasks()
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#84a9ac',
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
    height: 65,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20
  },
  title: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold'
  },
  checkboxIncomplete: {
    width: '15%',
    height: 54,
    borderRadius: 7,
    margin: 5,
    borderColor: '#204051',
    borderWidth: 2,
    backgroundColor: '#fff',
    opacity:1
  },
  checkboxComplete: {
    width: '15%',
    height: 54,
    borderRadius: 7,
    margin: 5,
    borderColor: '#204051',
    borderWidth: 2,
    backgroundColor: '#204051',
    opacity:1
  },
  taskContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10
  },
  optionContainer: {
    flexDirection: 'row',
    backgroundColor: '#84a9ac'
  },
  option: {
    padding: 7,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#204051',
    borderColor: '#000',
    borderWidth: 1,
    margin: 5
  },
  optionText: {
    color: '#fff',
    fontSize: 9
  }
});
