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

export type TodoListItemParamList = {
  title: string;
  id: string;
  onPressDelete: (id: string) => void;
  editItem: (id: string, text: string) => void;
  onPressToggleCompletion: (id: string) => void;
  completed: boolean;
  toggleDelete: boolean;
  toggleEdit: boolean;
};

export type TodoItems = {
  _id: string;
  title: string;
  completed: boolean;
};

export type TodoListParamList = {
  todoItems: TodoItems[];
  toggleItemCompletion: (id: string) => void;
  deleteItem: (id: string) => void;
  editItem: (id: string, text: string) => void;
  toggleDelete: boolean;
  toggleEdit: boolean;
};

export type AddTodoItemParamList = {
  addItem: (title: string) => void;
};
