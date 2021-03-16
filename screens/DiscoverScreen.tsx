import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import FloatingActionButton from '../components/FloatingActionButton';
import { View } from '../components/Themed';
import ToDoList from '../components/ToDoList';
import { DiscoverParamList, RootStackParamList } from '../types';
import { FilterToDos, ToDoSingleWithKey, userToDos } from '../action/ToDos';
import FloatingActionButtonGroup from '../components/FloatingActionButtonGroup';
import FloatingFilterButton from '../components/FloatingFilterButton';
import SearchTextInput from '../components/SearchTextInput';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  // Workaround for the buttons below?
  toDoListContentContainerStyle: {
    paddingBottom: 50,
  },
});

export default ({ navigation }: {
  navigation: StackNavigationProp<DiscoverParamList & RootStackParamList, 'DiscoverScreen'>
}) => {
  const [toDos, setToDos] = useState<Array<ToDoSingleWithKey>>([]);
  const [filterBy, setFilterBy] = useState(FilterToDos.NotCompleted);

  const onToDosChange = (todosSnapshot: FirebaseDatabaseTypes.DataSnapshot) => {
    const toDosTemp: typeof toDos = [];
    todosSnapshot.forEach((toDoSnapshot) => {
      toDosTemp.push({
        key: toDoSnapshot.key,
        ...toDoSnapshot.val(),
      });
      return undefined;
    });
    setToDos(toDosTemp);
  };

  useEffect(() => {
    const userToDosRef = userToDos(filterBy);
    const onToDosChangeListener = userToDosRef
      .on('value', onToDosChange);

    return () => {
      userToDosRef.off('value', onToDosChangeListener);
    };
  }, [filterBy]);

  return (
    <View style={styles.containerStyle}>
      <SearchTextInput/>
      <ToDoList
        data={toDos}
        contentContainerStyle={styles.toDoListContentContainerStyle}
      />
      <FloatingFilterButton
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />
      <FloatingActionButtonGroup>
        <FloatingActionButton
          onPress={() => navigation.navigate('TodaysImageModal')}
          iconName="image"
        />
        <FloatingActionButton
          onPress={() => navigation.navigate('CreateToDoModal')}
          iconName="add"
        />
      </FloatingActionButtonGroup>
    </View>
  );
};
