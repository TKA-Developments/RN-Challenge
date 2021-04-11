import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import SearchBar from '../components/one/SearchBar';
import { Text, View, AddToListButton } from '../components/Themed';
import { useNavigation } from '@react-navigation/native'

import TodoLists from '../components/one/TodoLists';
import { TodoContext, TodoProvider } from '../context/todoContexts';
import { TodoActions } from '../context/todoReducer';
import { Props } from '../navigation';

export default function TabOneScreen() {
    return (      
        <View style={styles.container}>
          <TodoLists />
        </View>      
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',    
    justifyContent: 'flex-start',
    paddingHorizontal:10,
  },
  scrollContentStyle:{
    paddingVertical:15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
