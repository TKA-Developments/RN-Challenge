import { ITasksContext, IProvider, IFilterOption } from './type';
import React, { useState, createContext, useEffect } from 'react';
import { ITask, ITimeCategory } from '../components/TaskComponents/type';
import firebase from '../api/config';
import moment from 'moment';

export const TasksContext = createContext<ITasksContext>({} as ITasksContext);
export const TasksProvider = ({ children }: IProvider) => {
  const [allTasks, setAllTasks] = useState<ITask[]>([]);
  const [timeBasedTasks, setTimeBasedTasks] = useState<ITimeCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [filterOption, setFilterOption] = useState<IFilterOption>({
    finished: true,
    notFinished: true,
    past: false,
    general: true,
    school: true,
    hobby: true,
    search: '',
  });

  const tasksRef = firebase.firestore().collection('tasks');

  // Get all Tasks
  useEffect(() => {
    const saveAllTasks = async () => {
      setLoading(true);
      await getAllTasks();
    };
    saveAllTasks();
  }, []);

  // Filtering
  useEffect(() => {
    const timeBasedTasks: ITimeCategory[] = [];
    const todayTask: ITimeCategory = { title: 'Today', tasks: [] };
    const weekTask: ITimeCategory = { title: 'In 7 Days Ahead', tasks: [] };
    const futureTask: ITimeCategory = { title: 'In The Future', tasks: [] };
    const pastTask: ITimeCategory = { title: 'Past', tasks: [] };

    // Option Filter
    let filteredTasks = allTasks.filter((task) => {
      if (filterOption.finished && task.done) return task;
      if (filterOption.notFinished && !task.done) return task;
    });

    // Category Filter
    filteredTasks = filteredTasks.filter((task) => {
      if (filterOption.general && task.category == 'general') return task;
      if (filterOption.hobby && task.category == 'hobby') return task;
      if (filterOption.school && task.category == 'school') return task;
    });

    // Searc Filter
    filteredTasks = filteredTasks.filter((task) => {
      if (task.name.includes(filterOption.search)) return task;
    });

    // Date Filter
    filteredTasks.forEach((task) => {
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

    if (todayTask.tasks.length) timeBasedTasks.push(todayTask);
    if (weekTask.tasks.length) timeBasedTasks.push(weekTask);
    if (futureTask.tasks.length) timeBasedTasks.push(futureTask);
    if (pastTask.tasks.length && filterOption.past) timeBasedTasks.push(pastTask);

    setTimeBasedTasks(timeBasedTasks);
  }, [allTasks, filterOption]);

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
    setLoading(true);
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

  const setFilterAttribute = (attribute: string, value: boolean | string) => {
    const newOption = { ...filterOption, [attribute]: value };
    setFilterOption(newOption);
  };

  const updateTask = async (task: ITask) => {
    await tasksRef.doc(task.id).set({
      category: task.category,
      date: task.date.toDate(),
      done: task.done,
      name: task.name,
    });
    await getAllTasks();
  };

  const deleteTask = async (id: string | undefined) => {
    setLoading(true);
    await tasksRef.doc(id).delete();
    await getAllTasks();
  };

  const value = {
    allTasks,
    timeBasedTasks,
    loading,
    setLoading,
    addTask,
    filterOption,
    setFilterAttribute,
    updateTask,
    isEditing,
    setIsEditing,
    deleteTask,
  };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};
