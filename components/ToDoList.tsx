import React from 'react';
import { FlatList, FlatListProps, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ToDoSingle from './ToDoSingle';
import { markToDoAsCompleted, ToDoSingleWithID } from '../action/ToDos';
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
  innerContainerStyle: {
    marginLeft: 10,
  },
});

export default ({
  data,
  style,
  contentContainerStyle,
}: {
  data: Array<ToDoSingleWithID>,
  style?: FlatListProps<ToDoSingleWithID>['style'],
  contentContainerStyle?: FlatListProps<ToDoSingleWithID>['contentContainerStyle'],
}) => {
  const colors = useThemeColors();
  const themedColors = styles(colors);
  const navigation = useNavigation();

  const onPressToDoSingle = ({ id }: { id: string }) => {
    navigation.navigate('EditToDoScreen', {
      id,
    });
  };

  return (
    <FlatList
      contentContainerStyle={contentContainerStyle}
      data={data}
      style={style}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <ToDoSingle
          onCheck={markToDoAsCompleted}
          onPress={onPressToDoSingle}
          data={item}
          titleStyle={themedColors.titleToDoSingleStyle}
          containerStyle={themedColors.containerToDoSingleStyle}
          innerContainerStyle={themedColors.innerContainerStyle}
        />
      )}
    />
  );
};
