import { child, get, ref } from 'firebase/database';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { db } from '../configfirebase';

export default function TabOneScreen() {
  const dbref = ref(db);
  const [data, setData] = useState<any[]>([]);
  var array: any[] = [];

  function fetchData() {
    get(child(dbref, 'task/')).then((snapshot) => {
      if(snapshot.exists()){
        snapshot.forEach(childsnapshot => {
          array = [...array,childsnapshot.val().task];
          setData(array);
        })
      }
    })
  }

  useEffect(() => {
    fetchData()
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today Task</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {data.map((e)=>
        <Text style={styles.item}>{e}</Text>
      )}
    </View>
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
  item:{
    margin: 10
  }
});
