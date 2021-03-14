import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import FloatingActionButton from '../components/FloatingActionButton';
import { View } from '../components/Themed';
import TODOList from '../components/TODOList';
// import Firebase from 'firebase';
import { StackNavigationProp } from '@react-navigation/stack';
import { DiscoverParamList } from '../types';
import { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import { FilterToDos, ToDoSingle, userToDos } from '../action/ToDos';

const styles = StyleSheet.create({
  modalContainerStyle: {
    flex: 1,
  },
});

export default ({ navigation }: { navigation: StackNavigationProp<DiscoverParamList, 'DiscoverScreen'> }) => {
  const [toDos, setToDos] = useState<Array<ToDoSingle>>([]);
  const [filter, setFilter] = useState(FilterToDos.All);

  const onToDosChange = (todosSnapshot: FirebaseDatabaseTypes.DataSnapshot) => {
    const toDosTemp: Array<ToDoSingle> = [];
    todosSnapshot.forEach((toDoSnapshot) => {
      toDosTemp.push({
        id: toDoSnapshot.key,
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
      <FloatingActionButton onPress={() => navigation.navigate('CreateTODO')}/>
    </View>
  );
}
;
