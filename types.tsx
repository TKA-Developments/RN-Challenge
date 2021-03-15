import { ITodo } from './contexts/TodoContext';

export type RootStackParamList = {
  Root: undefined;
  Home: undefined;
  AddTodo: undefined;
  TodoDetail: ITodo;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
