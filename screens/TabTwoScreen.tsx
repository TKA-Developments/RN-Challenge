import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { Alert, NativeBaseProvider, Input, Button, Stack, VStack, HStack, IconButton, CloseIcon } from "native-base";
import { useState } from 'react';
import { db } from '../configfirebase';
import { child, push, ref, set } from 'firebase/database';

export default function TabTwoScreen() {

  const [task, setTask] = useState('');
  const [value, setValue] = useState('');
  const [visibility, setVisibility] = useState(false);
  const key = push(child(ref(db),'task')).key;

  const submit = () => {
    set(ref(db,'task/'+key),{
      task: task,
      key: key
    }).then(() => {
      setVisibility(true)
      setTimeout(function() {
        setVisibility(false)
      }, 3000);
    })
  }

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Stack space={3} w="100%" maxW="400" style={{marginBottom: visibility?100:0, opacity: visibility?100:0}}>
          <Alert w="100%" status="success" style={{width: 300, marginLeft: 50}}>
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  <Text>
                    data submitted successfully!
                  </Text>
                </HStack>
                <IconButton variant="unstyled" _focus={{
                  borderWidth: 0
                }} icon={<CloseIcon size="3" />} _icon={{
                  color: "coolGray.600"
                }} onPress={()=>{setVisibility(false)}}/>
              </HStack>
            </VStack>
          </Alert>
        </Stack>
        <Text style={styles.title}>Add Task</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Input variant="rounded" style={styles.input} placeholder="Add your new task here!" value={value} onChangeText={(e)=>{setTask(e), setValue(e)}}/>
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
  },
  input:{
    textAlign: 'center',
    maxWidth: 300
  }
});
