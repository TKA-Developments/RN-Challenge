import * as React from 'react';
import { FlatList } from 'react-native';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
  const [completedTask] = React.useState([
    {text: 'Task 4', key: '4'},
    {text: 'Task 5', key: '5'},
    {text: 'Task 6', key: '6'}
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList 
        data={completedTask}
        renderItem={({item}) => (
          <View style={styles.task}> 
            <Text>{item.text}</Text>
          </View>
         
        )}
        />
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 30,
  },
  task: {
    padding: 16,
    marginTop: 16,
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10
  },
  button: {
    marginTop: 20
  }
});
