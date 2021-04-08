import { ITasksContext, IProvider } from './type';
import React, { useState, createContext, useEffect } from 'react';
import { ITask, ITimeCategory } from '../components/TaskComponents/type';
import firebase from '../api/config';

export const TasksContext = createContext<ITasksContext>({} as ITasksContext);
export const TasksProvider = ({ children }: IProvider) => {
  const [allTasks, setAllTasks] = useState<ITask[]>([]);
  const [timeBasedTasks, setTimeBasedTasks] = useState<ITimeCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const tasksRef = firebase.firestore().collection('tasks');

  useEffect(() => {
    const saveAllTasks = async () => {
      setLoading(true);
      await getAllTasks();
      setLoading(false);
    };
    saveAllTasks();
  }, []);

  const getAllTasks = async () => {
    let allTasks: ITask[] = [];
    await tasksRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        allTasks.push({
          id: doc.id,
          name: doc.data().name,
          done: doc.data().done,
          date: doc.data().date,
          category: doc.data().category,
        });
      });
    });
    setAllTasks(allTasks);
  };

  useEffect(() => {
    setTimeBasedTasks([
      {
        title: 'Todayy',
        tasks: allTasks,
      },
    ]);
  }, [allTasks]);

  const value = {
    allTasks,
    timeBasedTasks,
    loading,
    setLoading,
  };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};
