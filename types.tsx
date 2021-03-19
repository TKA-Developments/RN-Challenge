import { ReactChild, ReactChildren } from 'react';

export type ReactChildrenComponent = ReactChild | ReactChild[] | ReactChildren | ReactChildren[];

export type MainStackParamList = {
  BottomTabNavigator: undefined;
  CreateToDoModal: undefined;
  EditToDoScreen: { id: string };
  TodaysImageScreen: undefined;
  GameDemoScreen: undefined;
  ChangePasswordScreen: undefined;
  NotFoundScreen: undefined;
};

export type BottomTabParamList = {
  ToDosStack: undefined;
  MoreStack: undefined;
};

export type ToDosParamList = {
  ToDosScreen: undefined;
};

export type TabMoreParamList = {
  MoreScreen: undefined;
  AboutScreen: undefined;
};
export type AuthStackParamList = {
  SignInScreen: undefined,
  SignUpScreen: undefined,
};
