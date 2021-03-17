import { ReactChild, ReactChildren } from 'react';

export type ReactChildrenComponent = ReactChild | ReactChild[] | ReactChildren | ReactChildren[];

export type RootStackParamList = {
  Root: undefined;
  CreateToDoModal: undefined;
  EditToDoScreen: { key: string };
  TodaysImageScreen: undefined;
  NotFoundScreen: undefined;
};

export type BottomTabParamList = {
  ToDos: undefined;
  More: undefined;
};

export type ToDosParamList = {
  ToDosScreen: undefined;
};

export type TabMoreParamList = {
  TabMoreScreen: undefined;
  AboutScreen: undefined;
};
