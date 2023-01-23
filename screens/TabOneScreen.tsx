import { child, get, ref, remove, set } from 'firebase/database';
import { Button, NativeBaseProvider } from 'native-base';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';

import { Text, View } from '../components/Themed';
import { db } from '../configfirebase';

export default function TabOneScreen() {
  const dbref = ref(db);
  const [data, setData] = useState<any[]>([]);
  var array: any[] = [];
  const [dataDone, setDataDone] = useState<any[]>([]);
  var arrayDone: any[] = [];

  function removeData(key: any) {
    remove(child(dbref, 'task/'+key)).then(()=>{
      fetchData()
      fetchDataDone()
      alert('data removed successfully!')
    })
  }

  function moveData(key: any, task: any) {
    remove(child(dbref, 'task/'+key)).then(()=>{
      alert('data moved successfully!');
    })
    set(ref(db,'taskdone/'+key),{
      task: task,
      key: key
    }).then(()=>{
      fetchData()
      fetchDataDone()
    })
  }

  function removeDataDone(key: any) {
    remove(child(dbref, 'taskdone/'+key)).then(()=>{
      fetchData()
      fetchDataDone()
      alert('data removed successfully!')
    })
  }

  function moveDataDone(key: any, task: any) {
    remove(child(dbref, 'taskdone/'+key)).then(()=>{
      alert('data moved successfully!');
    })
    set(ref(db,'task/'+key),{
      task: task,
      key: key
    }).then(()=>{
      fetchData()
      fetchDataDone()
    })
  }

  function fetchData() {
    get(child(dbref, 'task/')).then((snapshot) => {
      if(snapshot.exists()){
        snapshot.forEach(childsnapshot => {
          array = [...array,childsnapshot.val()];
          setData(array);
        })
      }
    })
  }

  function fetchDataDone() {
    get(child(dbref, 'taskdone/')).then((snapshot) => {
      if(snapshot.exists()){
        snapshot.forEach(childsnapshot => {
          arrayDone = [...arrayDone,childsnapshot.val()];
          setDataDone(arrayDone);
        })
      }
    })
  }

  useEffect(() => {
    fetchData();
    fetchDataDone();
  }, []);
  
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Today Task</Text>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {data.map((e)=>
            <View key={e.key} style={styles.card}>
              <Text style={styles.item}>{e.task}</Text>
              <Button size="sm" variant="subtle" bg="blue.100" style={{width: 30, height: 30, marginRight: 10}}>
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
              <Button size="sm" variant="subtle" bg="blue.100" style={{width: 30, height: 30, marginRight: 10}}>
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
  item:{
    margin: 15,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#7d1038',
    textAlign: 'center',
  },
  item1:{
    margin: 15,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#002394',
    textAlign: 'center',
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
