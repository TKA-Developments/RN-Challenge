import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ToDoSingle from './TODOSingle';
import { markToDoAs, ToDoSingleWithKey } from '../action/ToDos';
import { Theme, useNavigation, useTheme } from '@react-navigation/native';

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
}: {
  data: Array<ToDoSingleWithKey>,
}) => {
  const theme = useTheme();
  const themedStyles = styles(theme);
  const navigation = useNavigation();

  const onPressToDoSingle = ({ key }: { key: string }) => {
    navigation.navigate('EditToDoScreen', {
      key,
    });
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <ToDoSingle
          onCheck={markToDoAs}
          onPress={onPressToDoSingle}
          data={item}
          checkBoxStyle={themedStyles.checkBoxToDoSingleStyle}
          titleStyle={themedStyles.titleToDoSingleStyle}
          containerStyle={themedStyles.containerToDoSingleStyle}
        />
      )}
    />
  );
};
