import { TasksContext } from './../context/taskContext';
import { useContext } from 'react';

const useTasksContext = () => {
  return useContext(TasksContext);
};

export default useTasksContext;

