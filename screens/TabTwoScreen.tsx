import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { NativeBaseProvider, Input, Button } from "native-base";
import { useState } from 'react';
import { db } from '../configfirebase';
import { child, push, ref, set } from 'firebase/database';

export default function TabTwoScreen() {

  const [task, setTask] = useState('');
  const [value, setValue] = useState('');
  const key = push(child(ref(db),'task')).key;

  const submit = () => {
    set(ref(db,'task/'+key),{
      task: task,
      key: key
    }).then(() => {
      alert('data submitted successfully!')
    })
  }

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Add Task</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Input variant="rounded" placeholder="Add your new task here!" value={value} onChangeText={(e)=>{setTask(e), setValue(e)}}/>
        <Button size="sm" variant="subtle" style={styles.button} onPress={()=>{submit(), setValue('')}}>
            submit
        </Button>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  button:{
    marginTop: 20,
  }
});
