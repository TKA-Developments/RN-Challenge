export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Activity: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
  ActivityScreen: undefined;
  TodoScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type ToDoScreen = {
  activity: {
    title: string;
    description: string;
    steps: Array<string>;
  };
};

// export type ActivityList = {
//   data: {
//     activity: {
//       title:
//     }
//   };
// };

export type InputForm = {
  label: string;
  value: string;
  onChange: Function;
  editValue?: string;
};

export type StepForm = {
  editValue?: string;
  stepOnChange: Function;
  value: string;
  number: number;
};

export type ButtonType = {
  onClick: Function;
  text?: String;
  badge?: String;
  icon?: any;
  color: string;
};

export type StepContainerType = {
  onChange: Function;
  stepValue: Array<string>;
  save?: Function;
  stepEditValue: Array<string>;
};

export type CheckButtonType = {
  check: boolean;
  onPress: Function;
  title: string;
  description: string;
  steps?: Array<string>;
};

export type ActivityRouteProps = {
  data: {
    activity: {
      title: string;
      description: string;
      steps: [string];
      complete: boolean;
    };
  };
};

export type ActivityHomeList = {
  id: string;
  activity: {
    title: string;
    description: string;
    steps: [string];
    complete: boolean;
  };
};

// export type DetailActivity = {
//   id: string;
//   activity: {
//     title: string;
//     description: string;
//     steps: [string];
//   };
//   complete?: boolean;
// };
