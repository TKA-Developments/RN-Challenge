import React, { ReactNode } from 'react';
import { ITimeCategory, ITask } from './../components/TaskComponents/type';

export interface ITasksContext {
  allTasks: ITask[];
  timeBasedTasks: ITimeCategory[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IProvider {
  children: ReactNode;
}