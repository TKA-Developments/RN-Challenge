import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ToDoSingle, { ToDoSingleData } from './TODOSingle';
import { Theme, useTheme } from '@react-navigation/native';

const styles = (theme: Theme) => StyleSheet.create({
  titleToDoSingleStyle: {
    fontSize: 22,
    color: theme.colors.text,
  },
  containerToDoSingleStyle: {
    flexDirection: 'row',
    minHeight: 20,
    margin: 5,
    paddingVertical: 5,
    alignItems: 'center',
    borderWidth: 1,
  },
  checkBoxToDoSingleStyle: {},
  innerContainerStyle: {
    flexDirection: 'row',
  },
});

export default ({
  data,
  onChecked = () => {
  },
  onUnChecked = () => {
  }
}: {
  data: Array<ToDoSingleData>,
  onChecked?: () => void,
  onUnChecked?: () => void,
}) => {
  const theme = useTheme();
  const themedStyles = styles(theme);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <ToDoSingle
          data={item}
          onChecked={onChecked}
          onUnChecked={onUnChecked}
          checkBoxStyle={themedStyles.checkBoxToDoSingleStyle}
          titleStyle={themedStyles.titleToDoSingleStyle}
          containerStyle={themedStyles.containerToDoSingleStyle}
        />
      )}
    />
  );
}