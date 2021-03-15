import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import FloatingActionButton from '../components/FloatingActionButton';
import { View } from '../components/Themed';
import TODOList from '../components/TODOList';
import { DiscoverParamList, RootStackParamList } from '../types';
import { FilterToDos, ToDoSingleWithKey, userToDos } from '../action/ToDos';
import FloatingActionButtonGroup from '../components/FloatingActionButtonGroup';

const styles = StyleSheet.create({
  modalContainerStyle: {
    flex: 1,
  },
});

export default ({ navigation }: {
  navigation: StackNavigationProp<DiscoverParamList & RootStackParamList, 'DiscoverScreen'>
}) => {
  const [toDos, setToDos] = useState<Array<ToDoSingleWithKey>>([]);
  const [filter, setFilter] = useState(FilterToDos.All);

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
    const userToDosRef = userToDos(filter);
    const onToDosChangeListener = userToDosRef
      .on('value', onToDosChange);

    return () => {
      userToDosRef.off('value', onToDosChangeListener);
    };
  }, [filter]);

  return (
    <View style={styles.modalContainerStyle}>
      <TODOList
        data={toDos}
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
