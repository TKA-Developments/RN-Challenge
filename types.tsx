export type RootStackParamList = {
  Root: undefined,
  NotFound: undefined,
};

export type BottomTabParamList = {
  All: undefined,
  TabTwo: undefined,
  TabThree: undefined,
};

export type AllParamList = {
  AllScreen: undefined,
};

export type TabTwoParamList = {
  TabTwoScreen: undefined,
};

export interface ITodo {
  done: boolean;
  description: string;
  date: Date;
}
