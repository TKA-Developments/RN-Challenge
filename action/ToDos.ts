import Database from '@react-native-firebase/database';
import { currentUser } from './Auth';

export type ToDoSingle = {
  title: string,
  description: string,
  isCompleted: boolean,
};

export type ToDoSingleWithKey = ToDoSingle & { key: string };

export enum FilterToDos {
  All,
  Completed,
  NotCompleted,
}

// Get a reference to current user ToDos
export const userToDos = (filterBy: FilterToDos = FilterToDos.All) => {
  const ref = Database()
    .ref(`users/${currentUser()?.uid}/todos`);
  if (filterBy !== FilterToDos.All) {
    return ref
      .orderByChild('isCompleted')
      .equalTo(filterBy === FilterToDos.Completed);
  }
  return ref;
};

// Filter should be done by the backend, but Firebase does not support such features
export const filterResult = (toDos: Array<ToDoSingle>, searchKeyword: string) => toDos
  .filter((toDo) => {
    return toDo.title.indexOf(searchKeyword) || toDo.description.indexOf(searchKeyword);
  });

export const addToDo = (title: string, description: string) => Database()
  .ref(`users/${currentUser()?.uid}/todos`)
  .push(<ToDoSingle>{
    title,
    description,
    isCompleted: false,
  });

export const getToDo = (key: string) => Database()
  .ref(`users/${currentUser()?.uid}/todos/${key}`)
  .once('value');

export const markToDoAs = (isCompleted: boolean, key: string) => Database()
  .ref(`users/${currentUser()?.uid}/todos/${key}/isCompleted`)
  .set(isCompleted);

export const deleteToDo = (key: string) => Database()
  .ref(`users/${currentUser()?.uid}/todos/${key}`)
  .set(null);
