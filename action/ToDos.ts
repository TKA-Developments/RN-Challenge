import Database from '@react-native-firebase/database';
import { currentUser } from './Auth';

export type ToDoSingle = {
  id: string,
  title: string,
  description: string,
  isCompleted: boolean,
};

export enum FilterToDos {
  All,
  Completed,
  NotCompleted,
}

export const userToDos = (filterBy: FilterToDos = FilterToDos.All) => {
  const ref = Database()
    .ref(`users/${currentUser()?.uid}/todos`);
  if (filterBy !== FilterToDos.All) {
    return ref
      .orderByChild('isCompleted')
      .equalTo(filterBy === FilterToDos.Completed)
      .equalTo(true);
  }
  return ref;
};

export const addToDo = (title: string, description: string) => Database()
  .ref(`users/${currentUser()?.uid}/todos`)
  .push(<ToDoSingle>{
    title,
    description,
    isCompleted: false,
  });

export const markToDoAs = (isCompleted: boolean, key: string) => Database()
  .ref(`users/${currentUser()?.uid}/todos/${key}`)
  .set(<ToDoSingle>{
    isCompleted: false,
  });

export const deleteToDo = (key: string) => Database()
  .ref(`users/${currentUser()?.uid}/todos/${key}`)
  .set(null);
