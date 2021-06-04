export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Auth: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TabTest: undefined;
  TabTask: undefined;
  TabAuth: undefined;
};

export type TabTaskParamList = {
  TabTaskScreen: undefined;
  TabTask: undefined;
}
export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type MainTabParamList = {
  TabTwoScreen: undefined;
};


export type TabLoginParamList = {
  TabLoginScreen: undefined;
}

export type TabRegisterParamList = {
  TabLoginScreen: undefined;
}

export type TabAuthParamList = {
  TabRegisterScreen: undefined;
  TabLoginScreen: undefined;
  TabRegister: undefined;
  TabLogin: undefined;
};

export type Props = {
  onPress(): void
}