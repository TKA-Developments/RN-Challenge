import moment from 'moment';

export interface ITask {
  id: string;
  name: string;
  done: boolean;
  date: moment.Moment;
  category: string;
}

export interface ITimeCategory {
  title: string;
  tasks: ITask[];
}
