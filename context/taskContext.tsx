import { ITasksContext, IProvider } from './type';
import React, { useState, createContext, useEffect } from 'react';
import { ITask, ITimeCategory } from '../components/TaskComponents/type';
import firebase from '../api/config';
import moment from 'moment';

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
    };
    saveAllTasks();
  }, []);

  useEffect(() => {
    const timeBasedTasks: ITimeCategory[] = [];
    const todayTask: ITimeCategory = { title: 'Today', tasks: [] };
    const weekTask: ITimeCategory = { title: 'In 7 Days Ahead', tasks: [] };
    const futureTask: ITimeCategory = { title: 'In The Future', tasks: [] };
    const pastTask: ITimeCategory = { title: 'Past', tasks: [] };

    // Date Filter
    allTasks.forEach((task) => {
      const today = moment(new Date(), 'DD/MM/YYYY');
      const week = moment(new Date(), 'DD/MM/YYYY').add(7, 'days');

      if (task.date.isSame(today, 'day')) {
        todayTask.tasks.push(task);
      } else if (task.date.isBetween(today, week)) {
        weekTask.tasks.push(task);
      } else if (task.date.isAfter(week, 'day')) {
        futureTask.tasks.push(task);
      } else {
        pastTask.tasks.push(task);
      }
    });

    timeBasedTasks.push(todayTask);
    timeBasedTasks.push(weekTask);
    timeBasedTasks.push(futureTask);
    timeBasedTasks.push(pastTask);

    setTimeBasedTasks(timeBasedTasks);
  }, [allTasks]);

  const getAllTasks = async () => {
    let allTasks: ITask[] = [];
    await tasksRef
      .orderBy('date', 'asc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          allTasks.push({
            id: doc.id,
            name: doc.data().name,
            done: doc.data().done,
            date: moment(doc.data().date.toDate(), 'DD/MM/YYYY'),
            category: doc.data().category,
          });
        });
      });

    setAllTasks(allTasks);
    setLoading(false);
  };

  const addTask = (name: string, category: string, date: moment.Moment): void => {
    tasksRef
      .add({
        category: category,
        date: date.toDate(),
        done: false,
        name: name,
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
    getAllTasks();
  };

  const value = {
    allTasks,
    timeBasedTasks,
    loading,
    setLoading,
    addTask,
  };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};
