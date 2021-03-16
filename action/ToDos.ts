import Database, { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import { currentUser } from './Auth';

export type ToDoSingle = {
  title: string,
  description: string,
  isCompleted: boolean,
  isPublished: boolean,
  createdAt: FirebaseDatabaseTypes.ServerValue,
  updatedAt: FirebaseDatabaseTypes.ServerValue,
};

export type ToDoSingleWithKey = ToDoSingle & { key: string };

export enum FilterToDos {
  NotCompleted,
  All,
  Completed
}

export const nextFilter = (filter: FilterToDos): FilterToDos => {
  switch (filter) {
    case FilterToDos.NotCompleted:
      return FilterToDos.All;
    case FilterToDos.All:
      return FilterToDos.Completed;
    case FilterToDos.Completed:
      return FilterToDos.NotCompleted;
    default:
      return FilterToDos.NotCompleted;
  }
};

export const filterToString = (filter: FilterToDos) => {
  switch (filter) {
    case FilterToDos.NotCompleted:
      return 'Not Completed';
    case FilterToDos.All:
      return 'All';
    case FilterToDos.Completed:
      return 'Completed';
    default:
      return '';
  }
};

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
export const searchToDoResult = (
  toDos: Array<ToDoSingleWithKey>,
  keyword?: string,
) => toDos
  .filter((toDo) => {
    return keyword === undefined ?
      true :
      toDo.description.search(keyword) !== -1 || toDo.title.search(keyword) !== -1;
  });

export const addToDo = (title: string, description: string) => Database()
  .ref(`users/${currentUser()?.uid}/todos`)
  .push(<ToDoSingle>{
    title,
    description,
    isCompleted: false,
    isPublished: false,
    createdAt: Database.ServerValue.TIMESTAMP,
    updatedAt: Database.ServerValue.TIMESTAMP,
  });

export const getToDo = (key: string) => Database()
  .ref(`users/${currentUser()?.uid}/todos/${key}`)
  .once('value');

export const markToDoAs = (isCompleted: boolean, key: string) => Database()
  .ref(`users/${currentUser()?.uid}/todos/${key}`)
  .update(<ToDoSingle>{
    isCompleted,
    updatedAt: Database.ServerValue.TIMESTAMP,
  });

export const deleteToDo = (key: string) => Database()
  .ref(`users/${currentUser()?.uid}/todos/${key}`)
  .set(null);

export const editToDo = (key: string, title: string, description: string) => Database()
  .ref(`users/${currentUser()?.uid}/todos/${key}`)
  .update(<ToDoSingle>{
    title,
    description,
    updatedAt: Database.ServerValue.TIMESTAMP,
  });
