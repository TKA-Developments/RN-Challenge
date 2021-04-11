export type RootStackParamList = {
  NotFound: undefined;
  TabOne: undefined;
  AddTodo: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
  AddTodoScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type Todo = {
  id: number,
  title: string,
  description: string,
  date?: Date,
  done?: boolean,
};

export type TodoLists = {
  filter: string,
  indexCount: number,
  lists: Todo[],
};