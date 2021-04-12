export type RootStackParamList = {
  NotFound: undefined;
  TabOne: undefined;
  TodoDetail: undefined;
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
  toggle?: number, /* 1: all, 2: done, 3: undone */
  grid: boolean,
};

export type ToggleButtonValue = {
  All: boolean,
  Done: boolean,
  Undone: boolean,
}