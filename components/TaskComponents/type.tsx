export interface ITask {
  id: string;
  name: string;
  done: boolean;
  date: string;
  category: string;
}

export interface ITimeCategory {
  title: string;
  tasks: ITask[];
}
