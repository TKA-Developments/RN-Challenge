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
