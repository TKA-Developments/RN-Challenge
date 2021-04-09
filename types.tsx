export type RootStackParamList = {
  Root: undefined;
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

export type Todo = {
  id: number,
  title: string,
  description: string,
  date: Date,
  done?: boolean,
};

export type TodoLists = {
  filter: string,
  lists: Todo[]
};

export type AddTodoAction = {
  type: string,
  todoData: Todo,
}

export type UpdateTodoAction = {
  type: string,
  todoData: Todo,
}

export type RemoveTodoAction = {
  type: string,
  id: number,
}

// export type TodoListActions = 
//  | AddTodoAction 
//  | UpdateTodoAction 
//  | RemoveTodoAction
