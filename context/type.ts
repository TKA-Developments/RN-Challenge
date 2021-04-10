import moment from 'moment';
import React, { ReactNode } from 'react';
import { ITimeCategory, ITask } from './../components/TaskComponents/type';

export interface ITasksContext {
  allTasks: ITask[];
  timeBasedTasks: ITimeCategory[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  addTask: (name: string, category: string, date: moment.Moment) => void;
  filterOption: IFilterOption,
  setFilterAttribute: (attribute: string, value: boolean | string) => void;
}

export interface IProvider {
  children: ReactNode;
}

export interface IFilterOption {
  finished: boolean,
  notFinished: boolean,
  past: boolean,
  general: boolean,
  school: boolean,
  hobby: boolean,
  search: string,
}