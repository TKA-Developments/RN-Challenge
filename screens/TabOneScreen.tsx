import { child, onValue, ref, remove, set } from 'firebase/database';
import { Alert, Button, CloseIcon, HStack, IconButton, Input, NativeBaseProvider, Stack, VStack } from 'native-base';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';

import { Text, View } from '../components/Themed';
import { db } from '../configfirebase';

export default function TabOneScreen({navigation}: {navigation:any}) {
  const dbref = ref(db);
  const [data, setData] = useState<any[]>([]);
  const [dataDone, setDataDone] = useState<any[]>([]);
  const [visibility, setVisibility] = useState(false);
  const [error, setError] = useState(false);
  const [done, setDone] = useState(true);
  
  useEffect(() => {

    fetchData()

  }, [navigation]);

  function removeData(key: any) {
    remove(child(dbref, 'task/'+key)).then(()=>{
      fetchData();
      setError(true);
      setDone(true);
      setVisibility(true);
      setTimeout(function() {
        setVisibility(false)
      }, 3000);
    })
  }

  function moveData(key: any, task: any) {
    remove(child(dbref, 'task/'+key))
    set(ref(db,'taskdone/'+key),{
      task: task,
      search: task.toLowerCase(),
      key: key
    }).then(()=>{
      fetchData();
      setError(false);
      setDone(true);
      setVisibility(true);
      setTimeout(function() {
        setVisibility(false)
      }, 3000);
    })
  }

  function removeDataDone(key: any) {
    remove(child(dbref, 'taskdone/'+key)).then(()=>{
      fetchData();
      setError(true);
      setDone(true);
      setVisibility(true);
      setTimeout(function() {
        setVisibility(false)
      }, 3000);
    })
  }

  function moveDataDone(key: any, task: any) {
    remove(child(dbref, 'taskdone/'+key))
    set(ref(db,'task/'+key),{
      task: task,
      search: task.toLowerCase(),
      key: key
    }).then(()=>{
      fetchData();
      setError(true);
      setDone(false);
      setVisibility(true);
      setTimeout(function() {
        setVisibility(false)
      }, 3000);
    })
  }

  function fetchData() {
    onValue(child(dbref, 'task/'),(snapshot) => {
      if(snapshot.exists()){
        var array: any[] = [];
        snapshot.forEach(childsnapshot => {
          array = [...array,childsnapshot.val()];
          setData(array);
        })
      }else{
        setData([]);
      }
    })

    onValue(child(dbref, 'taskdone/'),(snapshot) => {
      if(snapshot.exists()){
        var arrayDone: any[] = [];
        snapshot.forEach(childsnapshot => {
          arrayDone = [...arrayDone,childsnapshot.val()];
          setDataDone(arrayDone);
        })
      }else{
        setDataDone([]);
      }
    })
  }

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Stack space={3} w="100%" maxW="400" style={{ marginBottom: visibility?10:-70, opacity: visibility?100:0}}>
          <Alert w="100%" status={error?'error':'success'} style={{width: 300, marginLeft: 50}}>
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  {error?
                    done?
                  <Text>
                    task has been deleted!
                  </Text>:
                  <Text>
                    task is mark as undone!
                  </Text>:
                  <Text>
                    task is mark as done!
                  </Text>
                  }
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
        <Text style={styles.title}>Today Task</Text>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {data.map((e)=>
            <View key={e.key} style={styles.card}>
              <Text style={styles.item}>{e.task}</Text>
              <Button size="sm" variant="subtle" bg="blue.100" style={{width: 30, height: 30, marginRight: 10}} onPress={()=>{navigation.navigate('editScreen',{key: e.key})}}>
                <Image source={require('../assets/images/edit.png')} style={{width: 20, height: 20}}></Image>
              </Button>
              <Button size="sm" variant="subtle" colorScheme="secondary" style={{width: 30, height: 30, marginRight: 10}} onPress={()=>{removeData(e.key)}}>
                <Image source={require('../assets/images/delete.png')} style={{width: 20, height: 20}}></Image>
              </Button>
              <Button size="sm" variant="subtle" bg="green.100" style={{width: 30, height: 30, marginRight: 10}} onPress={()=>{moveData(e.key, e.task)}}>
                <Image source={require('../assets/images/check.png')} style={{width: 20, height: 20}}></Image>
              </Button>
            </View>
          )}
        </ScrollView>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom:10}}>Task Done</Text>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {dataDone.map((e)=>
            <View key={e.key} style={styles.cardDone}>
              <Text style={styles.item1}>{e.task}</Text>
              <Button size="sm" variant="subtle" bg="blue.100" style={{width: 30, height: 30, marginRight: 10}} onPress={()=>{navigation.navigate('editDoneScreen',{key: e.key})}}>
                <Image source={require('../assets/images/edit.png')} style={{width: 20, height: 20}}></Image>
              </Button>
              <Button size="sm" variant="subtle" colorScheme="secondary" style={{width: 30, height: 30, marginRight: 10}} onPress={()=>{removeDataDone(e.key)}}>
                <Image source={require('../assets/images/delete.png')} style={{width: 20, height: 20}}></Image>
              </Button>
              <Button size="sm" variant="subtle" bg="red.100" style={{width: 30, height: 30, marginRight: 10}} onPress={()=>{moveDataDone(e.key, e.task)}}>
                <Image source={require('../assets/images/cross.png')} style={{width: 20, height: 20}}></Image>
              </Button>
            </View>
          )}
        </ScrollView>
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
    marginBottom: 10
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
  },
  item:{
    margin: 15,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#7d1038',
    textAlign: 'center',
    flex: 1,
    maxWidth: 125
  },
  item1:{
    margin: 15,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#002394',
    textAlign: 'center',
    flex: 1,
    maxWidth: 125
  },
  card:{
    margin: 10,
    padding: 10,
    width: 300,
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#c22620',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {width: 2, height: 2},
    backgroundColor: '#ffcbcb',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll:{
    maxHeight: 180,
  },
  cardDone:{
    margin: 10,
    padding: 10,
    width: 300,
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#b8dcff',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {width: 2, height: 2},
    backgroundColor: '#afeeee',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
