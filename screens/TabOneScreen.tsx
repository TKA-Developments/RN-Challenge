import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import Task from '../components/Task';
import { useState } from 'react';

export let Tasks: Array<any>;
export let TasksComplete: Array<any>;

export default function TabOneScreen() {
  const [newInput, setNewInput] = useState<boolean>();
  const [editTask, setEditTask] = useState<boolean>();
  const [task, setTask] = useState<any>();
  const [taskList, setTaskList] = useState<any>([]);
  const [completeTaskList, setCompleteTaskList] = useState<any>([]);
  const [taskIndex, setTaskIndex] = useState<any>();

  const addTaskHandler=() =>{
    setNewInput(true);
  }

  const addTaskEnter=() => {
    setNewInput(false);
    setTaskList([...taskList, task]);
    setTask(null);
  }

  Tasks = taskList;
  TasksComplete = completeTaskList;

  const completeTaskHandler=(index: any) =>{
    let taskCopy = [...taskList];
    taskCopy.splice(index, 1);
    var complete = taskList[index];
    setTaskList(taskCopy);
    setCompleteTaskList([...completeTaskList, complete]);
    TasksComplete = completeTaskList;
  }

  const editTaskHandler=(index: any) =>{
    setEditTask(true);
    setTaskIndex(index);
  }

  const editTaskEnter=() =>{
    setEditTask(false);
    let taskCopy = [...taskList];
    taskCopy[taskIndex] = task;
    setTaskList(taskCopy);
    setTask(null);

  }

  const deleteTaskHandler=(index: any) =>{
    let taskCopy = [...taskList];
    taskCopy.splice(index, 1);
    setTaskList(taskCopy);
  }

 function InputTask(){
    if (newInput == true) {
      return (
        <View style={styles.newTask}>
          <TextInput style={styles.newTaskName} placeholder="Insert Task" onChangeText={text => setTask(text)} ></TextInput>
          <TouchableOpacity onPress={() => addTaskEnter()} style={styles.enterTask}>
            <Text style={styles.enterText}>ENTER</Text>
          </TouchableOpacity>
        </View>
      );
    }
    else {
    }
  }

  function EditTask(){
    if (editTask == true) {
      return (
        <View style={styles.newTask}>
          <TextInput style={styles.newTaskName} placeholder="Insert New Task Name" onChangeText={text => setTask(text)} ></TextInput>
          <TouchableOpacity onPress={() => editTaskEnter()} style={styles.enterTask}>
            <Text style={styles.enterText}>EDIT</Text>
          </TouchableOpacity>
        </View>
      );
    }
    else {
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TASKS</Text>
        <TouchableOpacity onPress={() => addTaskHandler()} style={styles.button}>
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
      </View>
      <View>
        {
         InputTask() 
        }
        {
          EditTask() 
        }
      </View>
      { 
        taskList.map((task: String, index: any) => {
          return(
            <View key={index} style={styles.taskContainer}>
              <TouchableOpacity onPress={() => completeTaskHandler(index)} style={styles.checkboxIncomplete}></TouchableOpacity>
              <Task name={task}></Task>
              <View>
                <TouchableOpacity onPress={() => editTaskHandler(index)} style={styles.buttonEdit}>
                  <Text style={styles.buttonText}>EDIT</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTaskHandler(index)} style={styles.buttonEdit}>
                  <Text style={styles.buttonText}>DELETE</Text>
               </TouchableOpacity>
              </View>
            </View>
          )
        })
      }
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#84a9ac',
    paddingHorizontal: 20,
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
  button: {
    padding: 7,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#204051',
    borderColor: '#000',
    borderWidth: 1
  },
  buttonEdit: {
    padding: 7,
    height: 25,
    marginHorizontal: 5,
    marginVertical: 2,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#204051',
    borderColor: '#000',
    borderWidth: 1
  },
  buttonText: {
    color: '#fff',
    fontSize: 10
  },
  checkboxIncomplete: {
    width: '5%',
    height: 54,
    borderRadius: 7,
    margin: 5,
    borderColor: '#204051',
    borderWidth: 2,
    backgroundColor: '#fff',
    opacity:1
  },
  checkboxComplete: {
    width: '5%',
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
  newTask: {
    width: 300,
    paddingHorizontal: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  newTaskName: {
    height: 35,
    width: 200,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#84a9ac',
    borderRadius: 20,
    alignItems: 'center',
    color: '#84a9ac'
  },
  enterTask: {
    height: 35,
    paddingHorizontal: 10,
    backgroundColor: '#84a9ac',
    borderRadius: 20,
    justifyContent: 'center'
  },
  enterText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold'
  }
});
