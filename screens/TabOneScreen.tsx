import * as React from 'react';
import { StyleSheet, VirtualizedList } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import SearchBar from '../components/one/SearchBar';
import { Text, View } from '../components/Themed';
import TodoLists from '../components/one/TodoLists';

export default function TabOneScreen() {
  let data: string[] = [];
  for(var i = 0; i<100; i++)
    data.push('auo'+i)
  return (
    <View style={styles.container}>
      <SearchBar/>
      <TodoLists lists={data}/>
      {/*<EditScreenInfo path="/screens/TabOneScreen.tsx" />*/}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',    
    justifyContent: 'flex-start',
    paddingTop: 15,
    paddingHorizontal:10,
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
})
