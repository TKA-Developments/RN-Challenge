import React from 'react';
import { FlatList, FlatListProps, StyleSheet } from 'react-native';
import ToDoSingle from './ToDoSingle';
import { markToDoAs, ToDoSingleWithKey } from '../action/ToDos';
import { useNavigation } from '@react-navigation/native';
import { ThemedColors, useThemeColors } from './Themed';

const styles = (colors: ThemedColors) => StyleSheet.create({
  titleToDoSingleStyle: {
    fontSize: 22,
    color: colors.text,
  },
  containerToDoSingleStyle: {
    flexDirection: 'row',
    // minHeight: 20,
    margin: 5,
    paddingVertical: 5,
    alignItems: 'center',
    // borderBottomWidth: 1,
  },
  checkBoxToDoSingleStyle: {},
  innerContainerStyle: {
    marginLeft: 10,
  },
});

export default ({
  data,
  style,
  contentContainerStyle,
}: {
  data: Array<ToDoSingleWithKey>,
  style?: FlatListProps<ToDoSingleWithKey>['style'],
  contentContainerStyle?: FlatListProps<ToDoSingleWithKey>['contentContainerStyle'],
}) => {
  const colors = useThemeColors();
  const themedColors = styles(colors);
  const navigation = useNavigation();

  const onPressToDoSingle = ({ key }: { key: string }) => {
    navigation.navigate('EditToDoScreen', {
      key,
    });
  };

  return (
    <FlatList
      contentContainerStyle={contentContainerStyle}
      data={data}
      style={style}
      renderItem={({ item }) => (
        <ToDoSingle
          onCheck={markToDoAs}
          onPress={onPressToDoSingle}
          data={item}
          checkBoxStyle={themedColors.checkBoxToDoSingleStyle}
          titleStyle={themedColors.titleToDoSingleStyle}
          containerStyle={themedColors.containerToDoSingleStyle}
          innerContainerStyle={themedColors.innerContainerStyle}
        />
      )}
    />
  );
};
