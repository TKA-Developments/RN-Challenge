import React from 'react';
import RoundedCheckbox, { IRoundedCheckboxProps } from '../components/RoundedCheckBox';
import { ToDoSingleWithKey } from '../action/ToDos';
import { Text, View } from './Themed';
import { TouchableOpacity } from 'react-native';

export default ({
  data,
  onCheck,
  onPress,
  titleStyle,
  checkBoxStyle,
  containerStyle,
  innerContainerStyle
}: {
  data: ToDoSingleWithKey,
  onCheck: (isChecked: boolean, key: string) => void,
  onPress: (data: ToDoSingleWithKey) => void,
  titleStyle?: any,
  checkBoxStyle?: IRoundedCheckboxProps,
  containerStyle?: any,
  innerContainerStyle?: any,
}) => {
  return (
    <TouchableOpacity style={containerStyle} onPress={() => onPress(data)}>
      <RoundedCheckbox
        onPress={(isChecked) => onCheck(isChecked, data.key)}
        style={checkBoxStyle}
        isChecked={data.isCompleted}
      />
      <View style={innerContainerStyle}>
        <Text style={titleStyle}>{data.title}</Text>
        {data.description || data.description.trim() !== '' ?
          <Text>{data.description.substring(0, 20)}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};
