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
  ActivityScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type ActivityList = {
  activity: string;
};

export type InputForm = {
  label: string;
  value: string;
  onChange: Function;
};

export type StepForm={
  stepOnChange: Function;
  value: string;
  number: number;
}

// export type onChangeType = {
//   lbl: string;
//   text: string;
// };
