import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import FloatingActionButton from '../components/FloatingActionButton';
import { View } from '../components/Themed';
import TODOList from '../components/TODOList';
import Firebase from 'firebase';
import { ToDoSingleData } from '../components/TODOSingle';
import { StackNavigationProp } from '@react-navigation/stack';
import { DiscoverParamList } from '../types';

const styles = StyleSheet.create({
  modalContainerStyle: {
    flex: 1,
  },
});

export default ({ navigation }: { navigation: StackNavigationProp<DiscoverParamList, 'DiscoverScreen'> }) => {
  const [toDos, setToDos] = useState<Array<ToDoSingleData>>([]);

  // const onToDosChange = (toDoSnapshot: Firebase.database.DataSnapshot) => {
  //   const toDosTemp: Array<ToDoSingleData> = [...toDos];
  //   toDosTemp.push({
  //     id: toDoSnapshot.key,
  //     ...toDoSnapshot.val(),
  //   });
  //   setToDos(toDosTemp);
  // };
  // TODO: toDos are inaccessible!
  const onTodosRemoved = (toDoSnapshot: Firebase.database.DataSnapshot) => {
    const toDoSnapshotId = toDoSnapshot.key;
    setToDos(toDos.filter((val) => val.id !== toDoSnapshotId));
  };
  const onceToDos = (todosSnapshot: Firebase.database.DataSnapshot) => {
    const toDosTemp: Array<ToDoSingleData> = [];
    todosSnapshot.forEach((toDoSnapshot) => {
      toDosTemp.push({
        id: toDoSnapshot.key,
        ...toDoSnapshot.val(),
      });
    });
    setToDos(toDosTemp);
  };

  useEffect(() => {
    const user = Firebase.auth().currentUser;

    if (user !== null) {
      const userToDos = Firebase.database()
        .ref(`users/${user.uid}/todos`);
      userToDos
        .once('value', onceToDos);
      // userToDos
      //   .on('child_added', onToDosChange);
      userToDos
        .on('child_removed', onTodosRemoved);
    }
  }, []);

  return (
    <View style={styles.modalContainerStyle}>
      <TODOList
        data={toDos}
        onChecked={() => {
        }}
        onUnChecked={() => {
        }}
      />
      <FloatingActionButton onPress={() => navigation.navigate('CreateTODO')}/>
    </View>
  );
}
;
