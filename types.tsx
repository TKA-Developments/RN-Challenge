export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  All: undefined;
  Completed: undefined;
  Active: undefined;
};

export type AllParamList = {
  AllScreen: undefined;
};

export type CompletedParamList = {
  CompletedScreen: undefined;
};

export type IncompletedParamList = {
  IncompletedScreen: undefined;
};

export interface ITodo {
  done: boolean;
  description: string;
  date: string;
}

export interface ITodoContext {
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  addTodo: (inp: string) => Promise<void>;
  editTodo: (inp: string, index: number) => Promise<void>;
  clearTodos: () => Promise<void>;
}
