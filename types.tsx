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

export type todoProps = {
  todos: ITodo[];
  setTodos: React.Dispatch<
    React.SetStateAction<
      {
        done: boolean;
        description: string;
        date: string;
      }[]
    >
  >;
  toggleEditModal: (index: number) => void;
  screen: "all" | "completed" | "incompleted";
  setDone: (index: number) => void;
  removeTodo: (index: number) => void;
};
