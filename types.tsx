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
  theme?: TodoThemeNames,
};

export type TodoThemeNames = 'default' | 'cyan' | 'teal' | 'lightgreen' | 'lime' | 'amber' | 'deeppurple' | 'yellow' | 'blue'

export enum TodoColors {


  BlueCardColor = '#3D5AFE',
  BlueCBColor = '#8C9EFF',
  BlueTextColor = 'white',

  DefaultCardColor = '#FAFAFA',
  DefaultCBColor = '#424242',
  DefaultTextColor = '#212121',

  CyanCardColor = '#00E5FF',
  CyanCBColor = '#84FFFF',
  CyanTextColor = 'black',

  TealCardColor = '#1DE9B6',
  TealCBColor = '#00BFA5',
  TealTextColor = 'black',

  LightGreenCardColor = '#F50057',
  LightGreenCBColor = '#FF80AB',
  LightGreenTextColor = 'white',

  LimeCardColor = '#C6FF00',
  LimeCBColor = '#F4FF81',
  LimeTextColor = 'black',

  AmberCardColor = '#FF3D00',
  AmberCBColor = '#FF9E80',
  AmberTextColor = 'white',

  DeepPurpleCardColor = '#6200EA',
  DeepPurpleCBColor = '#B388FF',
  DeepPurpleTextColor = 'white',

  YellowCardColor = '#FFEA00',
  YellowCBColor = '#FFFF8D',
  YellowTextColor = 'black',
}

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